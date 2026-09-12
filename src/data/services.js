/* ============================================================
   DEMO DATA — services.
   A•EYE service catalog: CCTV • Security Systems • Networking
   (Installation • Repair • Maintenance — Home & Business).
   Replace with CMS content when a backend is integrated.
   ============================================================ */

const services = [
  {
    id: 'cctv',
    icon: 'cctv',
    title: 'CCTV Systems',
    desc: 'Camera supply and setup with clean wiring, recorder configuration and remote viewing — for homes and businesses.',
    features: ['Installation', 'Repair', 'Maintenance', 'Home & Business'],
    cta: 'Request CCTV',
  },
  {
    id: 'security-systems',
    icon: 'shield',
    title: 'Security Systems',
    desc: 'Alarms, access control and smart security devices — properly installed, quickly repaired and kept dependable.',
    features: ['Installation', 'Repair', 'Maintenance', 'Home & Business'],
    cta: 'Request security system',
  },
  {
    id: 'networking',
    icon: 'globe',
    title: 'Networking',
    desc: 'Structured cabling, Wi-Fi and network setup — tidy installation, fast troubleshooting and reliable upkeep.',
    features: ['Installation', 'Repair', 'Maintenance', 'Home & Business'],
    cta: 'Request networking',
  },
];

export default services;

export const getService = (id) => services.find((s) => s.id === id);
