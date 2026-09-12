import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

/* ===================================================================
   1. LENIS SMOOTH SCROLL INITIALIZATION
   =================================================================== */
const lenis = new Lenis({
  duration: 1.4,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: 'vertical',
  gestureOrientation: 'vertical',
  smoothWheel: true,
  wheelMultiplier: 1.05,
  touchMultiplier: 2,
});

lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

/* ===================================================================
   2. PRELOAD DROPLET FRAMES & BRAND ASSETS
   =================================================================== */
const FRAME_COUNT = 60;
const spinFrames = [];
const tiltFrames = [];
let loadedSpinCount = 0;
let loadedTiltCount = 0;

const dropletState = {
  tiltProgress: 0
};

for (let i = 0; i < FRAME_COUNT; i++) {
  const frameNum = String(i).padStart(3, '0');

  // Base upright spin loop
  const spinImg = new Image();
  spinImg.src = `/images/frames/frame_${frameNum}.webp?v=loop2`;
  spinImg.onload = () => {
    loadedSpinCount++;
    if (loadedSpinCount === 1 && dropletState.tiltProgress === 0) {
      renderDroplet(0, 0);
    }
  };
  spinFrames.push(spinImg);

  // Continuation tilt & vortex transition
  const tiltImg = new Image();
  tiltImg.src = `/images/frames_tilt/frame_${frameNum}.webp?v=tilt3`;
  tiltImg.onload = () => {
    loadedTiltCount++;
  };
  tiltFrames.push(tiltImg);
}

// Preload Namo Hydrogen Brand Logo
const hydroLogoImg = new Image();
hydroLogoImg.src = '/images/hydro-logo.webp?v=logo4';

/* ===================================================================
   3. CANVAS 2D PHOTOREALISTIC FRAME RENDERER
   =================================================================== */
const dropletCanvas = document.getElementById('droplet-canvas');
const dropletCtx = dropletCanvas ? dropletCanvas.getContext('2d') : null;

function renderDroplet(spinIndex, tiltProg = 0) {
  if (!dropletCtx || !dropletCanvas) return;

  dropletCtx.clearRect(0, 0, dropletCanvas.width, dropletCanvas.height);

  if (tiltProg <= 0.001) {
    // Mode 1: Pure idle & scroll spin (upright teardrop loop)
    const wrapped = ((spinIndex % FRAME_COUNT) + FRAME_COUNT) % FRAME_COUNT;
    const baseIdx = Math.floor(wrapped);
    const nextIdx = (baseIdx + 1) % FRAME_COUNT;
    const fraction = wrapped - baseIdx;

    const currentImg = spinFrames[baseIdx];
    const nextImg = spinFrames[nextIdx];

    if (currentImg && currentImg.complete) {
      dropletCtx.globalAlpha = 1.0;
      dropletCtx.drawImage(currentImg, 0, 0, dropletCanvas.width, dropletCanvas.height);

      if (fraction > 0.02 && nextImg && nextImg.complete) {
        dropletCtx.globalAlpha = fraction;
        dropletCtx.drawImage(nextImg, 0, 0, dropletCanvas.width, dropletCanvas.height);
        dropletCtx.globalAlpha = 1.0;
      }
    }
  } else {
    // Mode 2: Tilt transition sequence
    const clampedProg = Math.max(0, Math.min(1, tiltProg));
    const tiltIndex = clampedProg * (FRAME_COUNT - 1);
    const baseIdx = Math.floor(tiltIndex);
    const nextIdx = Math.min(FRAME_COUNT - 1, baseIdx + 1);
    const fraction = tiltIndex - baseIdx;

    const currentTilt = tiltFrames[baseIdx];
    const nextTilt = tiltFrames[nextIdx];

    if (currentTilt && currentTilt.complete) {
      if (clampedProg < 0.15) {
        const handover = clampedProg / 0.15;
        const wrapped = ((spinIndex % FRAME_COUNT) + FRAME_COUNT) % FRAME_COUNT;
        const spinBase = Math.floor(wrapped);
        const currentSpin = spinFrames[spinBase];

        if (currentSpin && currentSpin.complete) {
          dropletCtx.globalAlpha = 1.0;
          dropletCtx.drawImage(currentSpin, 0, 0, dropletCanvas.width, dropletCanvas.height);
          dropletCtx.globalAlpha = handover;
          dropletCtx.drawImage(currentTilt, 0, 0, dropletCanvas.width, dropletCanvas.height);
          dropletCtx.globalAlpha = 1.0;
          return;
        }
      }

      if (clampedProg >= 0.65 && hydroLogoImg && hydroLogoImg.complete) {
        const logoNorm = (clampedProg - 0.65) / 0.35;
        const logoAlpha = logoNorm * logoNorm * (3 - 2 * logoNorm);
        const dropletAlpha = Math.max(0, 1.0 - logoAlpha);

        if (dropletAlpha > 0.005) {
          dropletCtx.globalAlpha = dropletAlpha;
          dropletCtx.drawImage(currentTilt, 0, 0, dropletCanvas.width, dropletCanvas.height);
        }

        if (logoAlpha > 0.005) {
          dropletCtx.globalAlpha = logoAlpha;
          dropletCtx.drawImage(hydroLogoImg, 0, 0, dropletCanvas.width, dropletCanvas.height);
        }

        dropletCtx.globalAlpha = 1.0;
        return;
      }

      dropletCtx.globalAlpha = 1.0;
      dropletCtx.drawImage(currentTilt, 0, 0, dropletCanvas.width, dropletCanvas.height);

      if (fraction > 0.02 && nextTilt && nextTilt.complete) {
        dropletCtx.globalAlpha = fraction;
        dropletCtx.drawImage(nextTilt, 0, 0, dropletCanvas.width, dropletCanvas.height);
        dropletCtx.globalAlpha = 1.0;
      }
    }
  }
}

