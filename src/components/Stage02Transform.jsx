import React from 'react';

export default function Stage02Transform() {
  return (
    <div className="scene-ui-layer" id="scene-ui-1">
      <div className="scene-inner-container split-stage-container" id="stage-02-split-wrap">
        
        {/* Split Card Left Panel: Architecture */}
        <div className="split-panel split-panel-left" id="split-card-left">
          <svg className="morph-card-svg" viewBox="0 0 460 440" preserveAspectRatio="none" aria-hidden="true">
            {/* Right side carved inward to embrace center droplet */}
            <path
              className="morph-path-split-l"
              d="M 32,0 L 390,0 Q 430,0 430,36 L 430,120 C 360,160 360,280 430,320 L 430,404 Q 430,440 390,440 L 32,440 Q 0,440 0,404 L 0,36 Q 0,0 32,0 Z"
              fill="url(#card-glass-spec)"
              stroke="rgba(22, 163, 74, 0.22)"
              strokeWidth="1.5"
              filter="url(#soft-card-shadow)"
            />
          </svg>
          <div className="split-panel-inner">
            <div className="card-step-header">
              <span className="card-step-num">02.A</span>
              <span className="card-step-rule"></span>
              <span className="hud-kicker-tag">ARCHITECTURE</span>
            </div>
            <h3 className="panel-headline">
              <span className="title-primary">ONBOARD H₂</span>
              <span className="title-secondary">GENERATION</span>
            </h3>
            <p className="panel-desc">
              We don't transport the fuel. We generate it directly inside the vehicle powertrain in real time, eliminating volatile logistics.
            </p>
            <div className="panel-mini-metrics">
              <div className="mini-metric">
                <span className="metric-val">0 PSI</span>
                <span className="metric-lbl">STORAGE REQUIRED</span>
              </div>
              <div className="mini-metric">
                <span className="metric-val">100%</span>
                <span className="metric-lbl">ON-DEMAND H₂</span>
              </div>
            </div>
          </div>
        </div>

        {/* Central Canyon: Droplet travels through here */}
        <div className="split-central-gap" id="split-canyon-gap" aria-hidden="true"></div>

        {/* Split Card Right Panel: Heat Source */}
        <div className="split-panel split-panel-right" id="split-card-right">
          <svg className="morph-card-svg" viewBox="0 0 460 440" preserveAspectRatio="none" aria-hidden="true">
            {/* Left side carved inward (mirrored) to embrace center droplet */}
            <path
              className="morph-path-split-r"
              d="M 70,0 L 428,0 Q 460,0 460,36 L 460,404 Q 460,440 428,440 L 70,440 Q 30,440 30,404 L 30,320 C 100,280 100,160 30,120 L 30,36 Q 30,0 70,0 Z"
              fill="url(#card-glass-spec)"
              stroke="rgba(22, 163, 74, 0.22)"
              strokeWidth="1.5"
              filter="url(#soft-card-shadow)"
            />
          </svg>
          <div className="split-panel-inner">
            <div className="card-step-header">
              <span className="card-step-num">02.B</span>
              <span className="card-step-rule"></span>
              <span className="hud-kicker-tag">HEAT SOURCE</span>
            </div>
            <h3 className="panel-headline">
              <span className="title-primary">RECOVERED</span>
              <span className="title-secondary">THERMAL ENERGY</span>
            </h3>
            <p className="panel-desc">
              Recycling 60%+ of internal combustion exhaust heat as the primary thermodynamic dissociation driver — no external electric grid dependency.
            </p>
            <div className="panel-mini-metrics">
              <div className="mini-metric">
                <span className="metric-val">650°C+</span>
                <span className="metric-lbl">EXHAUST RECYCLED</span>
              </div>
              <div className="mini-metric">
                <span className="metric-val">₹20<span className="unit-sub">/kg</span></span>
                <span className="metric-lbl">H₂ COST TARGET</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
