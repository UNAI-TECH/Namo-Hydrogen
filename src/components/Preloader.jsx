import React, { useState, useEffect } from 'react';

const STATIC_ASSETS = [
  '/images/hydro-logo.webp',
  '/images/clean-gradient-bg.webp',
  '/images/hydrohero-v2.webp',
  '/images/droplet-isolated.webp',
  '/images/fathima-ali.webp',
  '/images/propulsion-cylinder.png',
  '/images/propulsion-metering.png',
  '/images/propulsion-reactor.png',
  '/images/scene4-engine-drop.webp',
  '/images/scene5-engine-cutaway.webp'
];

const FRAME_COUNT = 60;

export default function Preloader({ onComplete }) {
  const [percent, setPercent] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    let loadedCount = 0;
    const totalAssets = STATIC_ASSETS.length + (FRAME_COUNT * 2) + 1; // +1 for fonts

    const updateProgress = () => {
      loadedCount++;
      const currentPct = Math.min(100, Math.floor((loadedCount / totalAssets) * 100));
      setPercent(currentPct);

      if (loadedCount >= totalAssets) {
        finishLoading();
      }
    };

    const finishLoading = () => {
      setPercent(100);
      setTimeout(() => {
        setIsFading(true);
        if (onComplete) onComplete();
        setTimeout(() => {
          setIsDone(true);
        }, 750);
      }, 400);
    };

    // Preload Static Images
    STATIC_ASSETS.forEach((src) => {
      const img = new Image();
      img.onload = updateProgress;
      img.onerror = updateProgress; // gracefully continue on error
      img.src = src;
    });

    // Preload Spin and Tilt Animation Frames
    for (let i = 0; i < FRAME_COUNT; i++) {
      const frameNum = String(i).padStart(3, '0');

      const spinImg = new Image();
      spinImg.onload = updateProgress;
      spinImg.onerror = updateProgress;
      spinImg.src = `/images/frames/frame_${frameNum}.webp?v=loop2`;

      const tiltImg = new Image();
      tiltImg.onload = updateProgress;
      tiltImg.onerror = updateProgress;
      tiltImg.src = `/images/frames_tilt/frame_${frameNum}.webp?v=tilt3`;
    }

    // Preload Web Fonts
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(updateProgress).catch(updateProgress);
    } else {
      updateProgress();
    }

    // Safety fallback: Never let user wait more than 6 seconds if an asset hangs
    const safetyTimer = setTimeout(() => {
      finishLoading();
    }, 6000);

    return () => clearTimeout(safetyTimer);
  }, []);

  if (isDone) return null;

  return (
    <div className={`preloader-screen ${isFading ? 'is-loaded' : ''}`} aria-hidden={isFading}>
      <div className="preloader-logo-frame">
        <img src="/images/hydro-logo.webp" alt="NAMO Hydrogen Logo" className="preloader-logo-img" />
      </div>

      <div className="preloader-brand-title">NAMO HYDROGEN</div>
      <div className="preloader-brand-sub">FROM WATER TO POWER</div>

      <div className="preloader-progress-track">
        <div className="preloader-progress-fill" style={{ width: `${percent}%` }}></div>
      </div>

      <div className="preloader-telemetry">
        <span>INITIALIZING ASSETS</span>
        <span className="preloader-percent">{percent}%</span>
      </div>
    </div>
  );
}