/* ===================================================================
   4. SPIN CONTROLLER & 5-PAGE SNAPPING
   =================================================================== */
let animFrame = 0;
let isScrolling = false;
let scrollTimeout = null;
let isDropletVisible = true;

const scrollDistance = 5000;
let isProgrammaticScrolling = false;
let isUserInteracting = false;
let gestureStartProgress = 0;
let gestureStartPage = 0;
let gestureAccumulatedDelta = 0;
let snapDebounceTimer = null;

function onUserScrollInput(deltaY) {
  if (isProgrammaticScrolling) return;

  const currentScroll = lenis.scroll;
  const currentProgress = Math.max(0, Math.min(1, currentScroll / scrollDistance));

  if (!isUserInteracting) {
    isUserInteracting = true;
    gestureStartProgress = currentProgress;
    gestureStartPage = Math.round(currentProgress * 4);
    gestureAccumulatedDelta = 0;
  }

  gestureAccumulatedDelta += deltaY;

  clearTimeout(snapDebounceTimer);
  snapDebounceTimer = setTimeout(() => {
    finishScrollGesture();
  }, 160);
}

function finishScrollGesture() {
  if (isProgrammaticScrolling) return;

  const currentScroll = lenis.scroll;
  const currentProgress = Math.max(0, Math.min(1, currentScroll / scrollDistance));
  const progressTraveled = currentProgress - gestureStartProgress;
  const pagesTraveled = Math.abs(progressTraveled * 4);

  let targetPage;

  if (pagesTraveled < 0.75) {
    if (gestureAccumulatedDelta > 20 || progressTraveled > 0.03) {
      targetPage = Math.min(4, gestureStartPage + 1);
    } else if (gestureAccumulatedDelta < -20 || progressTraveled < -0.03) {
      targetPage = Math.max(0, gestureStartPage - 1);
    } else {
      targetPage = gestureStartPage;
    }
  } else {
    targetPage = Math.round(currentProgress * 4);
  }

  targetPage = Math.max(0, Math.min(4, targetPage));
  const targetScroll = (targetPage / 4) * scrollDistance;

  isUserInteracting = false;

  if (Math.abs(currentScroll - targetScroll) > 4) {
    isProgrammaticScrolling = true;
    lenis.scrollTo(targetScroll, {
      duration: 0.85,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      onComplete: () => {
        isProgrammaticScrolling = false;
      }
    });
    setTimeout(() => {
      isProgrammaticScrolling = false;
    }, 900);
  }
}

window.addEventListener('wheel', (e) => {
  isProgrammaticScrolling = false;
  onUserScrollInput(e.deltaY);
}, { passive: true });

