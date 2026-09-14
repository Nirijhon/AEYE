/* ============================================================
   PRODUCT & SERVICE CATALOG - A-Eye System Technologies Inc.
   CCTV - Networking - Access & Security - Support & Maintenance
   ============================================================ */

const services = [
  {
    id: 'cctv-video-surveillance',
    icon: 'cctv',
    title: 'CCTV & Video Surveillance',
    desc: 'Reliable video security for homes and businesses - bullet, dome and PTZ cameras with day/night vision, backed by continuous recording and storage you can trust.',
    features: ['Bullet, Dome & PTZ cameras', 'Day/night vision', 'Network Video Recorders (NVR)', 'Digital Video Recorders (DVR)', '24/7 Surveillance Hard Disk Drives (HDD)'],
    cta: 'Request CCTV installation'
  },
  {
    id: 'networking-infrastructure',
    icon: 'globe',
    title: 'Networking Infrastructure',
    desc: 'Structured, standards-compliant network infrastructure that keeps your operations connected - from cabling and switching to enterprise-grade wireless.',
    features: ['Power over Ethernet (PoE) switches', 'Network switches', 'Structured cabling', 'Fiber optic installation', 'Enterprise Wi-Fi solutions'],
    cta: 'Request networking service'
  },
  {
    id: 'access-security-systems',
    icon: 'lock',
    title: 'Access & Security Systems',
    desc: 'Control who goes where, and know who came in - electronic access control, biometric time attendance and video intercom systems for any facility.',
    features: ['Access control (Card, PIN, Fingerprint)', 'Biometric time attendance units', 'Video intercom systems', 'Door & gate integration', 'User management & audit logs'],
    cta: 'Request access control'
  },
  {
    id: 'support-maintenance',
    icon: 'settings',
    title: 'Support & Maintenance',
    desc: 'We keep your systems running long after turnover - preventive maintenance, IT support and dependable power protection for continuous operation.',
    features: ['Uninterruptible Power Supplies (UPS)', 'Preventive maintenance services', 'IT support services', 'System integration', 'Installation services'],
    cta: 'Request support & maintenance'
  }
];

export default services;

export const getService = (id) => services.find((s) => s.id === id);
