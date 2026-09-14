import React from 'react';
import SectionHeading from '../ui/SectionHeading';
import Icon from '../ui/Icon';

/* ============================================================
   Portfolio gallery — before/after installation photos.
   Photo slots are intentionally EMPTY (dashed-border placeholders)
   until real project photos are provided; drop images in later.
   ============================================================ */

const SLOTS = [
  { label: 'CCTV Installation', stage: 'Before' },
  { label: 'CCTV Installation', stage: 'After' },
  { label: 'Networking & Cabling', stage: 'Before' },
  { label: 'Networking & Cabling', stage: 'After' },
  { label: 'Access Control Setup', stage: 'Before' },
  { label: 'Access Control Setup', stage: 'After' },
];

export default function PortfolioGallery() {
  return (
    <section className="section" aria-label="Project gallery">
      <div className="container">
        <SectionHeading
          eyebrow="Our work"
          title="Recent Projects"
          sub="Before-and-after shots from actual CCTV, networking and access control installations. Photos coming soon."
          centered
        />
        <div className="gallery-grid">
          {SLOTS.map((s, i) => (
            <figure key={`${s.label}-${s.stage}-${i}`} className="gallery-slot">
              <span className="gallery-badge">{s.stage}</span>
              <span className="gallery-icon" aria-hidden="true">
                <Icon name="camera" size={26} />
              </span>
              <figcaption className="gallery-label">{s.label}</figcaption>
              <span className="gallery-hint">Photo coming soon</span>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}