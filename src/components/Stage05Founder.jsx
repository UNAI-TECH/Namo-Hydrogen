import React from 'react';

export default function Stage05Founder({ onGotoDiscuss, onExploreStory }) {
  return (
    <div className="scene-ui-layer" id="scene-ui-4">
      <div className="founder-split-container" id="founder-split-container">
        
        {/* Left Side: Container hosting Brand Climax (Phase 1) and Founder Story (Phase 2) */}
        <div className="founder-left-side" id="founder-left-block">
          
          {/* Phase 1: Brand Logo (Centered & Bigger), Headline & Verified Engineering Stats */}
          <div className="founder-left-brand-state" id="founder-left-brand">
            <div className="founder-brand-logo-wrap" id="founder-logo-wrap">
              <div className="logo-ambient-glow"></div>
            </div>

            <div className="brand-climax-copy">
              <div className="brand-tagline-kicker">NAMO HYDROGEN</div>
              <h2 className="brand-climax-headline">
                ENGINEERED FOR THE NEXT POWERTRAIN.
              </h2>
              <div className="brand-pillars-strip">
                <span className="pillar-item">ONBOARD H₂</span>
                <span className="pillar-dot">·</span>
                <span className="pillar-item">ZERO STORAGE</span>
                <span className="pillar-dot">·</span>
                <span className="pillar-item">RETROFIT READY</span>
              </div>
            </div>

            {/* Verified Engineering Statistics */}
            <div className="engineering-stats-bar">
              <div className="stat-unit">
                <span className="stat-num">18+</span>
                <span className="stat-name">YEARS IP</span>
              </div>
              <div className="stat-sep"></div>
              <div className="stat-unit">
                <span className="stat-num">2</span>
                <span className="stat-name">PATENTS</span>
              </div>
              <div className="stat-sep"></div>
              <div className="stat-unit">
                <span className="stat-num">99.99%</span>
                <span className="stat-name">PURITY</span>
              </div>
              <div className="stat-sep"></div>
              <div className="stat-unit">
                <span className="stat-num">0 PSI</span>
                <span className="stat-name">STORAGE</span>
              </div>
              <div className="stat-sep"></div>
              <div className="stat-unit">
                <span className="stat-num">₹20<span className="unit-sub">/kg</span></span>
                <span className="stat-name">TARGET</span>
              </div>
            </div>
          </div>

          {/* Phase 2: Once logo moves to navbar, founder profile & content displays in that place */}
          <div className="founder-left-story-state" id="founder-left-story">
            <div className="founder-role-pill">FOUNDER</div>
            
            <h2 className="founder-story-title">Fathima Ali</h2>
            
            <p className="founder-story-p1">
              Fathima Ali leads NAMO Hydrogen with a vision to replace fossil fuels through scalable, affordable, and practical hydrogen technologies.
            </p>
            
            <p className="founder-story-p2">
              Her focus is on developing infrastructure-independent clean energy systems capable of accelerating the global transition toward zero-emission transportation and sustainable industrial energy.
            </p>

            <div className="founder-vision-box">
              <span className="vision-kicker">VISION</span>
              <p className="vision-statement">A zero-carbon future powered by hydrogen.</p>
            </div>

            <div className="founder-statement-quote">
              <p className="quote-body">
                “Every combustion engine on the planet was discarding enough thermal energy to power itself twice over. The fuel was already there. The engine just didn't know how to speak hydrogen yet.”
              </p>
              <span className="quote-byline">— Fathima Ali, Founder & Chief Inventor</span>
            </div>

            <div className="founder-actions-row">
              <button
                className="btn-connect-team"
                id="btn-connect-team"
                type="button"
                onClick={onGotoDiscuss}
              >
                <span>Connect With the Team</span>
                <span className="btn-icon-arrow">→</span>
              </button>
            </div>
          </div>

        </div>

        {/* Center: Glowing Straight Split Divider Line */}
        <div className="founder-split-line" id="founder-split-line"></div>

        {/* Right Side: Big Picture of Founder & Scroll Down Prompt */}
        <div className="founder-right-side" id="founder-right-block">
          <div className="founder-showcase-panel" id="founder-card">
            
            <div className="founder-big-picture-frame">
              <img
                src="/images/fathima-ali.jpg"
                alt="Fathima Ali — Founder & Chief Inventor"
                className="founder-big-picture-img"
              />
              <div className="founder-picture-badge">
                <span className="badge-role">FOUNDER & CHIEF INVENTOR</span>
                <span className="badge-name">FATHIMA ALI</span>
              </div>
            </div>

            <button
              className="scroll-more-founder-btn"
              id="btn-scroll-more-founder"
              onClick={onExploreStory || onGotoDiscuss}
              type="button"
            >
              <div className="scroll-btn-left">
                <span className="scroll-btn-kicker">EXPLORE BIOGRAPHY & VISION</span>
                <span className="scroll-btn-title">Scroll down to know more about the founder</span>
              </div>
              <div className="scroll-btn-arrow-circle">
                <span className="arrow-down-icon">↓</span>
              </div>
            </button>

          </div>
        </div>

      </div>
    </div>
  );
}