let touchStartY = 0;
window.addEventListener('touchstart', (e) => {
  isProgrammaticScrolling = false;
  if (e.touches.length > 0) {
    touchStartY = e.touches[0].clientY;
  }
}, { passive: true });

window.addEventListener('touchmove', (e) => {
  if (e.touches.length > 0) {
    const currentY = e.touches[0].clientY;
    const deltaY = touchStartY - currentY;
    touchStartY = currentY;
    onUserScrollInput(deltaY);
  }
}, { passive: true });

window.addEventListener('touchend', () => {
  clearTimeout(snapDebounceTimer);
  snapDebounceTimer = setTimeout(() => {
    finishScrollGesture();
  }, 120);
});

lenis.on('scroll', (e) => {
  isScrolling = true;
  clearTimeout(scrollTimeout);

  const scrollDelta = e.delta || (e.velocity ? e.velocity * 5 : 0);
  animFrame = (animFrame + scrollDelta * 0.015) % FRAME_COUNT;
  if (animFrame < 0) animFrame += FRAME_COUNT;

  if (dropletState.tiltProgress <= 0.001) {
    renderDroplet(animFrame, 0);
  }

  scrollTimeout = setTimeout(() => {
    isScrolling = false;
  }, 200);

  if (!isProgrammaticScrolling && !isUserInteracting && Math.abs(scrollDelta) > 1) {
    onUserScrollInput(scrollDelta);
  }
});

function animLoop() {
  if (!isScrolling && isDropletVisible && dropletState.tiltProgress <= 0.001) {
    animFrame = (animFrame + 0.08) % FRAME_COUNT;
    renderDroplet(animFrame, 0);
  }
  requestAnimationFrame(animLoop);
}
requestAnimationFrame(animLoop);

/* ===================================================================
   5. DOM ELEMENTS & COORDINATE MAPPING
   =================================================================== */
const scrollWrapper = document.getElementById('scroll-wrapper');
const pinStage = document.getElementById('pin-stage');
const stepBars = document.querySelectorAll('.step-bar');
const scrollHint = document.getElementById('scroll-hint');

const layer1 = document.getElementById('layer-1');
const layer4 = document.getElementById('layer-4');
const layer5 = document.getElementById('layer-5');

const kineticDroplet = document.getElementById('kinetic-droplet');
const drop1 = document.getElementById('drop-1');
const img1 = layer1 ? layer1.querySelector('.motion-img') : null;

// Scene UI Overlay Elements
const sceneUI0 = document.getElementById('scene-ui-0');
const sceneUI1 = document.getElementById('scene-ui-1');
const sceneUI2 = document.getElementById('scene-ui-2');
const sceneUI3 = document.getElementById('scene-ui-3');
const sceneUI4 = document.getElementById('scene-ui-4');

function updateActiveStep(stepIndex) {
  stepBars.forEach((bar, idx) => {
    bar.classList.toggle('active', idx === stepIndex);
  });
}
updateActiveStep(0);

function getRenderedMetrics() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  const naturalW = 1763;
  const naturalH = 892;
  const naturalRatio = naturalW / naturalH;
  const containerRatio = w / h;

  let renderedW, renderedH, offsetX, offsetY;

  if (containerRatio > naturalRatio) {
    renderedW = w;
    renderedH = w / naturalRatio;
    offsetX = 0;
    offsetY = (h - renderedH) / 2;
  } else {
    renderedH = h;
    renderedW = h * naturalRatio;
    offsetX = (w - renderedW) / 2;
    offsetY = 0;
  }

  // Scene 1: Top of water spout
  const p1 = {
    x: offsetX + renderedW * (1192 / naturalW),
    y: offsetY + renderedH * (365 / naturalH),
    size: renderedW * (74 / naturalW)
  };

  // Scene 2: Positioned on clean mint gradient (offset right to leave room for left content)
  const p2 = {
    x: offsetX + renderedW * (1200 / naturalW),
    y: offsetY + renderedH * (510 / naturalH),
    size: renderedW * (92 / naturalW)
  };

  // Scene 3: Screen center
  const p3 = {
    x: w * 0.5,
    y: h * 0.5,
    size: Math.max(160, renderedW * (175 / naturalW))
  };

  // Scene 4: Center top-down cylinder landing
  const p4 = {
    x: w * 0.5,
    y: h * 0.5,
    size: Math.max(250, renderedW * (275 / naturalW))
  };

  // Scene 5: Macro scale
  const p5 = {
    x: w * 0.5,
    y: h * 0.5,
    size: Math.max(360, renderedW * (390 / naturalW))
  };

  return { p1, p2, p3, p4, p5 };
}

