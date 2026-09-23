import React, { useState, useEffect } from 'react';

export default function BriefingModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    interest: 'Commercial Fleet Engine Retrofit',
    scope: 'pilot'
  });

  const [submitted, setSubmitted] = useState(false);

  // Prevent background scrolling while modal is open
  useEffect(() => {
    if (!isOpen) return;

    const preventScroll = (e) => {
      const modal = document.querySelector('.luxury-briefing-modal');
      if (modal && modal.contains(e.target)) {
        if (modal.scrollHeight > modal.clientHeight) {
          return;
        }
      }
      e.preventDefault();
    };

    window.addEventListener('wheel', preventScroll, { passive: false });
    window.addEventListener('touchmove', preventScroll, { passive: false });

    return () => {
      window.removeEventListener('wheel', preventScroll);
      window.removeEventListener('touchmove', preventScroll);
    };
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      onClose();
      setSubmitted(false);
    }, 2400);
  };

  const handleBackdropClick = (e) => {
    if (e.target.id === 'briefing-modal') {
      onClose();
    }
  };

  return (
    <div
      className={`modal-backdrop ${isOpen ? 'open' : ''}`}
      id="briefing-modal"
      onClick={handleBackdropClick}
    >
      <div className="modal-card luxury-briefing-modal">
        <button className="modal-close" id="btn-close-modal" aria-label="Close dialog" onClick={onClose}>
          &times;
        </button>

        {submitted ? (
          <div className="modal-success-view">
            <div className="modal-success-badge">✓</div>
            <h3 className="modal-success-title">Briefing Request Received</h3>
            <p className="modal-success-sub">
              Thank you, <strong>{formData.name}</strong>. Our engineering directors will reach out to <strong>{formData.email}</strong> within 24 hours.
            </p>
          </div>
        ) : (
          <div className="modal-content-wrap">
            <div className="modal-header">
              <div className="modal-badge-row">
                <div className="modal-logo-badge">
                  <img src="/images/hydro-logo.webp" alt="NAMO Hydrogen" className="modal-logo-img" />
                </div>
                <span className="modal-hud-kicker">EXECUTIVE BRIEFING</span>
              </div>
              <h3 className="modal-title">Request Technical Briefing</h3>
              <p className="modal-subtitle">
                Direct session with NAMO Hydrogen’s powertrain leadership for commercial fleet retrofits, OEM licensing, or transit integration.
              </p>
            </div>

            <form className="modal-form" onSubmit={handleSubmit}>
              <div className="modal-grid-2">
                <div className="modal-field">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    placeholder="e.g. Dr. Rajesh Sharma"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="modal-field">
                  <label>Corporate Email *</label>
                  <input
                    type="email"
                    placeholder="name@organization.com"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="modal-grid-2">
                <div className="modal-field">
                  <label>Organization / Fleet Operator *</label>
                  <input
                    type="text"
                    placeholder="State Road Transport / Fleet Corp"
                    required
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                  />
                </div>
                <div className="modal-field">
                  <label>Contact Phone (Optional)</label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="modal-grid-2">
                <div className="modal-field">
                  <label>Primary Vehicle Segment</label>
                  <select
                    value={formData.interest}
                    onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                  >
                    <option value="Commercial Fleet Engine Retrofit">Commercial Heavy Logistics</option>
                    <option value="Transit Bus Fleets">City & Intercity Transit Buses</option>
                    <option value="Stationary Genset Decarbonization">Stationary Commercial Gensets</option>
                    <option value="OEM Powertrain Licensing">OEM Powertrain Architecture Licensing</option>
                  </select>
                </div>
                <div className="modal-field">
                  <label>Fleet Scale</label>
                  <select
                    value={formData.scope}
                    onChange={(e) => setFormData({ ...formData, scope: e.target.value })}
                  >
                    <option value="pilot">Pilot Demo (1–5 Units)</option>
                    <option value="depot">Depot Scale (25–100 Fleets)</option>
                    <option value="oem">Full Production OEM Integration</option>
                  </select>
                </div>
              </div>

              <button type="submit" className="btn-modal-submit">
                <span>SUBMIT BRIEFING REQUEST</span>
                <span className="btn-arrow-prominent">→</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
