import { useEffect, useRef } from 'react';
import { SCROLL_DISTANCE } from '../constants';

const FRAME_COUNT = 60;
const spinFrames = [];
const tiltFrames = [];
let loadedSpinCount = 0;
let loadedTiltCount = 0;
let framesPreloaded = false;

// Preload Namo Hydrogen Brand Logo
const hydroLogoImg = new Image();
hydroLogoImg.src = '/images/hydro-logo.webp?v=centered1';

function preloadFrames(onFirstFrameLoad) {
  if (framesPreloaded) return;
  framesPreloaded = true;

  for (let i = 0; i < FRAME_COUNT; i++) {
    const frameNum = String(i).padStart(3, '0');

    // Base upright spin loop
    const spinImg = new Image();
    spinImg.src = `/images/frames/frame_${frameNum}.webp?v=loop2`;
    spinImg.onload = () => {
      loadedSpinCount++;
      if (loadedSpinCount === 1 && onFirstFrameLoad) {
        onFirstFrameLoad();
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
}

export function useDropletRenderer(lenisRef) {
  const dropletStateRef = useRef({
    tiltProgress: 0,
    animFrame: 0,
    isScrolling: false,
    isDropletVisible: true,
  });

  const renderDroplet = (spinIndex, tiltProg = 0) => {
    const dropletCanvas = document.getElementById('droplet-canvas');
    if (!dropletCanvas) return;
    const dropletCtx = dropletCanvas.getContext('2d');
    if (!dropletCtx) return;

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

      // At full convergence, guarantee crisp logo rendering
      if (clampedProg >= 0.99 && hydroLogoImg && hydroLogoImg.complete) {
        dropletCtx.globalAlpha = 1.0;
        dropletCtx.drawImage(hydroLogoImg, 0, 0, dropletCanvas.width, dropletCanvas.height);
        return;
      }

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

        // Smooth logo convergence at the technological climax
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
  };

  useEffect(() => {
    preloadFrames(() => {
      if (dropletStateRef.current.tiltProgress === 0) {
        renderDroplet(0, 0);
      }
    });

    const scrollDistance = SCROLL_DISTANCE;
    let scrollTimeout = null;

    const handleScroll = (e) => {
      const lenis = lenisRef?.current;
      if (!lenis) return;

      dropletStateRef.current.isScrolling = true;
      clearTimeout(scrollTimeout);

      const currentProgress = Math.max(0, Math.min(1, lenis.scroll / scrollDistance));
      dropletStateRef.current.animFrame = (currentProgress * FRAME_COUNT * 16) % FRAME_COUNT;

      if (dropletStateRef.current.tiltProgress <= 0.001) {
        renderDroplet(dropletStateRef.current.animFrame, 0);
      }

      scrollTimeout = setTimeout(() => {
        dropletStateRef.current.isScrolling = false;
      }, 180);
    };

    let lenisInstance = lenisRef?.current;
    if (lenisInstance) {
      lenisInstance.on('scroll', handleScroll);
    } else {
      // Retry in case lenis initialized shortly after
      const checkInterval = setInterval(() => {
        if (lenisRef?.current) {
          lenisInstance = lenisRef.current;
          lenisInstance.on('scroll', handleScroll);
          clearInterval(checkInterval);
        }
      }, 50);
      setTimeout(() => clearInterval(checkInterval), 1000);
    }

    let rafId;
    const animLoop = () => {
      const state = dropletStateRef.current;
      if (!state.isScrolling && state.isDropletVisible && state.tiltProgress <= 0.001) {
        state.animFrame = (state.animFrame + 0.08) % FRAME_COUNT;
        renderDroplet(state.animFrame, 0);
      }
      rafId = requestAnimationFrame(animLoop);
    };
    rafId = requestAnimationFrame(animLoop);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(scrollTimeout);
      if (lenisInstance) {
        lenisInstance.off('scroll', handleScroll);
      }
    };
  }, [lenisRef]);

  return { dropletStateRef, renderDroplet };
}
