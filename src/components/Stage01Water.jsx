import React from 'react';

export default function Stage01Water({ onExplore, onOpenModal, onStepClick }) {
  const stageIcons = [
    { num: '01', label: 'Water', icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
      </svg>
    )},
    { num: '02', label: 'Transform', icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    )},
    { num: '03', label: 'Generate', icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
      </svg>
    )},
    { num: '04', label: 'Propulsion', icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
      </svg>
    )},
    { num: '05', label: 'Founder', icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
      </svg>
    )},
    { num: '06', label: 'Briefing', icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/><path d="M9 14l2 2 4-4"/>
      </svg>
    )},
  ];

  return (
    <div className="scene-ui-layer" id="scene-ui-0">
      <div className="scene-inner-container bento-hero-container">
        
        {/* Phase 1A: ORGANIC BENTO PANORAMIC FRAME (Hero) */}
        <div className="narrative-block stage-01-hero" id="stage-01-hero">
          
          {/* ═══ CENTRAL PANORAMIC BENTO VIEWPORT ═══ */}
          <div className="hero-bento-viewport">


            {/* ── Animated Ambient Glow Rings ── */}
            <div className="hero-ambient-glow" aria-hidden="true">
              <div className="glow-ring glow-ring-1"></div>
              <div className="glow-ring glow-ring-2"></div>
              <div className="glow-ring glow-ring-3"></div>
            </div>

            {/* ── Floating Molecular Orbs ── */}
            <div className="hero-molecular-orbs" aria-hidden="true">
              <div className="mol-orb mol-orb-1"></div>
              <div className="mol-orb mol-orb-2"></div>
              <div className="mol-orb mol-orb-3"></div>
              <div className="mol-orb mol-orb-4"></div>
              <div className="mol-orb mol-orb-5"></div>
            </div>

            {/* ── Giant Ethereal Background Typography ── */}
            <div className="bento-hero-typography">
              <h1 className="bento-giant-headline" aria-label="From Water To Power.">
                <span className="bento-headline-line">From Water</span>
                <span className="bento-headline-line bento-headline-accent">To Power</span>
              </h1>
            </div>


          </div>
          
        </div>

        {/* Phase 1B: First Transition — CARD STATE 01 (ORGANIC CUTOUT + RIGHT TELEMETRY HUD) */}
        <div className="narrative-block stage-01-descent" id="stage-01-descent">
          
          {/* Left: Sculpted Organic Card with Asymmetric Concave Pocket */}
          <div className="organic-morph-card state-01-card" id="card-state-01">
            <svg className="morph-card-svg" viewBox="0 0 540 440" preserveAspectRatio="none" aria-hidden="true">
              <defs>
                <filter id="soft-card-shadow" x="-10%" y="-10%" width="130%" height="130%">
                  <feDropShadow dx="0" dy="16" stdDeviation="20" floodColor="#0a2d19" floodOpacity="0.09" />
                  <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#0a2d19" floodOpacity="0.04" />
                </filter>
                <linearGradient id="card-glass-spec" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                  <stop offset="60%" stopColor="#f5faf7" stopOpacity="0.90" />
                  <stop offset="100%" stopColor="#edf6f1" stopOpacity="0.94" />
                </linearGradient>
              </defs>
              {/* Deep smooth concave curve carved on right side between y: 120 and y: 320 */}
              <path
                className="morph-path-01"
                d="M 32,0 L 460,0 Q 500,0 500,36 L 500,120 C 420,155 420,285 500,320 L 500,404 Q 500,440 460,440 L 32,440 Q 0,440 0,404 L 0,36 Q 0,0 32,0 Z"
                fill="url(#card-glass-spec)"
                stroke="rgba(22, 163, 74, 0.22)"
                strokeWidth="1.5"
                filter="url(#soft-card-shadow)"
              />
            </svg>
            
            {/* Subtle Green Energy Aura inside the carved pocket */}
            <div className="carve-pocket-aura" id="carve-aura-01"></div>

            <div className="morph-card-inner">
              <div className="card-step-header">
                <span className="card-step-num">01</span>
                <span className="card-step-rule"></span>
                <span className="hud-kicker-tag">01 // WATER</span>
              </div>
              <h2 className="morph-card-title">
                <span className="title-primary">IT STARTS WITH</span>
                <span className="title-secondary">WATER.</span>
              </h2>
              <div className="short-manifesto-list">
                <div className="manifesto-line"><span className="line-bullet">—</span> No high-pressure storage tanks.</div>
                <div className="manifesto-line"><span className="line-bullet">—</span> No external refueling network.</div>
                <div className="manifesto-line"><span className="line-bullet">—</span> Zero supply chain dependency.</div>
                <div className="manifesto-line highlight-manifesto"><span className="line-bullet">→</span> Pure H₂O converted directly into power onboard.</div>
              </div>
              <div className="card-bottom-pill">
                <div className="card-pill-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
                  </svg>
                </div>
                <div className="card-pill-text">
                  <span className="pill-title">STARTING MATERIAL</span>
                  <span className="pill-sub">PURE H₂O ONBOARD</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Companion Molecular Telemetry HUD Cluster */}
          <div className="stage-01-telemetry-cluster" id="stage-01-telem">
            <div className="cluster-kicker">
              <span className="hud-pulse-dot"></span>
              <span>MOLECULAR DISSOCIATION HUD</span>
            </div>

            {/* Real Chemical Equation Block */}
            <div className="cluster-reaction-card">
              <div className="reaction-tag">ONBOARD CATALYTIC CRACKING</div>
              <div className="reaction-formula">
                <span className="formula-term">2H<sub className="chem-sub">2</sub>O <span className="chem-state">(l)</span></span>
                <span className="formula-arrow">⟶</span>
                <span className="formula-term highlight-term">2H<sub className="chem-sub">2</sub> <span className="chem-state">(g)</span></span>
                <span className="formula-plus">+</span>
                <span className="formula-term">O<sub className="chem-sub">2</sub> <span className="chem-state">(g)</span></span>
              </div>
              <div className="formula-sub">Thermal energy harvested from 650°C+ engine waste exhaust</div>
            </div>

            {/* 3 Floating Live Telemetry Metric Badges */}
            <div className="cluster-metric-deck">
              <div className="cluster-metric-card">
                <div className="clust-top">
                  <span className="clust-val">99.99%</span>
                  <span className="clust-badge">PURITY</span>
                </div>
                <div className="clust-lbl">H₂ Dissociation Purity</div>
                <div className="clust-sub">Pure water vapor exhaust</div>
              </div>

              <div className="cluster-metric-card">
                <div className="clust-top">
                  <span className="clust-val">650°C+</span>
                  <span className="clust-badge">THERMAL</span>
                </div>
                <div className="clust-lbl">Waste Heat Recycled</div>
                <div className="clust-sub">Direct powertrain thermodynamic drive</div>
              </div>

              <div className="cluster-metric-card">
                <div className="clust-top">
                  <span className="clust-val">0 PSI</span>
                  <span className="clust-badge">SAFETY</span>
                </div>
                <div className="clust-lbl">Storage Required</div>
                <div className="clust-sub">Zero high-pressure tank hazards</div>
              </div>
            </div>

            {/* Economy Validation Chip */}
            <div className="cluster-economy-chip">
              <span className="econ-dot"></span>
              <span className="econ-title">TARGET FUEL COST:</span>
              <span className="econ-val">₹20 / KG H₂</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
