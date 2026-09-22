/* ============================================================
   DEMO DATA — admin operations console.
   Sample records for the /admin UI prototype. Not connected
   to any live database. Client-submitted records arrive via
   services/adminService.js (localStorage demo store).
   ============================================================ */

export const adminStats = [
  { key: 'newRequests', label: 'New Requests', value: '8', icon: 'clipboard', variant: 'amber', trend: { dir: 'up', text: '3 today' } },
  { key: 'applications', label: 'Open Applications', value: '23', icon: 'userCheck', variant: 'blue', trend: { dir: 'up', text: '5 this week' } },
  { key: 'deployed', label: 'Staff Deployed', value: '96', icon: 'shield', variant: 'green', note: 'across 37 sites' },
  { key: 'jobPosts', label: 'Job Posts — Draft', value: '7', icon: 'briefcase', variant: 'navy', trend: { dir: 'flat', text: 'careers launch pending' } },
];

export const adminNotifications = [
  { type: 'danger', text: 'RQ-1042 needs officers before the Sep 22 start at North Harbor Logistics.', time: '8 min ago' },
  { type: 'success', text: 'APP-4821 (Senior CCTV Technician) cleared the background check.', time: '35 min ago' },
  { type: 'amber', text: 'Deployment gap: Vista Corporate Tower night post has 1 slot unfilled.', time: '2 hrs ago' },
  { type: 'info', text: '7 job posts are sitting in Draft — publish them when Careers launches.', time: '4 hrs ago' },
  { type: 'success', text: 'August monthly reports for 12 client accounts are ready to send.', time: '1 day ago' },
  { type: 'info', text: 'License renewal due this month: 3 officers (see Deployments).', time: '1 day ago' },
];

/** Applications received per day (for the overview chart). */
export const applicationVolume = [
  { label: 'Mon', value: 4 },
  { label: 'Tue', value: 7 },
  { label: 'Wed', value: 3 },
  { label: 'Thu', value: 9 },
  { label: 'Fri', value: 11 },
  { label: 'Sat', value: 5 },
  { label: 'Sun', value: 2 },
];

/** Staff deployed per day (for the overview chart). */
export const deploymentVolume = [
  { label: 'Mon', value: 88 },
  { label: 'Tue', value: 91 },
  { label: 'Wed', value: 84 },
  { label: 'Thu', value: 96 },
  { label: 'Fri', value: 102 },
  { label: 'Sat', value: 97 },
  { label: 'Sun', value: 79 },
];

/* Canned applications shown alongside anything submitted in this browser. */
export const cannedApplications = [
  {
    id: 'APP-4821',
    name: 'Ramon Dela Peña',
    jobTitle: 'Senior CCTV Technician',
    stage: 'Background check',
    email: 'ramon.delapena@example.com',
    phone: '0917 555 0142',
    city: 'Quezon City',
    experience: '6 yrs',
    daysAgo: 9,
    resumeFileName: 'ramon-delapena-resume.pdf',
    note: 'TESDA NCC II holder. Led a 4-man installation crew at his previous agency.',
  },
  {
    id: 'APP-4796',
    name: 'Angeline Cruz',
    jobTitle: 'Admin & Accounting Assistant',
    stage: 'Interview',
    email: 'a.cruz@example.com',
    phone: '0918 555 0931',
    city: 'Makati',
    experience: '3 yrs',
    daysAgo: 5,
    resumeFileName: 'angeline-cruz-cv.docx',
    note: 'QuickBooks experience. Available to start immediately.',
  },
  {
    id: 'APP-4788',
    name: 'Joshua Mendoza',
    jobTitle: 'CCTV Installation Technician',
    stage: 'Under Review',
    email: 'j.mendoza@example.com',
    phone: '0995 555 0177',
    city: 'Caloocan',
    experience: '1 yr',
    daysAgo: 4,
    resumeFileName: 'joshua-mendoza-resume.pdf',
    note: 'Fresh TESDA graduate — recommended for the training track.',
  },
  {
    id: 'APP-4751',
    name: 'Karla Bautista',
    jobTitle: 'Sales Executive',
    stage: 'Hired',
    email: 'k.bautista@example.com',
    phone: '0920 555 0824',
    city: 'Pasig',
    experience: '4 yrs',
    daysAgo: 12,
    resumeFileName: 'karla-bautista-cv.pdf',
    note: 'Exceeded quota 3 quarters straight at previous B2B role. Onboarding Sep 20.',
  },
  {
    id: 'APP-4743',
    name: 'Dennis Ocampo',
    jobTitle: 'IT Network Technician',
    stage: 'Not Selected',
    email: 'd.ocampo@example.com',
    phone: '0917 555 0655',
    city: 'Manila',
    experience: '2 yrs',
    daysAgo: 15,
    resumeFileName: 'dennis-ocampo-resume.pdf',
    note: 'Strong cabling background but role filled. Kept in the talent pool.',
  },
  {
    id: 'APP-4730',
    name: 'Miguel Santos',
    jobTitle: 'CCTV Operator - Monitoring Center',
    stage: 'Submitted',
    email: 'm.santos@example.com',
    phone: '0939 555 0210',
    city: 'Taguig',
    experience: '2 yrs',
    daysAgo: 1,
    resumeFileName: 'miguel-santos-resume.pdf',
    note: 'Night-shift operator experience at a BPO monitoring floor.',
  },
];

/** Application pipeline stages, in order (mirrors the tracker milestones). */
export const APPLICATION_STAGES = ['Submitted', 'Under Review', 'Interview', 'Background check', 'Hired', 'Not Selected'];

