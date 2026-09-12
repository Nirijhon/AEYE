/* ============================================================
   DEMO DATA — client dashboard.
   Sample records displayed in the demo portal. Not connected
   to any live database.
   ============================================================ */

export const stats = [
  { key: 'placements', label: 'Active Placements', value: '142', icon: 'users', variant: 'navy', trend: { dir: 'up', text: '3 this week' } },
  { key: 'requests', label: 'Open Requests', value: '8', icon: 'clipboard', variant: 'amber', trend: { dir: 'up', text: '2 awaiting response' } },
  { key: 'onsite', label: 'Guards On Site Today', value: '96', icon: 'shield', variant: 'green', note: 'across 37 sites' },
  { key: 'bill', label: 'Est. Monthly Bill', value: '₱1.28M', icon: 'wallet', variant: 'blue', trend: { dir: 'down', text: '4% vs last month' } },
];

export const requests = [
  { id: 'RQ-1042', service: 'Licensed Guards', site: 'North Harbor Logistics', city: 'Taguig', guards: 6, start: 'Sep 22', status: 'Assigned', officer: 'M. dela Cruz', daysAgo: 2 },
  { id: 'RQ-1039', service: 'CCTV Monitoring', site: 'Vista Corporate Tower', city: 'Makati', guards: 2, start: 'Sep 28', status: 'Under Review', officer: '—', daysAgo: 1 },
  { id: 'RQ-1035', service: 'Event Marshals', site: 'Arena Expo Weekend', city: 'Pasay', guards: 40, start: 'Oct 3', status: 'On Site', officer: 'R. Santos team', daysAgo: 4 },
  { id: 'RQ-1031', service: 'Armed Response', site: 'Cebu Overnight Depot', city: 'Cebu', guards: 3, start: 'Sep 19', status: 'Completed', officer: 'J. Ramirez', daysAgo: 9 },
  { id: 'RQ-1028', service: 'Access Control', site: 'Riviera Condominium', city: 'BGC Taguig', guards: 4, start: 'Sep 15', status: 'Follow-up', officer: 'K. Ong', daysAgo: 12 },
  { id: 'RQ-1022', service: 'Fire Watch', site: 'Pasig Construction', city: 'Pasig', guards: 5, start: 'Sep 6', status: 'Completed', officer: 'L. Mercado', daysAgo: 20 },
];

export const notifications = [
  { type: 'success', text: 'RQ-1035 “Arena Expo Weekend” achieved full staffing for Oct 3.', time: '12 min ago' },
  { type: 'info', text: 'Your monthly security report for August is ready to download.', time: '1 hr ago' },
  { type: 'danger', text: 'Alert: rear gate camera offline at North Harbor Logistics for 25 min.', time: '2 hrs ago' },
  { type: 'amber', text: 'RQ-1028 requires a staffing follow-up — response not yet confirmed.', time: '5 hrs ago' },
  { type: 'success', text: 'New officer assigned to Vista Corporate Tower night post.', time: '1 day ago' },
  { type: 'info', text: 'Reminder: quarterly billing review meeting on Sep 18.', time: '1 day ago' },
];

export const chart = [
  { label: 'Mon', value: 62 },
  { label: 'Tue', value: 74 },
  { label: 'Wed', value: 58 },
  { label: 'Thu', value: 88 },
  { label: 'Fri', value: 96 },
  { label: 'Sat', value: 70 },
  { label: 'Sun', value: 51 },
];

export const documentFeed = [
  { id: 'DS-01', name: 'Incident Reports — Aug 2026', type: 'PDF', size: '2.4 MB', date: 'Sep 02' },
  { id: 'DS-02', name: 'Payroll Summary — Site 12', type: 'XLSX', size: '860 KB', date: 'Sep 01' },
  { id: 'DS-03', name: 'Patrol Logs — Week 35', type: 'PDF', size: '1.1 MB', date: 'Aug 31' },
];