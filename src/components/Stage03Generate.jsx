import React from 'react';

export default function Stage03Generate() {
  return (
    <div className="scene-ui-layer" id="scene-ui-2">
      <div className="scene-inner-container orbit-stage-container" id="stage-03-orbit-wrap">
        
        <div className="orbit-header" id="orbit-header">
          <div className="hud-kicker">03 // TECHNICAL ARCHITECTURE</div>
          <h2 className="orbit-headline">
            CLOSED-LOOP <span className="highlight-green-text">MOLECULAR ORBIT</span>
          </h2>
        </div>

        {/* 4 Floating Orbit Modules with Multi-Layer Parallax & Depth */}
        <div className="orbit-module orbit-mod-1 depth-bg" id="orbit-mod-1">
          <div className="orbit-mod-content">
            <div className="mod-kicker">ARCHITECTURE</div>
            <div className="mod-val">ONBOARD H₂</div>
            <div className="mod-sub">GENERATION</div>
            <div className="mod-accent-bar"></div>
          </div>
        </div>

        <div className="orbit-module orbit-mod-2 depth-mid" id="orbit-mod-2">
          <div className="orbit-mod-content">
            <div className="mod-kicker">HEAT SOURCE</div>
            <div className="mod-val">RECOVERED</div>
            <div className="mod-sub">THERMAL ENERGY</div>
            <div className="mod-accent-bar"></div>
          </div>
        </div>

        <div className="orbit-module orbit-mod-3 depth-fg" id="orbit-mod-3">
          <div className="orbit-mod-content">
            <div className="mod-kicker">PRESSURE REGIME</div>
            <div className="mod-val">0 PSI NO STORAGE</div>
            <div className="mod-sub">ZERO HIGH-PRESSURE HAZARD</div>
            <div className="mod-accent-bar"></div>
          </div>
        </div>

        <div className="orbit-module orbit-mod-4 depth-fg" id="orbit-mod-4">
          <div className="orbit-mod-content">
            <div className="mod-kicker">GENERATION</div>
            <div className="mod-val">REAL-TIME</div>
            <div className="mod-sub">ON-DEMAND MOBILITY</div>
            <div className="mod-accent-bar"></div>
          </div>
        </div>

        {/* Soft Green Ambient Core Pool */}
        <div className="droplet-ambient-pool" id="droplet-ambient-pool" aria-hidden="true"></div>

      </div>
    </div>
  );
}