let masterTimeline = null;

function buildTimeline() {
  if (masterTimeline) {
    masterTimeline.kill();
    ScrollTrigger.getAll().forEach(t => t.kill());
  }

  const { p1, p2, p3, p4, p5 } = getRenderedMetrics();

  // Set initial droplet state locked to Hero spout
  gsap.set(kineticDroplet, {
    left: 0,
    top: 0,
    xPercent: -50,
    yPercent: -50,
    x: p1.x,
    y: p1.y,
    width: p1.size,
    height: p1.size,
    scale: 1,
    opacity: 1
  });

  gsap.set(drop1, { xPercent: -50, yPercent: -50, opacity: 1, scale: 1 });
  gsap.set(dropletCanvas, { xPercent: -50, yPercent: -50, opacity: 0, scale: 0.85 });
  dropletState.tiltProgress = 0;

  // Initial Scene UI states
  gsap.set(sceneUI0, { autoAlpha: 1, y: 0 });
  gsap.set([sceneUI1, sceneUI2, sceneUI3, sceneUI4], { autoAlpha: 0, y: 40 });

  // Initial background layers
  gsap.set(layer1, { opacity: 1 });
  gsap.set([layer4, layer5], { opacity: 0 });

  masterTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: scrollWrapper,
      start: 'top top',
      end: `+=${scrollDistance}`,
      pin: pinStage,
      scrub: 1.2,
      anticipatePin: 1,
      onUpdate: (self) => {
        const p = self.progress;
        const currentStep = Math.min(4, Math.floor(p * 5));
        updateActiveStep(currentStep);

        isDropletVisible = true;

        if (scrollHint) {
          scrollHint.style.opacity = p > 0.04 ? '0' : '1';
        }
      }
    }
  });

  /* ===================================================================
     TIME 0 -> 1: SCENE 1 TO SCENE 2 (GENESIS -> MOLECULAR EXTRACTION)
     =================================================================== */
  masterTimeline
    // Dissolve spout & ripple background
    .to(layer1, { opacity: 0, ease: 'power3.out', duration: 0.15 }, 0)
    .to(img1, { scale: 1.02, ease: 'power1.out', duration: 0.15 }, 0)
    // Dissolve isolated droplet into continuous loop canvas
    .to(drop1, {
      opacity: 0,
      scale: 0.75,
      ease: 'power2.out',
      duration: 0.15
    }, 0)
    .fromTo(dropletCanvas, {
      opacity: 0,
      scale: 0.85
    }, {
      opacity: 1,
      scale: 1,
      ease: 'power2.out',
      duration: 0.18
    }, 0.02)
    // Move droplet from spout p1 to descent position p2
    .to(kineticDroplet, {
      x: p2.x,
      y: p2.y,
      width: p2.size,
      height: p2.size,
      ease: 'power1.inOut',
      duration: 1.0
    }, 0)
    // Scene 0 UI animates out
    .to('#scene-ui-0 .hero-left-column', { autoAlpha: 0, y: -40, ease: 'power2.in', duration: 0.35 }, 0.08)
    .to('#scene-ui-0 .hero-stats-bento', { autoAlpha: 0, y: 30, ease: 'power2.in', duration: 0.35 }, 0.08)
    .to(sceneUI0, { autoAlpha: 0, duration: 0.05 }, 0.45)
    // Scene 1 UI animates in -> fully visible at 1.0
    .fromTo(sceneUI1, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.05 }, 0.65)
    .fromTo('#scene-ui-1 .left-col', { autoAlpha: 0, x: -35 }, { autoAlpha: 1, x: 0, ease: 'power2.out', duration: 0.3 }, 0.68)
    .fromTo('#scene-ui-1 .glass-bento-card', { autoAlpha: 0, y: 35, scale: 0.94 }, { autoAlpha: 1, y: 0, scale: 1, stagger: 0.06, ease: 'power2.out', duration: 0.3 }, 0.7);

  /* ===================================================================
     TIME 1 -> 2: SCENE 2 TO SCENE 3 (EXTRACTION -> WHY NAMO)
     =================================================================== */
  masterTimeline
    // Droplet travels to screen center and magnifies
    .to(kineticDroplet, {
      x: p3.x,
      y: p3.y,
      width: p3.size,
      height: p3.size,
      ease: 'power2.inOut',
      duration: 1.0
    }, 1.0)
    // Scene 1 UI animates out (starts at 1.15 so it is 100% visible at 1.0)
    .to('#scene-ui-1 .left-col', { autoAlpha: 0, x: -30, ease: 'power2.in', duration: 0.3 }, 1.12)
    .to('#scene-ui-1 .glass-bento-card', { autoAlpha: 0, y: -25, ease: 'power2.in', duration: 0.3 }, 1.12)
    .to(sceneUI1, { autoAlpha: 0, duration: 0.05 }, 1.45)
    // Scene 2 UI animates in -> fully visible at 2.0
    .fromTo(sceneUI2, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.05 }, 1.65)
    .fromTo('#scene-ui-2 .center-header-block', { autoAlpha: 0, y: -30 }, { autoAlpha: 1, y: 0, ease: 'power2.out', duration: 0.3 }, 1.68)
    .fromTo('#scene-ui-2 .left-flank .bento-advantage-card', { autoAlpha: 0, x: -45 }, { autoAlpha: 1, x: 0, stagger: 0.06, ease: 'power2.out', duration: 0.3 }, 1.7)
    .fromTo('#scene-ui-2 .right-flank .bento-advantage-card', { autoAlpha: 0, x: 45 }, { autoAlpha: 1, x: 0, stagger: 0.06, ease: 'power2.out', duration: 0.3 }, 1.7)
    .fromTo('#scene-ui-2 .telemetry-strip-hud', { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, ease: 'power2.out', duration: 0.3 }, 1.72);

  /* ===================================================================
     TIME 2 -> 3: SCENE 3 TO SCENE 4 (WHY NAMO -> PROPULSION ENGINE)
     =================================================================== */
  masterTimeline
    // Droplet expands and tilts into top-down circular perspective
    .to(kineticDroplet, {
      x: p4.x,
      y: p4.y,
      width: p4.size,
      height: p4.size,
      ease: 'power1.inOut',
      duration: 1.0
    }, 2.0)
    .to(dropletState, {
      tiltProgress: 1,
      ease: 'power1.inOut',
      duration: 1.0,
      onUpdate: () => {
        renderDroplet(animFrame, dropletState.tiltProgress);
        const glowEl = document.getElementById('droplet-glow');
        if (glowEl) {
          if (dropletState.tiltProgress >= 0.65) {
            const glowIntensity = (dropletState.tiltProgress - 0.65) / 0.35;
            glowEl.style.boxShadow = `0 0 ${25 + glowIntensity * 35}px rgba(0, 229, 153, ${0.4 + glowIntensity * 0.4})`;
          } else {
            glowEl.style.boxShadow = '';
          }
        }
      }
    }, 2.0)
    // Layer 4 (Engine backdrop) fades in
    .to(layer4, {
      opacity: 0.5,
      ease: 'power2.out',
      duration: 0.6
    }, 2.4)
    // Scene 2 UI animates out (starts at 2.12 so it is 100% visible at 2.0)
    .to('#scene-ui-2 .center-header-block', { autoAlpha: 0, y: -25, ease: 'power2.in', duration: 0.3 }, 2.12)
    .to('#scene-ui-2 .flank-bento-wrapper', { autoAlpha: 0, scale: 0.95, ease: 'power2.in', duration: 0.3 }, 2.12)
    .to('#scene-ui-2 .telemetry-strip-hud', { autoAlpha: 0, y: 25, ease: 'power2.in', duration: 0.3 }, 2.12)
    .to(sceneUI2, { autoAlpha: 0, duration: 0.05 }, 2.45)
    // Scene 3 UI animates in -> fully visible at 3.0
    .fromTo(sceneUI3, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.05 }, 2.65)
    .fromTo('#scene-ui-3 .left-col', { autoAlpha: 0, x: -40 }, { autoAlpha: 1, x: 0, ease: 'power2.out', duration: 0.3 }, 2.68)
    .fromTo('#scene-ui-3 .comparison-bento-box', { autoAlpha: 0, x: 40 }, { autoAlpha: 1, x: 0, ease: 'power2.out', duration: 0.3 }, 2.7);

  /* ===================================================================
     TIME 3 -> 4: SCENE 4 TO SCENE 5 (PROPULSION -> THE FOUNDER OF NAMO)
     =================================================================== */
  masterTimeline
    // Final macro magnification of centered logo
    .to(kineticDroplet, {
      x: p5.x,
      y: p5.y,
      width: p5.size,
      height: p5.size,
      ease: 'power1.inOut',
      duration: 1.0
    }, 3.0)
    // Layer 4 crossfades to Layer 5 (Combustion Cutaway)
    .to(layer4, { opacity: 0, ease: 'power2.in', duration: 0.4 }, 3.0)
    .to(layer5, { opacity: 0.45, ease: 'power2.out', duration: 0.6 }, 3.3)
    // Scene 3 UI animates out (starts at 3.12 so it is 100% visible at 3.0)
    .to('#scene-ui-3 .left-col', { autoAlpha: 0, x: -30, ease: 'power2.in', duration: 0.3 }, 3.12)
    .to('#scene-ui-3 .comparison-bento-box', { autoAlpha: 0, x: 30, ease: 'power2.in', duration: 0.3 }, 3.12)
    .to(sceneUI3, { autoAlpha: 0, duration: 0.05 }, 3.45)
    // Scene 4 (FOUNDER FATHIMA ALI & IN MEMORIAM) animates in -> fully visible at 4.0!
    .fromTo(sceneUI4, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.05 }, 3.65)
    .fromTo('#scene-ui-4 .founder-header-deck', { autoAlpha: 0, y: -25 }, { autoAlpha: 1, y: 0, ease: 'power2.out', duration: 0.3 }, 3.68)
    .fromTo('#scene-ui-4 .founder-card-portrait', { autoAlpha: 0, x: -40, scale: 0.94 }, { autoAlpha: 1, x: 0, scale: 1, ease: 'power2.out', duration: 0.3 }, 3.7)
    .fromTo('#scene-ui-4 .founder-card-narrative', { autoAlpha: 0, x: 40 }, { autoAlpha: 1, x: 0, ease: 'power2.out', duration: 0.3 }, 3.72)
    .fromTo('#scene-ui-4 .founder-action-deck', { autoAlpha: 0, y: 25 }, { autoAlpha: 1, y: 0, ease: 'power2.out', duration: 0.3 }, 3.75);
}

