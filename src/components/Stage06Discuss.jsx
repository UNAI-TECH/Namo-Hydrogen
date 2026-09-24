import React, { useState } from 'react';

export default function Stage06Discuss() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    segment: 'heavy-truck',
    scope: 'pilot',
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleDownloadWhitepaper = () => {
    alert('NAMO Hydrogen Thermodynamic Architecture Whitepaper download initiated.');
  };

  return (
    <div className="scene-ui-layer" id="scene-ui-5">
      <div className="scene-inner-container briefing-page-container">
        
        {/* Header Kicker & Headline */}
        <div className="briefing-header-block">
          <div className="hud-kicker">06 // DIRECT EXECUTIVE & TECHNICAL BRIEFING</div>
          <h2 className="briefing-main-headline">
            REQUEST TECHNICAL <span className="highlight-green-text">BRIEFING.</span>
          </h2>
          <p className="briefing-lead-sub">
            Schedule a confidential session with NAMO Hydrogen’s powertrain leadership for commercial fleet retrofits, OEM powertrain licensing, and zero-storage green transit integration.
          </p>
        </div>

        {/* Unified Request Briefing Card */}
        <div className="briefing-unified-card">
          
          {/* Quick Hubs & Whitepaper Strip */}
          <div className="briefing-meta-strip">
            <div className="meta-strip-item">
              <span className="strip-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg></span>
              <div className="strip-text">
                <span className="strip-label">DIRECT INQUIRIES</span>
                <a href="mailto:contact@namohydrogen.com" className="strip-val">contact@namohydrogen.com</a>
              </div>
            </div>

            <div className="meta-strip-sep"></div>

            <div className="meta-strip-item">
              <span className="strip-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg></span>
              <div className="strip-text">
                <span className="strip-label">ENGINEERING HUBS</span>
                <span className="strip-val">India (NG Auto) · Japan (Naripa Corp)</span>
              </div>
            </div>

            <div className="meta-strip-sep"></div>

            <div className="meta-strip-item meta-strip-wp">
              <span className="strip-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg></span>
              <div className="strip-text">
                <span className="strip-label">TECHNICAL SPECIFICATION</span>
                <span className="strip-val">DSHFG Thermodynamic Whitepaper</span>
              </div>
              <button
                type="button"
                className="btn-strip-download"
                onClick={handleDownloadWhitepaper}
              >
                PDF ↓
              </button>
            </div>
          </div>

          {/* Form / Success Confirmation */}
          {submitted ? (
            <div className="briefing-success-state">
              <div className="success-icon-badge">✓</div>
              <h3 className="success-title">Briefing Request Confirmed</h3>
              <p className="success-desc">
                Thank you, <strong>{formData.name}</strong> ({formData.organization || 'Your Organization'}). Our engineering and powertrain directors have received your briefing request and will reach out to <strong>{formData.email}</strong> within 24 hours.
              </p>
              <button
                type="button"
                className="btn-reset-briefing"
                onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    organization: '',
                    segment: 'heavy-truck',
                    scope: 'pilot',
                    notes: ''
                  });
                }}
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <form className="briefing-form-grid" onSubmit={handleSubmit}>
              <div className="form-row-2">
                <div className="form-field">
                  <label htmlFor="bf-name">Full Name *</label>
                  <input
                    id="bf-name"
                    type="text"
                    placeholder="e.g. Dr. Rajesh Sharma"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="bf-email">Work Email *</label>
                  <input
                    id="bf-email"
                    type="email"
                    placeholder="e.g. rajesh@transitfleet.in"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-row-2">
                <div className="form-field">
                  <label htmlFor="bf-org">Organization / Fleet Operator *</label>
                  <input
                    id="bf-org"
                    type="text"
                    placeholder="e.g. State Road Transport / OEM Logistics"
                    required
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="bf-phone">Phone / WhatsApp (Optional)</label>
                  <input
                    id="bf-phone"
                    type="tel"
                    placeholder="e.g. +91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-row-2">
                <div className="form-field">
                  <label htmlFor="bf-segment">Vehicle / Powertrain Segment</label>
                  <select
                    id="bf-segment"
                    value={formData.segment}
                    onChange={(e) => setFormData({ ...formData, segment: e.target.value })}
                  >
                    <option value="heavy-truck">Heavy Duty Long-Haul Logistics</option>
                    <option value="transit-bus">City & Intercity Transit Bus Fleets</option>
                    <option value="stationary-genset">Commercial Diesel Generator Decarbonization</option>
                    <option value="oem-licensing">Direct OEM Engine & Powertrain Licensing</option>
                  </select>
                </div>
                <div className="form-field">
                  <label htmlFor="bf-scope">Deployment Scope</label>
                  <select
                    id="bf-scope"
                    value={formData.scope}
                    onChange={(e) => setFormData({ ...formData, scope: e.target.value })}
                  >
                    <option value="pilot">Single Unit Demonstration Pilot (1–5 Vehicles)</option>
                    <option value="depot">Depot Scale Conversion (25–100 Fleets)</option>
                    <option value="oem">Full Powertrain Production Line Integration</option>
                  </select>
                </div>
              </div>

              <div className="form-field full-width">
                <label htmlFor="bf-notes">Project Scope / Specific Technical Inquiries (Optional)</label>
                <input
                  id="bf-notes"
                  type="text"
                  placeholder="Engine displacement, current fuel consumption, or target deployment timeline..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                />
              </div>

              <div className="form-action-row">
                <button type="submit" className="btn-confirm-briefing">
                  <span>CONFIRM TECHNICAL BRIEFING REQUEST</span>
                  <span className="btn-arrow-prominent">→</span>
                </button>
              </div>
            </form>
          )}

        </div>

      </div>
    </div>
  );
}
