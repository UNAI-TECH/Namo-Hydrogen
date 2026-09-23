import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SCROLL_DISTANCE } from '../constants';

gsap.registerPlugin(ScrollTrigger);

export function useScrollTimeline(dropletStateRef, renderDroplet) {
  useEffect(() => {
    const scrollWrapper = document.getElementById('scroll-wrapper');
    const pinStage = document.getElementById('pin-stage');
    const timelineSteps = document.querySelectorAll('.timeline-step');
    const scrollHint = document.getElementById('scroll-hint');
    const navBrand = document.getElementById('nav-brand');
    const floatingHeader = document.getElementById('floating-header');

    const layer1 = document.getElementById('layer-1');
    const kineticDroplet = document.getElementById('kinetic-droplet');
    const drop1 = document.getElementById('drop-1');
    const dropletCanvas = document.getElementById('droplet-canvas');
    const img1 = layer1 ? layer1.querySelector('.motion-img') : null;

    // Scene UI Layers (Stages 01 to 06)
    const sceneUI0 = document.getElementById('scene-ui-0');
    const sceneUI1 = document.getElementById('scene-ui-1');
    const sceneUI2 = document.getElementById('scene-ui-2');
    const sceneUI3 = document.getElementById('scene-ui-3');
    const sceneUI4 = document.getElementById('scene-ui-4');
    const sceneUI5 = document.getElementById('scene-ui-5');

    if (!scrollWrapper || !pinStage) return;

    let lastActiveStep = -1;
    function updateActiveStep(stepIndex) {
      const steps = document.querySelectorAll('.timeline-step');
      steps.forEach((step, idx) => {
        step.classList.toggle('active', idx === stepIndex);
      });

      // Notify Bento FloatingHeader of stage change
      window.dispatchEvent(new CustomEvent('namo:stagechange', { detail: { step: stepIndex } }));

      // Update active state of stage 01 bento tool rail icons
      const toolIcons = document.querySelectorAll('.tool-rail-icon');
      toolIcons.forEach((icon, idx) => {
        icon.classList.toggle('active-rail', idx === stepIndex);
      });

      if (lastActiveStep !== -1 && lastActiveStep !== stepIndex) {
        gsap.fromTo('.h2-badge',
          { scale: 1.25, boxShadow: '0 0 24px rgba(0, 229, 153, 0.9)' },
          { scale: 1, boxShadow: '0 4px 14px rgba(0, 229, 153, 0.4)', duration: 0.45, ease: 'power3.out' }
        );
      }
      lastActiveStep = stepIndex;
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

      const centerX = w * 0.5;
      const centerY = h * 0.5;

      // Scene 1: Top of water spout (Upper right)
      const p1 = {
        x: offsetX + renderedW * (1192 / naturalW),
        y: offsetY + renderedH * (365 / naturalH),
        size: renderedW * (74 / naturalW)
      };

      // Scene 2: Right-center descent position nestled into Card State 01 concave pocket
      const p2 = {
        x: Math.max(380, Math.min(centerX - 35, w * 0.44)),
        y: centerY,
        size: Math.max(90, Math.min(115, w * 0.075))
      };

      // Scene 3: Screen center (Droplet floating centered in canyon between split panels & in orbit)
      const p3 = {
        x: centerX,
        y: centerY,
        size: Math.max(190, Math.min(230, w * 0.14))
      };

      // Scene 4: Centered inside the central rotating propulsion core dial
      const coreEl = document.getElementById('prop-core');
      const pinStageEl = document.getElementById('pin-stage');
      const pinRect = pinStageEl ? pinStageEl.getBoundingClientRect() : { left: 0, top: 0 };
      let p4x = centerX;
      let p4y = h * 0.53;
      let p4size = 145;
      if (coreEl) {
        const rect = coreEl.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          p4x = (rect.left - pinRect.left) + rect.width / 2;
          p4y = (rect.top - pinRect.top) + rect.height / 2 + (rect.height * 0.058);
          p4size = rect.width * 0.52;
        }
      }
      const p4 = {
        x: p4x,
        y: p4y,
        size: p4size
      };

      // Scene 5: Left half positioning to anchor Founder Brand Logo (Bigger & Centered)
      const founderWrap = document.getElementById('founder-logo-wrap');
      let p5x = w * 0.25;
      let p5y = h * 0.28;
      let p5size = 175;
      if (founderWrap) {
        const rect = founderWrap.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          p5x = (rect.left - pinRect.left) + rect.width / 2;
          p5y = (rect.top - pinRect.top) + rect.height / 2;
          p5size = Math.min(rect.width, rect.height);
        }
      }
      const p5 = {
        x: p5x,
        y: p5y,
        size: p5size
      };

      // Scene 6 / Header Nav dock target coordinates
      const navFrame = document.getElementById('nav-brand-frame') || document.getElementById('nav-brand') || document.querySelector('.header-brand');
      let navX = 85;
      let navY = 36;
      let navSize = 32;
      if (navFrame) {
        const rect = navFrame.getBoundingClientRect();
        if (rect.width > 0 && rect.top > 0) {
          navX = rect.left + rect.width / 2;
          navY = rect.top + rect.height / 2;
          navSize = Math.max(26, rect.width);
        }
      }
      const pNav = { x: navX, y: navY, size: navSize };

      return { p1, p2, p3, p4, p5, pNav };
    }

    let masterTimeline = null;
    const UNIFIED_EASE = 'power3.out';
    const scrollDistance = SCROLL_DISTANCE;

    function buildTimeline() {
      if (masterTimeline) {
        masterTimeline.kill();
        ScrollTrigger.getAll().forEach(t => t.kill());
      }

      const { p1, p2, p3, p4, p5, pNav } = getRenderedMetrics();

      // Initial droplet position locked to spout
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
        opacity: 1,
        autoAlpha: 1
      });

      gsap.set('#droplet-glow', { opacity: 1, scale: 1 });
      gsap.set(drop1, { xPercent: -50, yPercent: -50, opacity: 1, scale: 1 });
      gsap.set(dropletCanvas, { xPercent: -50, yPercent: -50, opacity: 0, scale: 0.85 });
      if (dropletStateRef?.current) {
        dropletStateRef.current.tiltProgress = 0;
      }

      // Initial Scene UI visibility states
      gsap.set(sceneUI0, { autoAlpha: 1 });
      gsap.set([sceneUI1, sceneUI2, sceneUI3, sceneUI4, sceneUI5], { autoAlpha: 0 });

      // Floating bento nav header is unified and visible across all stages
      gsap.set(floatingHeader, { autoAlpha: 1, y: 0 });
      gsap.set(navBrand, { autoAlpha: 1, scale: 1 });

      // Initial Narrative Sub-blocks with clean hardware-accelerated transforms (Zero blur artifacts)
      gsap.set('#stage-01-hero', { autoAlpha: 1, y: 0 });
      gsap.set('#stage-01-descent', { autoAlpha: 0, y: 20 });
      gsap.set('#card-state-01', { scale: 0.94, transformOrigin: 'center center' });
      gsap.set('#stage-01-telem', { autoAlpha: 0, x: 25 });
      gsap.set('#carve-aura-01', { scale: 0.7, opacity: 0 });

      // Stage 02 Split Card elements
      gsap.set('#stage-02-split-wrap', { autoAlpha: 0 });
      gsap.set('#split-card-left', { autoAlpha: 0, x: -70, rotation: -2, transformOrigin: 'center right' });
      gsap.set('#split-card-right', { autoAlpha: 0, x: 70, rotation: 2, transformOrigin: 'center left' });

      // Stage 03 Orbit elements
      gsap.set('#stage-03-orbit-wrap', { autoAlpha: 0 });
      gsap.set('#orbit-header', { autoAlpha: 0, y: -20 });
      gsap.set('#orbit-mod-1', { autoAlpha: 0, x: -60, y: -40, scale: 0.88 });
      gsap.set('#orbit-mod-2', { autoAlpha: 0, x: 60, y: -40, scale: 0.90 });
      gsap.set('#orbit-mod-3', { autoAlpha: 0, x: -70, y: 40, scale: 0.92 });
      gsap.set('#orbit-mod-4', { autoAlpha: 0, x: 70, y: 40, scale: 0.94 });
      gsap.set('#droplet-ambient-pool', { autoAlpha: 0, scale: 0.5 });

      // Stage 04 Propulsion elements
      gsap.set('#stage-04-system-wrap', { autoAlpha: 0 });
      gsap.set(['#prop-hdr-left', '#prop-hdr-right'], { autoAlpha: 0, y: -20 });
      gsap.set('#prop-ambient', { autoAlpha: 0, scale: 0.6 });
      gsap.set(['#prop-flow-svg', '#prop-flow-arrows'], { autoAlpha: 0 });
      gsap.set(['#prop-arrow-1', '#prop-arrow-2', '#prop-arrow-3'], { autoAlpha: 0, scale: 0.85, transformOrigin: 'center center' });
      gsap.set('#prop-core', { autoAlpha: 1, scale: 1, transformOrigin: 'center center' });
      gsap.set('#prop-core-glow', { autoAlpha: 0, scale: 0.4, transformOrigin: 'center center' });
      gsap.set('#prop-core-dial', { autoAlpha: 0, scale: 0.5, rotation: -35, transformOrigin: 'center center' });
      gsap.set('#prop-card-top', { autoAlpha: 0, y: -35, scale: 0.88, transformOrigin: 'center center' });
      gsap.set('#prop-card-left', { autoAlpha: 0, x: -45, y: 15, scale: 0.88, transformOrigin: 'center center' });
      gsap.set('#prop-card-right', { autoAlpha: 0, x: 45, y: 15, scale: 0.88, transformOrigin: 'center center' });

      gsap.set('#founder-split-container', { autoAlpha: 1 });
      gsap.set('#founder-left-block', { autoAlpha: 1, x: 0 });
      gsap.set('#founder-left-brand', { autoAlpha: 0, y: 20 });
      gsap.set('#founder-left-story', { autoAlpha: 0, y: 25 });
      gsap.set('#founder-split-line', { autoAlpha: 0, scaleY: 0, transformOrigin: 'top center' });
      gsap.set('#founder-card', { autoAlpha: 0, x: 35 });
      gsap.set('#btn-scroll-more-founder', { autoAlpha: 1 });
      gsap.set('#scene-ui-5', { autoAlpha: 0, y: 0 });
      gsap.set('#scene-ui-5 .briefing-page-container, #scene-ui-5 .discuss-split-container', { autoAlpha: 0, y: 24 });

      // Initial background layers
      gsap.set(layer1, { opacity: 1 });

      function getStepIndex(progress) {
        if (progress < 0.16) return 0;   // 01 WATER (0.00 -> 1.00)
        if (progress < 0.32) return 1;  // 02 TRANSFORM (1.00 -> 1.96)
        if (progress < 0.49) return 2;  // 03 GENERATE (1.96 -> 2.95)
        if (progress < 0.72) return 3;  // 04 PROPULSION (2.95 -> 4.46)
        if (progress < 0.86) return 4;  // 05 FOUNDER (4.46 -> 5.22)
        return 5;                       // 06 BRIEFING (5.26 -> 6.00)
      }

      // Single shared master scrub timeline over exactly 6.0 units
      masterTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: scrollWrapper,
          start: 'top top',
          end: `+=${scrollDistance}`,
          pin: pinStage,
          scrub: 1.6,
          anticipatePin: 1,
          onUpdate: (self) => {
            const p = self.progress;
            const currentStep = getStepIndex(p);
            updateActiveStep(currentStep);

            if (dropletStateRef?.current) {
              dropletStateRef.current.isDropletVisible = true;
              renderDroplet(dropletStateRef.current.animFrame, dropletStateRef.current.tiltProgress);
              const glowEl = document.getElementById('droplet-glow');
              if (glowEl) {
                if (dropletStateRef.current.tiltProgress >= 0.65) {
                  const glowIntensity = (dropletStateRef.current.tiltProgress - 0.65) / 0.35;
                  glowEl.style.boxShadow = `0 0 ${25 + glowIntensity * 35}px rgba(0, 229, 153, ${0.4 + glowIntensity * 0.4})`;
                } else {
                  glowEl.style.boxShadow = '';
                }
              }
            }
            if (scrollHint) {
              scrollHint.style.opacity = p > 0.02 ? '0' : '1';
            }
          }
        }
      });

      /* ===================================================================
         STAGE 01: GENESIS / WATER (Timeline 0.00 -> 1.00)
         =================================================================== */
      masterTimeline
        .to(layer1, { opacity: 0, ease: UNIFIED_EASE, duration: 0.22 }, 0.0)
        .to(img1, { scale: 1.02, ease: UNIFIED_EASE, duration: 0.22 }, 0.0)
        .to(drop1, { opacity: 0, scale: 0.75, ease: UNIFIED_EASE, duration: 0.16 }, 0.0)
        .fromTo(dropletCanvas, { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, ease: UNIFIED_EASE, duration: 0.18 }, 0.02)
        .to(kineticDroplet, {
          x: p2.x,
          y: p2.y,
          width: p2.size,
          height: p2.size,
          ease: UNIFIED_EASE,
          duration: 1.0
        }, 0.0)
        .to('#stage-01-hero', { autoAlpha: 0, y: -25, ease: UNIFIED_EASE, duration: 0.16 }, 0.28)
        .fromTo('#stage-01-descent',
          { autoAlpha: 0, y: 20 },
          { autoAlpha: 1, y: 0, ease: UNIFIED_EASE, duration: 0.26 }, 0.46)
        .fromTo('#card-state-01',
          { scale: 0.94 },
          { scale: 1, ease: UNIFIED_EASE, duration: 0.26 }, 0.46)
        .fromTo('#stage-01-telem',
          { autoAlpha: 0, x: 25 },
          { autoAlpha: 1, x: 0, ease: UNIFIED_EASE, duration: 0.28 }, 0.48)
        .fromTo('#carve-aura-01',
          { opacity: 0, scale: 0.7 },
          { opacity: 0.8, scale: 1, ease: UNIFIED_EASE, duration: 0.32 }, 0.48)
        .to('#card-state-01', { scale: 0.94, x: -30, ease: UNIFIED_EASE, duration: 0.18 }, 0.84)
        .to('#stage-01-telem', { autoAlpha: 0, x: 25, ease: UNIFIED_EASE, duration: 0.18 }, 0.84)
        .to('#carve-aura-01', { opacity: 0, duration: 0.14 }, 0.84)
        .to('#stage-01-descent', { autoAlpha: 0, y: -20, ease: UNIFIED_EASE, duration: 0.2 }, 0.84)
        .to(sceneUI0, { autoAlpha: 0, duration: 0.05 }, 0.95);

      /* ===================================================================
         STAGE 02: EXTRACTION / SPLIT CARD (Timeline 1.00 -> 2.00)
         =================================================================== */
      masterTimeline
        .fromTo(sceneUI1, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.05 }, 0.95)
        .fromTo('#stage-02-split-wrap', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.05 }, 0.96)
        .to(kineticDroplet, {
          x: p3.x,
          y: p3.y,
          width: p3.size,
          height: p3.size,
          ease: UNIFIED_EASE,
          duration: 0.80
        }, 1.00)
        .fromTo('#split-card-left',
          { autoAlpha: 0, x: -60, rotation: -1.5 },
          { autoAlpha: 1, x: 0, rotation: 0, ease: UNIFIED_EASE, duration: 0.38 }, 1.02)
        .fromTo('#split-card-right',
          { autoAlpha: 0, x: 60, rotation: 1.5 },
          { autoAlpha: 1, x: 0, rotation: 0, ease: UNIFIED_EASE, duration: 0.38 }, 1.02)
        .to('#split-card-left', { x: -16, ease: 'sine.inOut', duration: 0.35 }, 1.35)
        .to('#split-card-right', { x: 16, ease: 'sine.inOut', duration: 0.35 }, 1.35)
        .to('#split-card-left', { autoAlpha: 0, x: -80, scale: 0.92, ease: UNIFIED_EASE, duration: 0.20 }, 1.78)
        .to('#split-card-right', { autoAlpha: 0, x: 80, scale: 0.92, ease: UNIFIED_EASE, duration: 0.20 }, 1.78)
        .to('#stage-02-split-wrap', { autoAlpha: 0, duration: 0.05 }, 1.96)
        .to(sceneUI1, { autoAlpha: 0, duration: 0.05 }, 1.96);

      /* ===================================================================
         STAGE 03: WHY NAMO / DATA ORBIT (Timeline 2.00 -> 2.95)
         Water droplet in center (p3) completes 3D tilt and morphs into
         the Namo Hydrogen Logo, then glides down to prop-core (p4).
         =================================================================== */
      masterTimeline
        .fromTo(sceneUI2, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.05 }, 1.96)
        .fromTo('#stage-03-orbit-wrap', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.05 }, 1.98)
        .fromTo('#orbit-header',
          { autoAlpha: 0, y: -20 },
          { autoAlpha: 1, y: 0, ease: UNIFIED_EASE, duration: 0.26 }, 2.00)
        .fromTo('#droplet-ambient-pool',
          { autoAlpha: 0, scale: 0.5 },
          { autoAlpha: 1, scale: 1, ease: UNIFIED_EASE, duration: 0.35 }, 2.00)
        .fromTo('#orbit-mod-1',
          { autoAlpha: 0, x: -60, y: -40, scale: 0.88 },
          { autoAlpha: 1, x: 0, y: 0, scale: 1, ease: UNIFIED_EASE, duration: 0.32 }, 2.02)
        .fromTo('#orbit-mod-2',
          { autoAlpha: 0, x: 60, y: -40, scale: 0.90 },
          { autoAlpha: 1, x: 0, y: 0, scale: 1, ease: UNIFIED_EASE, duration: 0.34 }, 2.04)
        .fromTo('#orbit-mod-3',
          { autoAlpha: 0, x: -70, y: 40, scale: 0.92 },
          { autoAlpha: 1, x: 0, y: 0, scale: 1, ease: UNIFIED_EASE, duration: 0.36 }, 2.06)
        .fromTo('#orbit-mod-4',
          { autoAlpha: 0, x: 70, y: 40, scale: 0.94 },
          { autoAlpha: 1, x: 0, y: 0, scale: 1, ease: UNIFIED_EASE, duration: 0.38 }, 2.08)
        .to('#orbit-mod-1', { y: -16, x: -8, rotation: -1.2, ease: 'none', duration: 0.48 }, 2.15)
        .to('#orbit-mod-2', { y: -20, x: 8, rotation: 1.2, ease: 'none', duration: 0.48 }, 2.15)
        .to('#orbit-mod-3', { y: 18, x: -12, rotation: 1.5, scale: 1.02, ease: 'none', duration: 0.48 }, 2.15)
        .to('#orbit-mod-4', { y: 24, x: 12, rotation: -1.5, scale: 1.02, ease: 'none', duration: 0.48 }, 2.15)

        /* The Hero Water Droplet tilts in 3D and morphs into the glowing Namo Logo right in the center */
        .to(dropletStateRef.current, {
          tiltProgress: 1,
          ease: 'power2.inOut',
          duration: 0.46,
          onUpdate: () => {
            renderDroplet(dropletStateRef.current.animFrame, dropletStateRef.current.tiltProgress);
            const glowEl = document.getElementById('droplet-glow');
            if (glowEl) {
              if (dropletStateRef.current.tiltProgress >= 0.65) {
                const glowIntensity = (dropletStateRef.current.tiltProgress - 0.65) / 0.35;
                glowEl.style.boxShadow = `0 0 ${25 + glowIntensity * 35}px rgba(0, 229, 153, ${0.4 + glowIntensity * 0.4})`;
              } else {
                glowEl.style.boxShadow = '';
              }
            }
          }
        }, 2.10)

        /* Orbit modules fade out as we transition towards Stage 04 */
        .to(['#orbit-mod-1', '#orbit-mod-2', '#orbit-mod-3', '#orbit-mod-4'], {
          autoAlpha: 0,
          scale: 0.75,
          y: 0,
          x: 0,
          ease: UNIFIED_EASE,
          duration: 0.22
        }, 2.68)
        .to('#orbit-header', { autoAlpha: 0, y: -15, ease: UNIFIED_EASE, duration: 0.18 }, 2.68)
        .to('#droplet-ambient-pool', { autoAlpha: 0, scale: 1.4, ease: UNIFIED_EASE, duration: 0.22 }, 2.68)

        /* Droplet (now fully transformed into Namo Logo) smoothly glides from p3 to p4 */
        .to(kineticDroplet, {
          x: p4.x,
          y: p4.y,
          width: p4.size,
          height: p4.size,
          ease: 'power2.inOut',
          duration: 0.26
        }, 2.68)

        .to('#stage-03-orbit-wrap', { autoAlpha: 0, duration: 0.05 }, 2.94)
        .to(sceneUI2, { autoAlpha: 0, duration: 0.05 }, 2.94);

      /* ===================================================================
         STAGE 04: PROPULSION / PROPULSION FRAME (Timeline 2.95 -> 4.46)
         The existing logo overlays directly above the dial without fading out.
         The concentric dial emerges behind the existing logo.
         Then the sequential architecture cards and closed circular flow loop appear.
         =================================================================== */
      masterTimeline
        .fromTo(sceneUI3, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.04 }, 2.95)
        .fromTo('#stage-04-system-wrap', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.04 }, 2.95)

        /* The dial emerges directly behind the existing logo (kineticDroplet stays 100% visible above) */
        .fromTo('#prop-core-dial',
          { autoAlpha: 0, scale: 0.5, rotation: -35 },
          { autoAlpha: 1, scale: 1, rotation: 0, ease: 'back.out(1.2)', duration: 0.24 }, 2.96)
        .fromTo('#prop-core-glow',
          { autoAlpha: 0, scale: 0.4 },
          { autoAlpha: 1, scale: 1, ease: 'power2.out', duration: 0.24 }, 2.96)

        /* Surrounding atmosphere & header information badges reveal */
        .fromTo('#prop-ambient',
          { autoAlpha: 0, scale: 0.6 },
          { autoAlpha: 1, scale: 1, ease: UNIFIED_EASE, duration: 0.22 }, 3.10)
        .fromTo(['#prop-hdr-left', '#prop-hdr-right'],
          { autoAlpha: 0, y: -20 },
          { autoAlpha: 1, y: 0, ease: UNIFIED_EASE, duration: 0.20 }, 3.12)
        .fromTo(['#prop-flow-svg', '#prop-flow-arrows'],
          { autoAlpha: 0 },
          { autoAlpha: 1, ease: 'none', duration: 0.12 }, 3.16)

        /* Following animations: Card-by-card sequential flow */
        /* Step 1: Card 01 GENERATE (Top) reveals smoothly into place */
        .fromTo('#prop-card-top',
          { autoAlpha: 0, y: -35, scale: 0.88 },
          { autoAlpha: 1, y: 0, scale: 1, ease: UNIFIED_EASE, duration: 0.20 }, 3.24)

        /* Flow 1: Upper-left Arrow connects B1 down towards B2 */
        .fromTo('#prop-arrow-1',
          { autoAlpha: 0, scale: 0.84 },
          { autoAlpha: 1, scale: 1, ease: 'power2.out', duration: 0.14 }, 3.40)

        /* Step 2: Card 02 CONTROL (Bottom-Left) reveals smoothly into place */
        .fromTo('#prop-card-left',
          { autoAlpha: 0, x: -45, y: 15, scale: 0.88 },
          { autoAlpha: 1, x: 0, y: 0, scale: 1, ease: UNIFIED_EASE, duration: 0.20 }, 3.46)

        /* Flow 2: Bottom Arrow connects B2 across towards B3 */
        .fromTo('#prop-arrow-2',
          { autoAlpha: 0, scale: 0.84 },
          { autoAlpha: 1, scale: 1, ease: 'power2.out', duration: 0.14 }, 3.62)

        /* Step 3: Card 03 CONSUME (Bottom-Right) reveals smoothly into place */
        .fromTo('#prop-card-right',
          { autoAlpha: 0, x: 45, y: 15, scale: 0.88 },
          { autoAlpha: 1, x: 0, y: 0, scale: 1, ease: UNIFIED_EASE, duration: 0.20 }, 3.68)

        /* Flow 3: Upper-right Arrow completes the full closed circular loop into B1 */
        .fromTo('#prop-arrow-3',
          { autoAlpha: 0, scale: 0.84 },
          { autoAlpha: 1, scale: 1, ease: 'power2.out', duration: 0.14 }, 3.84)

        /* Loop completion pulse across central core dial and overlay logo together */
        .to(['#prop-core', kineticDroplet], {
          scale: 1.06,
          duration: 0.10,
          yoyo: true,
          repeat: 1,
          ease: 'power2.inOut'
        }, 3.96)

        /* Outro handoff into Stage 05 (Founder): dial and cards fade, droplet glides to Founder */
        .to(['#prop-card-top', '#prop-card-left', '#prop-card-right', '#prop-core-dial', '#prop-core-glow', '#prop-hdr-left', '#prop-hdr-right', '#prop-arrow-1', '#prop-arrow-2', '#prop-arrow-3', '#prop-flow-svg', '#prop-flow-arrows', '#prop-ambient'], {
          autoAlpha: 0,
          scale: 0.94,
          ease: UNIFIED_EASE,
          duration: 0.18
        }, 4.28)
        .to('#stage-04-system-wrap', { autoAlpha: 0, duration: 0.05 }, 4.44)
        .to(sceneUI3, { autoAlpha: 0, duration: 0.05 }, 4.46);

      /* ===================================================================
         STAGE 05: FOUNDER SPLIT-SCREEN LAYOUT (Timeline 4.46 -> 5.42)
         Phase 1: Brand copy + Logo (centered & bigger) + Big picture on right
         Phase 2: Logo moves to nav bar, and Founder Story shows in that place!
         =================================================================== */
      masterTimeline
        .fromTo(sceneUI4, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.04 }, 4.46)
        // Phase 1: Droplet smoothly glides into the left half logo wrap (size 175)
        .to(kineticDroplet, {
          x: p5.x,
          y: p5.y,
          width: p5.size,
          height: p5.size,
          ease: 'power2.inOut',
          duration: 0.32
        }, 4.48)
        // Left side brand & engineering stats enter
        .fromTo('#founder-left-brand',
          { autoAlpha: 0, y: 22 },
          { autoAlpha: 1, y: 0, ease: UNIFIED_EASE, duration: 0.28 }, 4.52)
        // The straight glowing line appears, drawing down to split the two halves
        .fromTo('#founder-split-line',
          { autoAlpha: 0, scaleY: 0 },
          { autoAlpha: 1, scaleY: 1, ease: 'power2.out', duration: 0.30 }, 4.54)
        // Right side founder showcase picture & scroll prompt reveal
        .fromTo('#founder-card',
          { autoAlpha: 0, x: 35 },
          { autoAlpha: 1, x: 0, ease: UNIFIED_EASE, duration: 0.28 }, 4.56)
        
        // Phase 2: As user scrolls, logo moves to nav bar, and founder story replaces brand copy in that place!
        .to(kineticDroplet, {
          x: pNav.x,
          y: pNav.y,
          width: pNav.size,
          height: pNav.size,
          ease: 'power2.inOut',
          duration: 0.24
        }, 4.76)
        .to('#droplet-glow', {
          opacity: 0,
          scale: 0.4,
          ease: UNIFIED_EASE,
          duration: 0.16
        }, 4.76)
        .to('#founder-left-brand', {
          autoAlpha: 0,
          y: -18,
          ease: UNIFIED_EASE,
          duration: 0.16
        }, 4.78)
        .to('#btn-scroll-more-founder', {
          autoAlpha: 0,
          duration: 0.12
        }, 4.80)
        .to(navBrand, { autoAlpha: 1, scale: 1, ease: UNIFIED_EASE, duration: 0.10 }, 4.90)
        .to(kineticDroplet, { autoAlpha: 0, ease: UNIFIED_EASE, duration: 0.05 }, 4.92)
        // Founder profile, bio, vision, quote & connect button show in that exact place on the left!
        .fromTo('#founder-left-story',
          { autoAlpha: 0, y: 22 },
          { autoAlpha: 1, y: 0, ease: UNIFIED_EASE, duration: 0.22 }, 4.88)
        
        // Outro transition: Stage 05 exits completely before Stage 06 starts
        .to(['#founder-split-container', '#founder-card', '#founder-left-story'], {
          autoAlpha: 0,
          y: -20,
          ease: UNIFIED_EASE,
          duration: 0.16
        }, 5.16)
        .to(sceneUI4, { autoAlpha: 0, duration: 0.04 }, 5.22);

      /* ===================================================================
         STAGE 06: THE REQUEST BRIEFING FINAL PAGE (Timeline 5.24 -> 6.00)
         =================================================================== */
      masterTimeline
        .fromTo(sceneUI5, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.04 }, 5.24)
        .fromTo('#scene-ui-5 .briefing-page-container, #scene-ui-5 .discuss-split-container',
          { autoAlpha: 0, y: 24 },
          { autoAlpha: 1, y: 0, ease: UNIFIED_EASE, duration: 0.24 }, 5.26)
        // Holds Stage 06 rock-solid and interactive through the rest of the timeline
        .to({}, { duration: 0.50 }, 5.50)
        .to({}, { duration: 0.01 }, 6.00);
    }

    buildTimeline();
    ScrollTrigger.refresh();

    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        buildTimeline();
        ScrollTrigger.refresh();
      }, 150);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', handleResize);
      if (masterTimeline) {
        masterTimeline.kill();
      }
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [dropletStateRef, renderDroplet]);
}
