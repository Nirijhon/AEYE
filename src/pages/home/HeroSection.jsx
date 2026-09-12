import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Icon from '../../components/ui/Icon';

export default function HeroSection() {
  return (
    <section className="hero" aria-label="Intro">
      <div className="hero-circuit" aria-hidden="true" />
      <div className="container hero-grid">
        <div>
          <p className="hero-eyebrow">
            <Icon name="badgeCheck" size={15} />
            For Homes & Businesses
          </p>
          <h1 className="hero-title">
            Smart security. <em>Reliable technology.</em>
          </h1>
          <p className="hero-sub">
            CCTV • Security Systems • Networking — supplied, installed, repaired and
            maintained by A•EYE for homes and businesses.
          </p>
          <div className="hero-actions">
            <Button to="/request-personnel" variant="primary" size="lg">
              <Icon name="shield" size={18} />
              Request a Service
            </Button>
            <Button to="/careers" variant="outline-light" size="lg">
              <Icon name="user" size={18} />
              Join Our Team
            </Button>
          </div>
          <div className="hero-trust">
            <span>
              <Icon name="checkCircle" size={15} /> Installation
            </span>
            <span>
              <Icon name="checkCircle" size={15} /> Repair
            </span>
            <span>
              <Icon name="checkCircle" size={15} /> Maintenance
            </span>
          </div>
        </div>

        <div className="hero-visual">
          <div className="glass-panel gateway-panel">
            {/* Header */}
            <div className="gateway-head">
              <span className="gateway-eyebrow">Interactive Gateway</span>
              <h3 className="gateway-title">Select Your Portal</h3>
              <p className="gateway-sub">Direct access for enterprise clients and job applicants</p>
            </div>

            {/* GATEWAY 1: CLIENT PORTAL */}
            <div className="gateway-card gateway-cyan">
              <span className="gateway-glow" aria-hidden="true" />
              <div className="gateway-row">
                <span className="gateway-icon gateway-icon-cyan" aria-hidden="true">
                  <Icon name="building" size={24} />
                </span>
                <div className="gateway-info">
                  <div className="gateway-label-row">
                    <span className="gateway-label gateway-label-cyan">For Enterprises & Facilities</span>
                    <span className="gateway-pulse gateway-pulse-cyan" aria-hidden="true" />
                  </div>
                  <h4 className="gateway-name">Client Portal</h4>
                  <p className="gateway-desc">
                    Request CCTV, security systems or networking — installation, repair and maintenance.
                  </p>
                </div>
              </div>

              <div className="gateway-foot">
                <span className="gateway-meta">
                  <Icon name="shieldCheck" size={14} /> CCTV • Systems • Network
                </span>
                <Link to="/request-personnel" className="gateway-cta gateway-cta-cyan">
                  Hire Security <Icon name="arrowRight" size={14} />
                </Link>
              </div>
            </div>

            {/* GATEWAY 2: APPLICANT PORTAL */}
            <div className="gateway-card gateway-purple">
              <span className="gateway-glow gateway-glow-purple" aria-hidden="true" />
              <div className="gateway-row">
                <span className="gateway-icon gateway-icon-purple" aria-hidden="true">
                  <Icon name="userCheck" size={24} />
                </span>
                <div className="gateway-info">
                  <div className="gateway-label-row">
                    <span className="gateway-label gateway-label-purple">For Job Seekers & Personnel</span>
                    <span className="gateway-pulse gateway-pulse-purple" aria-hidden="true" />
                  </div>
                  <h4 className="gateway-name">Applicant Portal</h4>
                  <p className="gateway-desc">
                    Apply for active guard roles, CCTV technician jobs, or command center positions.
                  </p>
                </div>
              </div>

              <div className="gateway-foot">
                <span className="gateway-meta">
                  <Icon name="briefcase" size={14} /> Active Openings
                </span>
                <Link to="/careers" className="gateway-cta gateway-cta-purple">
                  Explore Careers <Icon name="arrowDown" size={14} />
                </Link>
              </div>
            </div>

            {/* Card Footer */}
            <div className="gateway-footer">
              <span className="gateway-footer-left">
                <Icon name="shield" size={14} /> A•EYE Portal Active
              </span>
              <span className="gateway-footer-right">Secure Dispatch System</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}