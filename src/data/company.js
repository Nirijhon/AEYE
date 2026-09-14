/* ============================================================
   COMPANY DATA - A-Eye System Technology
   Central source for company details, mission/vision, project
   execution, payment terms, warranty and target sectors.
   ============================================================ */

export const COMPANY = {
  name: 'A-Eye System Technology',
  shortName: 'A-Eye',
  brand: 'A•EYE',
  brandSub: 'System Technology',
  tagline: 'Smart Security. Reliable Technology.',
  description:
    'A-Eye System Technology is a Philippine-based IT and security solutions provider specializing in CCTV systems, electronic security, networking, and structured IT infrastructure.',
  address: '9th Floor, Sinocan Corporate Center, ASEANA Business Park, Bay City, Brgy. Tambo, Parañaque City 1701, Metro Manila, Philippines',
  phones: ['+63 995 323 0893'],
  emails: ['aeye.systemtech@gmail.com', 'vinceljarantadd29@gmail.com'],
  authorizedContact: {
    name: 'Vincel Jaranta',
    role: 'HR and Accounting Officer',
  },
  /* Click-to-contact links (used by footer + floating contact buttons) */
  telHref: 'tel:+639953230893',
  viberHref: 'viber://chat?number=%2B639953230893',
  /* TODO: replace with the official Facebook page username once claimed */
  messengerHref: 'https://m.me/aeye.systemtech',
  /* Google Maps embed — Sinocan Corporate Center, ASEANA, Parañaque City */
  mapEmbed:
    'https://www.google.com/maps?q=Sinocan%20Corporate%20Center%2C%20ASEANA%20Business%20Park%2C%20Para%C3%B1aque%20City%2C%20Metro%20Manila&output=embed',
};

export const MISSION =
  'Provide reliable, innovative, and cost-effective security and IT solutions through quality products, professional installation, and excellent customer service.';

export const VISION =
  "Become one of the Philippines' trusted providers of integrated security and IT solutions recognized for quality, innovation, and customer satisfaction.";

export const PILLARS = [
  { icon: 'zap', title: 'Innovative Solutions', desc: 'Modern, forward-thinking security and IT approaches for every project.' },
  { icon: 'badgeCheck', title: 'Quality Products', desc: 'Industry-proven equipment from trusted manufacturers.' },
  { icon: 'shieldCheck', title: 'Professional Service', desc: 'Skilled engineers and technicians, standard-compliant installations.' },
  { icon: 'heart', title: 'Customer Satisfaction', desc: 'Responsive support before, during and after every project.' },
];

export const VALUE_PROPOSITION = [
  'Technical expertise',
  'Industry-proven products',
  'Customized project designs',
  'Standard-compliant installations',
  'Continuous after-sales support',
];

export const TIMELINE = [
  { phase: 'Site Inspection & Survey', duration: '1 Day' },
  { phase: 'Proposal Approval & Mobilization', duration: '1 Day' },
  { phase: 'Delivery of Equipment & Materials', duration: '1–2 Days' },
  { phase: 'Installation of CCTV System', duration: '2–5 Days' },
  { phase: 'System Configuration & Programming', duration: '1 Day' },
  { phase: 'Testing & Commissioning', duration: '1 Day' },
  { phase: 'Client Orientation & Project Turnover', duration: 'Same Day' },
  { phase: 'Total Project Duration', duration: '5–10 Working Days', total: true },
];

export const PAYMENT_TERMS = {
  pricing: 'Project cost as indicated per attached quotation; prices valid for 30 calendar days.',
  schedule: [
    { term: 'Down Payment', pct: '50%', desc: 'Upon proposal acceptance prior to mobilization.' },
    { term: 'Progress Payment', pct: '40%', desc: 'Upon completion of equipment installation and configuration.' },
    { term: 'Final Payment', pct: '10%', desc: 'Upon project completion, testing, commissioning, and final sign-off.' },
  ],
  terms: 'Out-of-scope requests require separate quotations. Equipment remains company property until full payment is settled.',
};

export const WARRANTY = {
  workmanship: '1 Year on installation.',
  equipment: "Standard manufacturer's warranty.",
  coverage:
    'Includes business-hours phone/email/remote assistance, warranty-covered on-site support, troubleshooting, and system adjustments. Excludes misuse, power surges, vandalism, natural disasters, or unauthorized alterations.',
  obligations:
    'Provide site access, ensure electrical power availability, assign an authorized representative, approve layouts, and make timely payments.',
};

export const SECTORS = [
  { icon: 'building', label: 'Commercial Buildings' },
  { icon: 'building', label: 'Condominiums' },
  { icon: 'briefcase', label: 'Corporate Offices' },
  { icon: 'layers', label: 'Warehouses' },
  { icon: 'users', label: 'Schools & Institutions' },
  { icon: 'wallet', label: 'Retail Stores' },
  { icon: 'star', label: 'Hotels & Hospitality' },
  { icon: 'shield', label: 'Residential Properties' },
];

export default COMPANY;
