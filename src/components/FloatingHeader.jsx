import React, { useState, useEffect } from 'react';

export default function FloatingHeader({ onStepClick }) {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { num: '01', name: 'Overview' },
    { num: '02', name: 'Transform' },
    { num: '03', name: 'Generate' },
    { num: '04', name: 'Propulsion' },
    { num: '05', name: 'Founder' },
    { num: '06', name: 'Briefing' },
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

  const handleStepSelect = (idx) => {
    if (onStepClick) {
      onStepClick(idx);
    }
  };

  return (
    <nav className="top-glass-nav" id="top-nav">
      
      {/* Left: Brand Logo */}
      <div className="nav-left-brand" id="nav-brand">
        <div className="nav-brand-frame" id="nav-brand-frame">
          <img src="/images/hydro-logo.webp" alt="NAMO Hydrogen Logo" className="nav-brand-img" id="nav-brand-img" />
        </div>
        <div className="brand-text-block">
          <span className="brand-name-top">NAMO</span>
          <span className="brand-name-sub">HYDROGEN</span>
        </div>
      </div>

      {/* Right: Navigation Links */}
      <div className="nav-right-links">
        {steps.map((st, idx) => (
          <button 
            key={st.num}
            className={`nav-link ${activeStep === idx ? 'active' : ''} ${idx === steps.length - 1 ? 'btn-style' : ''}`}
            onClick={() => handleStepSelect(idx)}
          >
            {st.name}
          </button>
        ))}
      </div>

    </nav>
  );
}