/* Deployment board — who is where, right now (demo). */
export const deployments = [
  { id: 'D-01', officer: 'M. dela Cruz', role: 'Security Guard', site: 'North Harbor Logistics', city: 'Taguig', shift: 'Day (6a–6p)', until: 'Dec 22', status: 'On Site' },
  { id: 'D-02', officer: 'R. Santos team', role: 'Event Marshals ×40', site: 'Arena Expo Weekend', city: 'Pasay', shift: 'Event hours', until: 'Oct 5', status: 'Scheduled' },
  { id: 'D-03', officer: 'J. Ramirez', role: 'Armed Response', site: 'Cebu Overnight Depot', city: 'Cebu', shift: 'Night (6p–6a)', until: 'Ongoing', status: 'On Site' },
  { id: 'D-04', officer: 'K. Ong', role: 'Access Control', site: 'Riviera Condominium', city: 'BGC Taguig', shift: 'Day (6a–6p)', until: 'Nov 30', status: 'On Site' },
  { id: 'D-05', officer: 'P. Navarro', role: 'CCTV Operator', site: 'Vista Corporate Tower', city: 'Makati', shift: 'Night (10p–6a)', until: 'Ongoing', status: 'Gap — 1 slot' },
  { id: 'D-06', officer: 'L. Mercado', role: 'Fire Watch', site: 'Pasig Construction', city: 'Pasig', shift: 'Day (6a–6p)', until: 'Completed', status: 'Off Duty' },
  { id: 'D-07', officer: 'A. Villanueva', role: 'Security Guard', site: 'Greenfield Warehouse', city: 'Laguna', shift: 'Shifting', until: 'Nov 8', status: 'On Site' },
  { id: 'D-08', officer: 'T. Reyes', role: 'CCTV Technician', site: 'Harbor Mall Annex', city: 'Manila', shift: 'Service call', until: 'Sep 17', status: 'Scheduled' },
];

/**
 * Seed status for each job post from src/data/jobs.js.
 * Careers is "coming soon" on the public site, so posts sit in
 * Draft/Closed until an admin publishes them here.
 */
export const JOB_STATUS_SEED = {
  1: 'Draft',
  2: 'Draft',
  3: 'Draft',
  4: 'Draft',
  5: 'Draft',
  6: 'Draft',
  7: 'Draft',
  8: 'Closed',
  9: 'Draft',
  10: 'Closed',
};

/** Applicants-per-job counts for the Jobs manager (demo). */
export const APPLICANT_COUNTS = {
  1: 6,
  2: 4,
  3: 9,
  4: 3,
  5: 1,
  6: 0,
  7: 0,
  8: 12,
  9: 5,
  10: 7,
};

/** Employee roster for the admin Employees list + assignment picker. */
export const personnel = [
  { id: 'EMP-001', name: 'M. dela Cruz', role: 'Security Guard', status: 'On Duty', city: 'Taguig', phone: '0917 555 0101', license: 'SO License #88214', licenseExpiry: 'Mar 2027', site: 'North Harbor Logistics' },
  { id: 'EMP-002', name: 'A. Villanueva', role: 'Security Guard', status: 'On Duty', city: 'Laguna', phone: '0917 555 0102', license: 'SO License #88301', licenseExpiry: 'Sep 2026', site: 'Greenfield Warehouse' },
  { id: 'EMP-003', name: 'F. Espino', role: 'Security Guard', status: 'Available', city: 'Quezon City', phone: '0917 555 0103', license: 'SO License #88455', licenseExpiry: 'Jan 2027', site: '—' },
  { id: 'EMP-004', name: 'G. Tolentino', role: 'Security Guard', status: 'Available', city: 'Caloocan', phone: '0917 555 0104', license: 'SO License #88512', licenseExpiry: 'Nov 2026', site: '—' },
  { id: 'EMP-005', name: 'P. Navarro', role: 'CCTV Operator', status: 'On Duty', city: 'Makati', phone: '0918 555 0105', license: 'TESDA NCC II', licenseExpiry: '—', site: 'Vista Corporate Tower' },
  { id: 'EMP-006', name: 'H. Lim', role: 'CCTV Operator', status: 'Available', city: 'Pasig', phone: '0918 555 0106', license: 'TESDA NCC II', licenseExpiry: '—', site: '—' },
  { id: 'EMP-007', name: 'T. Reyes', role: 'CCTV Technician', status: 'Available', city: 'Manila', phone: '0918 555 0107', license: 'TESDA NCC II', licenseExpiry: 'Aug 2026', site: 'Harbor Mall Annex (service call)' },
  { id: 'EMP-008', name: 'B. Uy', role: 'Network Technician', status: 'On Leave', city: 'Makati', phone: '0918 555 0108', license: 'CCNA', licenseExpiry: 'Feb 2027', site: '—' },
  { id: 'EMP-009', name: 'C. Fernandez', role: 'Armed Response', status: 'On Duty', city: 'Cebu', phone: '0919 555 0109', license: 'LTV License #4417', licenseExpiry: 'Dec 2026', site: 'Cebu Overnight Depot' },
  { id: 'EMP-010', name: 'N. Aquino', role: 'Event Marshal Lead', status: 'Available', city: 'Pasay', phone: '0919 555 0110', license: 'SO License #88633', licenseExpiry: 'Oct 2026', site: '—' },
  { id: 'EMP-011', name: 'K. Ong', role: 'Access Control Officer', status: 'On Duty', city: 'BGC Taguig', phone: '0919 555 0111', license: 'SO License #88720', licenseExpiry: 'Jun 2027', site: 'Riviera Condominium' },
  { id: 'EMP-012', name: 'L. Mercado', role: 'Fire Watch', status: 'Off Duty', city: 'Pasig', phone: '0919 555 0112', license: 'Fire Safety Cert.', licenseExpiry: 'Sep 2026', site: '—' },
];

