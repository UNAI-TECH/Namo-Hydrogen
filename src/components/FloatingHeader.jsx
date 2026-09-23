import React, { useState, useEffect } from 'react';

export default function FloatingHeader({ onOpenModal, onStepClick }) {
  const [activeStep, setActiveStep] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const steps = [
    { num: '01', name: 'Water', label: '01 WATER', detail: 'Genesis & Droplet' },
    { num: '02', name: 'Transform', label: '02 TRANSFORM', detail: 'Thermal Activation' },
    { num: '03', name: 'Generate', label: '03 GENERATE', detail: 'DSHFG Core' },
    { num: '04', name: 'Propulsion', label: '04 PROPULSION', detail: 'Powertrain Integration' },
    { num: '05', name: 'Founder', label: '05 FOUNDER', detail: 'Leadership & Story' },
    { num: '06', name: 'Briefing', label: '06 BRIEFING', detail: 'System Specifications' },
  ];

  useEffect(() => {
    const handleStageChange = (e) => {
      if (typeof e.detail?.step === 'number') {
        setActiveStep(e.detail.step);
      }
    };
    window.addEventListener('namo:stagechange', handleStageChange);
    return () => window.removeEventListener('namo:stagechange', handleStageChange);
  }, []);

  // Close dropdown if user clicks outside
  useEffect(() => {
    if (!isDropdownOpen) return;
    const handleOutsideClick = (e) => {
      if (!e.target.closest('.bento-stage-dropdown-wrapper')) {
        setIsDropdownOpen(false);
      }
    };
    window.addEventListener('click', handleOutsideClick);
    return () => window.removeEventListener('click', handleOutsideClick);
  }, [isDropdownOpen]);

  const handleStepSelect = (idx) => {
    setIsDropdownOpen(false);
    if (onStepClick) {
      onStepClick(idx);
    }
  };

  return (
    <header className="bento-floating-nav-container" id="floating-header">
      <div className="bento-nav-shell">
        
        {/* 1. Left Action Pill (Reference: Buy ↖) */}
        <button
          className={`bento-nav-action-pill left-action-pill ${activeStep === 0 ? 'is-active' : ''}`}
          id="nav-brand"
          onClick={() => handleStepSelect(0)}
          title="Onboard Hydrogen — Return to Genesis"
        >
          <div className="nav-brand-logo-frame" id="nav-brand-frame">
            <img src="/images/hydro-logo.webp" alt="Namo" className="nav-brand-logo-img" id="nav-brand-logo-img" />
          </div>
          <span className="pill-arrow-glyph arrow-left">↖</span>
          <span className="pill-brand-label">Onboard H₂</span>
        </button>

        {/* 2. Center Filter/Stage Chips (Reference: Location, Property Type, Max Price) */}
        <div className="bento-nav-chips-track">
          
          {/* Chip 1: Feedstock */}
          <button
            className={`bento-filter-chip ${activeStep === 0 ? 'chip-highlight' : ''}`}
            onClick={() => handleStepSelect(0)}
            title="Feedstock: Pure Water"
          >
            <span className="filter-chip-icon">💧</span>
            <div className="filter-chip-text">
              <span className="filter-chip-category">Feedstock</span>
              <span className="filter-chip-value">
                Pure H₂O <span className="chip-chevron">▾</span>
              </span>
            </div>
          </button>

          {/* Chip 2: Core Architecture */}
          <button
            className={`bento-filter-chip ${activeStep === 1 || activeStep === 2 ? 'chip-highlight' : ''}`}
            onClick={() => handleStepSelect(1)}
            title="Reaction: DSHFG Thermal Conversion"
          >
            <span className="filter-chip-icon">⚡</span>
            <div className="filter-chip-text">
              <span className="filter-chip-category">Conversion</span>
              <span className="filter-chip-value">
                DSHFG Core <span className="chip-chevron">▾</span>
              </span>
            </div>
          </button>

          {/* Chip 3: Storage Safety */}
          <button
            className={`bento-filter-chip ${activeStep === 3 ? 'chip-highlight' : ''}`}
            onClick={() => handleStepSelect(3)}
            title="Storage: 0 PSI Atmospheric"
          >
            <span className="filter-chip-icon">🛡️</span>
            <div className="filter-chip-text">
              <span className="filter-chip-category">Storage</span>
              <span className="filter-chip-value">
                0 PSI Safe <span className="chip-chevron">▾</span>
              </span>
            </div>
          </button>

          {/* Chip 4: Active Stage Router Dropdown */}
          <div className="bento-stage-dropdown-wrapper">
            <button
              className={`bento-filter-chip stage-router-chip ${isDropdownOpen ? 'menu-open' : ''}`}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              title="Navigate Mission Stages"
            >
              <span className="filter-chip-icon">🚀</span>
              <div className="filter-chip-text">
                <span className="filter-chip-category">Mission Stage</span>
                <span className="filter-chip-value" id="bento-active-stage-label">
                  {steps[activeStep]?.label || '01 WATER'} <span className="chip-chevron">▾</span>
                </span>
              </div>
            </button>

            {isDropdownOpen && (
              <div className="bento-stage-dropdown-menu">
                <div className="dropdown-menu-header">SELECT STAGE</div>
                {steps.map((st, idx) => (
                  <button
                    key={st.num}
                    className={`dropdown-menu-item ${activeStep === idx ? 'item-active' : ''}`}
                    onClick={() => handleStepSelect(idx)}
                  >
                    <span className="item-num">{st.num}</span>
                    <div className="item-info">
                      <span className="item-name">{st.name}</span>
                      <span className="item-desc">{st.detail}</span>
                    </div>
                    {activeStep === idx && <span className="item-dot"></span>}
                  </button>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* 3. Right Action Pill (Reference: Rent ↗) */}
        <button
          className="bento-nav-action-pill right-action-pill"
          id="btn-open-modal"
          onClick={onOpenModal}
          title="Open Technical Briefing"
        >
          <span className="pill-brand-label">Request Briefing</span>
          <span className="pill-arrow-glyph arrow-right">↗</span>
        </button>

      </div>
    </header>
  );
}