buildTimeline();
ScrollTrigger.refresh();

// Responsive resize
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    buildTimeline();
    ScrollTrigger.refresh();
  }, 150);
});

// Stepper click handlers
stepBars.forEach((bar) => {
  bar.addEventListener('click', (e) => {
    e.preventDefault();
    isProgrammaticScrolling = false;
    isUserInteracting = false;
    clearTimeout(snapDebounceTimer);
    const step = parseInt(bar.getAttribute('data-step'), 10);
    const targetScroll = (step / 4) * scrollDistance;
    lenis.scrollTo(targetScroll, { duration: 1.2, force: true });
  });
});

// Scene 1 explore button jumps to Scene 2
const btnExplore = document.getElementById('btn-goto-step-1');
if (btnExplore) {
  btnExplore.addEventListener('click', (e) => {
    e.preventDefault();
    isProgrammaticScrolling = false;
    isUserInteracting = false;
    lenis.scrollTo(1250, { duration: 1.3, force: true });
  });
}

/* ===================================================================
   6. AMBIENT MOUSE PARALLAX
   =================================================================== */
let mouseX = 0, mouseY = 0;
window.addEventListener('mousemove', (e) => {
  mouseX = (e.clientX / window.innerWidth - 0.5) * 12;
  mouseY = (e.clientY / window.innerHeight - 0.5) * 12;

  gsap.to('.pin-stage', {
    x: mouseX * 0.35,
    y: mouseY * 0.35,
    duration: 0.9,
    ease: 'power1.out'
  });
});

