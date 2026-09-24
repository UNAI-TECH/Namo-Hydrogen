import React from 'react';
import Stage01Water from './Stage01Water';
import Stage02Transform from './Stage02Transform';
import Stage03Generate from './Stage03Generate';
import Stage04Propulsion from './Stage04Propulsion';
import Stage05Founder from './Stage05Founder';
import Stage06Discuss from './Stage06Discuss';

export default function ScrollWrapper({ onExplore, onOpenModal, onGotoDiscuss, onExploreStory, onStepClick }) {
  return (
    <div className="scroll-wrapper" id="scroll-wrapper">
      <div className="pin-stage" id="pin-stage">
        
        {/* Layer Gradient: Clean Mint Ambient Background */}
        <div className="image-layer" id="layer-gradient">
          <img src="/images/clean-gradient-bg.webp" alt="Clean Mint Gradient Substrate" className="motion-img" />
        </div>

        {/* Layer 1: Water drop ripple genesis (Scene 1) */}
        <div className="image-layer" id="layer-1">
          <img src="/images/hydrohero-v2.webp" alt="Genesis Water Spout" className="motion-img" id="hero-img" />
        </div>

        {/* =============================================================
             KINETIC WATER DROPLET (RAYTRACED CANVAS + ISOLATED WEBPS)
             STRICTLY PRESERVED: NEVER ALTER RENDERING OR COORDINATE MATH
             ============================================================= */}
        <div className="kinetic-droplet" id="kinetic-droplet">
          <img src="/images/droplet-isolated.webp" alt="Hero Spherical Droplet" className="droplet-img droplet-1" id="drop-1" />
          <canvas id="droplet-canvas" width="512" height="768" className="droplet-canvas"></canvas>
          <div className="droplet-glow" id="droplet-glow"></div>
        </div>

        {/* Hydrodynamic Particle & Fluid Wake Canvas */}
        <canvas id="particle-canvas" className="particle-canvas"></canvas>

        {/* Minimal Bottom Scroll Prompt */}
        <div className="scroll-hint" id="scroll-hint">
          <div className="scroll-line"></div>
          <span>SCROLL TO EXPLORE THE TIMELINE</span>
        </div>

        {/* ── Organic SVG Border Frame (Forma-style concave bottom notch) ── */}
        <div className="hero-border-frame" id="hero-border-frame">
          <svg viewBox="0 0 1000 600" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <filter id="border-glow" x="-3%" y="-3%" width="106%" height="106%">
                <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#ffffff" floodOpacity="0.45" />
                <feDropShadow dx="0" dy="4" stdDeviation="12" floodColor="rgba(22,163,74,0.08)" floodOpacity="0.15" />
              </filter>
            </defs>
            {/* Main organic border path */}
            <path
              d="
                M 0,0 L 1000,0 L 1000,600 L 0,600 Z
                M 40,3
                L 960,3
                Q 997,3 997,40
                L 997,518
                Q 997,545 978,555
                C 960,565 940,560 928,548
                Q 916,536 902,548
                C 880,566 840,580 780,588
                Q 700,598 500,598
                Q 300,598 220,588
                C 160,580 120,566 98,548
                Q 84,536 72,548
                C 60,560 40,565 22,555
                Q 3,545 3,518
                L 3,40
                Q 3,3 40,3
                Z
              "
              fill="#ffffff"
              fillRule="evenodd"
              clipRule="evenodd"
              filter="url(#border-glow)"
            />
          </svg>
        </div>

        {/* Stages 01 to 06 */}
        <Stage01Water onExplore={onExplore} onOpenModal={onOpenModal} onStepClick={onStepClick} />
        <Stage02Transform />
        <Stage03Generate />
        <Stage04Propulsion />
        <Stage05Founder onGotoDiscuss={onGotoDiscuss} onExploreStory={onExploreStory} />
        <Stage06Discuss onOpenModal={onOpenModal} />

      </div>
    </div>
  );
}
