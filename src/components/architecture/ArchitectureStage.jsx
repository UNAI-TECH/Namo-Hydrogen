import React from 'react';
import ArchitectureCore from './ArchitectureCore';
import GenerateCard from './GenerateCard';
import ControlCard from './ControlCard';
import ConsumeCard from './ConsumeCard';

import { architectureAssets } from './architectureAssets';

export default function ArchitectureStage() {
  return (
    <div className="arch-stage" id="architecture-stage">
      {/* Layer 1: Background Ambient Energy Glow (z-index 1) */}
      <div className="arch-layer arch-layer--background">
        <div className="arch-ambient-glow" id="prop-ambient" aria-hidden="true" />
      </div>

      {/* Layer 2: Header Information Badges (z-index 50) */}
      <div className="arch-layer arch-layer--header">
        <div className="arch-header-card" id="prop-hdr-left">
          <span className="arch-header-kicker">04 // PROPULSION ARCHITECTURE</span>
          <h2 className="arch-header-title">
            DIRECT CYLINDER<br />
            <span className="highlight-green-text">INDUCTION</span>
          </h2>
        </div>
        <div className="arch-spec-pill" id="prop-hdr-right">
          <span>SUPERSONIC COMBUSTION · ZERO FLEET SCRAP</span>
        </div>
      </div>

      {/* Layer 3: Mathematical Circular Flow Orbit System (z-index 20) */}
      <div className="arch-layer arch-layer--flow" id="prop-flow-svg" aria-hidden="true">
        <div className="flow-orbit" id="prop-flow-arrows" aria-hidden="true">
          <div className="flow-arrow arrow-b1-b2" id="prop-arrow-1">
            <img src={architectureAssets.arrowLeft} alt="Flow B1 to B2" draggable="false" />
          </div>
          <div className="flow-arrow arrow-b2-b3" id="prop-arrow-2">
            <img src={architectureAssets.arrowBottom} alt="Flow B2 to B3" draggable="false" />
          </div>
          <div className="flow-arrow arrow-b3-b1" id="prop-arrow-3">
            <img src={architectureAssets.arrowRight} alt="Flow B3 to B1" draggable="false" />
          </div>
        </div>
      </div>

      {/* Layer 4: Three Architecture Cards (z-index 30) */}
      <div className="arch-layer arch-layer--cards">
        <GenerateCard />
        <ControlCard />
        <ConsumeCard />
      </div>

      {/* Layer 5: Central Energy Core (z-index 40) */}
      <div className="arch-layer arch-layer--core">
        <ArchitectureCore />
      </div>
    </div>
  );
}