/* ===================================================================
   7. FLUID DYNAMICS PARTICLE ENGINE
   =================================================================== */
const canvas = document.getElementById('particle-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let w = canvas.width = window.innerWidth;
  let h = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  });

  const trailDropletImg = new Image();
  trailDropletImg.src = '/images/droplet-isolated.webp';

  const wakeParticles = [];
  const AMBIENT_COUNT = 24;
  const ambientBubbles = Array.from({ length: AMBIENT_COUNT }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    radius: Math.random() * 1.6 + 1.2,
    buoyancy: -(Math.random() * 0.22 + 0.12),
    phase: Math.random() * Math.PI * 2,
    driftSpeed: Math.random() * 0.012 + 0.008,
    alpha: Math.random() * 0.22 + 0.12
  }));

  let prevDropX = null;
  let prevDropY = null;
  let smoothVx = 0;
  let smoothVy = 0;
  let animTick = 0;

  function drawMicroBubble(cx, cy, r, alpha) {
    ctx.save();
    ctx.globalAlpha = alpha;

    const grad = ctx.createRadialGradient(cx - r * 0.35, cy - r * 0.35, r * 0.1, cx, cy, r);
    grad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
    grad.addColorStop(0.45, 'rgba(215, 248, 235, 0.65)');
    grad.addColorStop(0.85, 'rgba(14, 166, 110, 0.32)');
    grad.addColorStop(1, 'rgba(10, 40, 25, 0.06)');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = 'rgba(255, 255, 255, 0.88)';
    ctx.beginPath();
    ctx.arc(cx - r * 0.35, cy - r * 0.35, Math.max(0.5, r * 0.28), 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  function animateDropletTrails() {
    animTick++;
    ctx.clearRect(0, 0, w, h);

    let dropX = w * 0.5;
    let dropY = h * 0.5;
    let dropRadius = 50;
    let currentSpeed = 0;
    let dropVx = 0;
    let dropVy = 0;
    let dropHeadingX = 0;
    let dropHeadingY = 1;
    let isMoving = false;
    let hasValidPosition = false;

    if (kineticDroplet) {
      const rect = kineticDroplet.getBoundingClientRect();
      const dropOpacity = gsap.getProperty(kineticDroplet, 'opacity');
      if (rect.width > 0 && dropOpacity > 0.05) {
        dropX = rect.left + rect.width / 2;
        dropY = rect.top + rect.height / 2;
        dropRadius = rect.width * 0.48;
        hasValidPosition = true;

        if (prevDropX !== null && prevDropY !== null) {
          dropVx = dropX - prevDropX;
          dropVy = dropY - prevDropY;
          currentSpeed = Math.hypot(dropVx, dropVy);

          smoothVx += (dropVx - smoothVx) * 0.35;
          smoothVy += (dropVy - smoothVy) * 0.35;
          const filteredSpeed = Math.hypot(smoothVx, smoothVy);

          if (filteredSpeed > 0.25 || (isScrolling && (Math.abs(dropVx) + Math.abs(dropVy) > 0.25))) {
            isMoving = true;
            const effectiveSpeed = Math.max(0.15, filteredSpeed);
            dropHeadingX = smoothVx / effectiveSpeed;
            dropHeadingY = smoothVy / effectiveSpeed;

            const emissionCount = Math.min(2, Math.max(1, Math.floor(effectiveSpeed * 0.8)));
            const normalX = -dropHeadingY;
            const normalY = dropHeadingX;

            for (let i = 0; i < emissionCount; i++) {
              const subStep = (i + Math.random()) / (emissionCount + 1);
              const pathX = prevDropX + dropVx * subStep;
              const pathY = prevDropY + dropVy * subStep;

              const lateralSpread = (Math.random() - Math.random()) * (dropRadius * 0.35);
              const spawnX = pathX - dropHeadingX * (dropRadius * 0.65) + normalX * lateralSpread;
              const spawnY = pathY - dropHeadingY * (dropRadius * 0.65) + normalY * lateralSpread;

              const forwardMomentum = 0.28 + Math.random() * 0.14;
              const turbulence = (Math.random() - 0.5) * 0.4;
              const pVx = smoothVx * forwardMomentum + normalX * turbulence;
              const pVy = smoothVy * forwardMomentum + normalY * turbulence + (dropVy > 0 ? 0.2 : 0);

              const baseSize = dropRadius * (0.16 + Math.random() * 0.14);

              wakeParticles.push({
                x: spawnX,
                y: spawnY,
                vx: pVx,
                vy: pVy,
                initialSize: baseSize,
                life: 0,
                maxLife: 24 + Math.floor(Math.random() * 16),
                headingX: dropHeadingX,
                headingY: dropHeadingY
              });
            }
          }
        }

        prevDropX = dropX;
        prevDropY = dropY;
      }
    }

    for (let i = 0; i < ambientBubbles.length; i++) {
      const b = ambientBubbles[i];
      b.y += b.buoyancy;
      b.x += Math.sin(animTick * b.driftSpeed + b.phase) * 0.16;

      if (b.y < -10) { b.y = h + 10; b.x = Math.random() * w; }
      if (b.x < -10) b.x = w + 10;
      if (b.x > w + 10) b.x = -10;

      if (hasValidPosition) {
        const dx = b.x - dropX;
        const dy = b.y - dropY;
        const dist = Math.hypot(dx, dy);
        const repelRadius = dropRadius * 1.5;

        if (dist < repelRadius && dist > 1) {
          const nx = dx / dist;
          const ny = dy / dist;
          const pushForce = Math.pow((repelRadius - dist) / repelRadius, 2) * (1.8 + currentSpeed * 0.15);
          b.x += nx * pushForce;
          b.y += ny * pushForce;
        }
      }

      drawMicroBubble(b.x, b.y, b.radius, b.alpha);
    }

    const imgLoaded = trailDropletImg.complete && trailDropletImg.naturalWidth > 0;

    for (let i = wakeParticles.length - 1; i >= 0; i--) {
      const p = wakeParticles[i];
      p.life++;

      if (p.life >= p.maxLife) {
        wakeParticles.splice(i, 1);
        continue;
      }

      const progress = p.life / p.maxLife;
      const pSpeed = Math.hypot(p.vx, p.vy);
      const dragFactor = 0.05 + pSpeed * 0.025;
      p.vx -= p.vx * dragFactor;
      p.vy -= p.vy * dragFactor;

      if (isMoving) {
        p.vx += dropHeadingX * 0.10 * (1 - progress);
        p.vy += dropHeadingY * 0.10 * (1 - progress);
      }
      if (p.vy > 0) {
        p.vy += 0.05 * (1 - progress);
      }

      p.x += p.vx;
      p.y += p.vy;

      const sizeRatio = Math.pow(1 - progress, 0.65);
      const currentSize = Math.max(2, p.initialSize * sizeRatio);
      const alpha = Math.sin(progress * Math.PI) * (1 - progress * 0.35) * 0.82;
      const particleAngle = Math.atan2(p.vy, p.vx) + Math.PI / 2;
      const stretch = 1 + Math.min(0.5, pSpeed * 0.06);

      if (imgLoaded && alpha > 0.01) {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(particleAngle);
        ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
        ctx.shadowColor = 'rgba(10, 40, 25, 0.14)';
        ctx.shadowBlur = currentSize * 0.25;
        ctx.shadowOffsetY = currentSize * 0.08;
        ctx.drawImage(
          trailDropletImg,
          -currentSize / 2,
          (-currentSize * stretch) / 2,
          currentSize,
          currentSize * stretch
        );
        ctx.restore();
      }
    }

    requestAnimationFrame(animateDropletTrails);
  }
  requestAnimationFrame(animateDropletTrails);
}

/* ===================================================================
   8. BRIEFING MODAL CONTROLS
   =================================================================== */
const modal = document.getElementById('briefing-modal');
const btnOpen1 = document.getElementById('btn-open-modal');
const btnOpen2 = document.getElementById('btn-open-modal-2');
const btnClose = document.getElementById('btn-close-modal');

function openModal() {
  if (modal) modal.classList.add('open');
}

function closeModal() {
  if (modal) modal.classList.remove('open');
}

if (btnOpen1) btnOpen1.addEventListener('click', openModal);
if (btnOpen2) btnOpen2.addEventListener('click', openModal);
if (btnClose) btnClose.addEventListener('click', closeModal);

if (modal) {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
}
