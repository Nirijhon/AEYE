import React from 'react';

/* ============================================================
   Unified inline SVG icon set (stroke-based, currentColor).
   Usage: <Icon name="shield" size={20} />
   Paths use a compact array form: each element is a <path d> string.
   ============================================================ */

// circle helper -> arc path for a circle at (cx,cy) radius r
const circ = (cx, cy, r) =>
  `M${cx - r} ${cy}a${r} ${r} 0 1 0 ${r * 2} 0a${r} ${r} 0 1 0 ${-r * 2} 0z`;

const P = {
  shield: ['M12 22s8-3.5 8-10V5l-8-3-8 3v7c0 6.5 8 10 8 10Z', 'm9 12 2 2 4-4'],
  eye: ['M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z', circ(12, 12, 3)],
  cctv: [circ(12, 12, 2), 'M4.9 19a10 10 0 0 1 14.2 0', 'M2.6 14.5a14 14 0 0 1 18.8 0'],
  car: ['M5 17h-2v-4l2-5h14l2 5v4h-2', 'M5 13h14', circ(7.5, 17, 2), circ(16.5, 17, 2)],
  users: [
    'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2',
    circ(9, 7, 4),
    'M23 21v-2a4 4 0 0 0-3-3.87',
    'M16 3.13a4 4 0 0 1 0 7.75',
  ],
  user: ['M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2', circ(12, 7, 4)],
  briefcase: ['M2 7h20v14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2Z', 'M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16'],
  clipboard: [
    'M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2',
    'M8 2h8v4H8Z',
    'M9 12h6',
    'M9 16h4',
  ],
  mapPin: ['M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z', circ(12, 10, 3)],
  phone: [
    'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z',
  ],
  mail: ['M2 4h20v16H2Z', 'm22 7-10 6L2 7'],
  clock: [circ(12, 12, 10), 'M12 6v6l4 2'],
  calendar: ['M3 4h18v18H3Z', 'M16 2v4', 'M8 2v4', 'M3 10h18'],
  building: [
    'M10 12h4',
    'M10 8h4',
    'M14 21v-3a2 2 0 0 0-4 0v3',
    'M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2',
    'M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16',
  ],
  wallet: [
    'M21 12V7H5a2 2 0 0 1 0-4h14v4',
    'M3 5v14a2 2 0 0 0 2 2h16v-5',
    'M18 12a2 2 0 0 0 0 4h4v-4Z',
  ],
  badgeCheck: [
    'M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z',
    'm9 12 2 2 4-4',
  ],
  award: [circ(12, 8, 6), 'M15.5 13 17 22l-5-3-5 3 1.5-9'],
  search: [circ(11, 11, 8), 'm21 21-4.3-4.3'],
  menu: ['M4 6h16', 'M4 12h16', 'M4 18h16'],
  x: ['M18 6 6 18', 'm6 6 12 12'],
  chevronRight: ['m9 18 6-6-6-6'],
  chevronDown: ['m6 9 6 6 6-6'],
  arrowRight: ['M5 12h14', 'm12 5 7 7-7 7'],
  arrowUp: ['M12 19V5', 'm5 12 7-7 7 7'],
  check: ['M20 6 9 17l-5-5'],
  checkCircle: [circ(12, 12, 10), 'm9 12 2 2 4-4'],
  alert: [circ(12, 12, 10), 'M12 8v4', 'M12 16h.01'],
  info: [circ(12, 12, 10), 'M12 16v-4', 'M12 8h.01'],
  star: [
    'M12 2l2.9 6.26 6.6.6-5 4.4 1.5 6.5L12 16.9 5.99 19.75l1.5-6.5-5-4.4 6.6-.6L12 2Z',
  ],
  filter: ['M22 3H2l8 9.46V19l4 2v-8.54L22 3Z'],
  download: ['M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4', 'm7 10 5 5 5-5', 'M12 15V3'],
  upload: ['M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4', 'm17 8-5-5-5 5', 'M12 3v12'],
  bell: ['M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9Z', 'M13.73 21a2 2 0 0 1-3.46 0'],
  trendingUp: ['m22 7-8.5 8.5-5-5L2 17', 'M16 7h6v6'],
  trendingDown: ['m22 17-8.5-8.5-5 5L2 7', 'M16 17h6v-6'],
  lock: ['M3 11h18v11H3Z', 'M7 11V7a5 5 0 0 1 10 0v4'],
  zap: ['M13 2 3 14h9l-1 8 10-12h-9l1-8Z'],
  globe: [circ(12, 12, 10), 'M2 12h20', 'M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10Z'],
  settings: [
    circ(12, 12, 3),
    'M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.2 2.2M16.9 16.9l2.2 2.2M19.1 4.9l-2.2 2.2M7.1 16.9l-2.2 2.2',
  ],
  facebook: ['M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3Z'],
  linkedin: [
    'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4V8h4v1.5A6 6 0 0 1 16 8Z',
    'M2 9h4v12H2Z',
    circ(4, 4, 2),
  ],
  dollar: ['M12 2v20', 'M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6'],
  target: [circ(12, 12, 10), circ(12, 12, 6), circ(12, 12, 2)],
  pulse: ['M2 12h4l3-8 4 16 3-8h6'],
  layers: ['m12 2 10 6-10 6L2 8l10-6Z', 'm2 14 10 6 10-6'],
  shieldCheck: [
    'M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z',
    'm9 12 2 2 4-4',
  ],
  userCheck: [
    'm16 11 2 2 4-4',
    'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2',
    circ(9, 7, 4),
  ],
  arrowDown: ['M12 5v14', 'm19 12-7 7-7-7'],
  camera: ['M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2Z', circ(12, 13, 4)],
  message: ['M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z'],
  send: ['m22 2-7 20-4-9-9-4Z', 'M22 2 11 13'],
  trash: ['M3 6h18', 'M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2', 'M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6', 'M10 11v6', 'M14 11v6'],
};

const S = { fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' };

export default function Icon({ name, size = 20, className = '', 'aria-hidden': ariaHidden = true }) {
  const paths = P[name] || P.info;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      style={S}
      className={className}
      aria-hidden={ariaHidden}
    >
      {paths.map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}