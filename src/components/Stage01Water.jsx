import React from 'react';

export default function Stage01Water({ onExplore, onOpenModal, onStepClick }) {
  const stageIcons = [
    { num: '01', label: 'Water', icon: '💧' },
    { num: '02', label: 'Transform', icon: '⚡' },
    { num: '03', label: 'Generate', icon: '🔬' },
    { num: '04', label: 'Propulsion', icon: '🚀' },
    { num: '05', label: 'Founder', icon: '👤' },
    { num: '06', label: 'Briefing', icon: '📋' },
  ];

  return (
    <div className="scene-ui-layer" id="scene-ui-0">
      <div className="scene-inner-container bento-hero-container">
        
        {/* Phase 1A: ORGANIC BENTO PANORAMIC FRAME (Hero) */}
        <div className="narrative-block stage-01-hero" id="stage-01-hero">
          
          {/* ═══ CENTRAL PANORAMIC BENTO VIEWPORT ═══ */}
          <div className="hero-bento-viewport">
            {/* ── Left Vertical Floating Tool Rail ── */}
            <div className="bento-left-tool-rail">
              {stageIcons.map((stage, idx) => (
                <button
                  key={stage.num}
                  className={`tool-rail-icon ${idx === 0 ? 'active-rail' : ''}`}
                  data-stage={idx}
                  onClick={() => onStepClick && onStepClick(idx)}
                  title={`${stage.num} ${stage.label}`}
                >
                  <span className="rail-icon-glyph">{stage.icon}</span>
                </button>
              ))}
            </div>

            {/* ── Giant Ethereal Background Typography ── */}
            <div className="bento-hero-typography">
              <h1 className="bento-giant-headline" aria-label="From Water To Power.">
                <span className="bento-headline-line">From Water</span>
                <span className="bento-headline-line bento-headline-accent">To Power</span>
              </h1>
            </div>

            {/* ── Bottom-Left Fused Organic Stats Card ── */}
            <div className="bento-fused-card">
              <div className="fused-card-content">
                <h3 className="fused-card-title">Zero Storage. Pure Power.</h3>
                <p className="fused-card-desc">
                  No high-pressure tanks. No refueling network. Hydrogen generated onboard from ordinary water, in real time.
                </p>
                <div className="fused-card-stats">
                  <div className="fused-stat">
                    <span className="fused-stat-value">18+</span>
                    <span className="fused-stat-label">Yrs IP</span>
                  </div>
                  <div className="fused-stat-chips">
                    <span className="fused-chip">Patent Granted</span>
                    <span className="fused-chip">IIT Validated</span>
                    <span className="fused-chip">Govt. Aligned</span>
                  </div>
                </div>
              </div>
              <button className="fused-card-arrow" onClick={onExplore}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </div>

            {/* ── Bottom-Right Frosted Glass Telemetry Card ── */}
            <div className="bento-glass-card">
              <div className="glass-card-header">
                <span className="glass-card-kicker">DSHFG THERMODYNAMIC CORE</span>
                <button className="glass-card-expand" onClick={onExplore}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </button>
              </div>
              <p className="glass-card-desc">
                Direct Steam Hydrogen Fuel Generation — converting waste heat into clean H₂ at the point of combustion.
              </p>
              <div className="glass-card-specs">
                <span className="glass-spec-badge">0 PSI Storage</span>
                <span className="glass-spec-badge highlight-spec">99.99% Purity</span>
                <span className="glass-spec-badge">₹20/kg Target</span>
              </div>
              <div className="glass-card-brand-action">
                <div className="brand-action-circle">
                  <img src="/images/hydro-logo.webp" alt="NAMO" className="brand-action-logo" />
                </div>
              </div>
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
