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
