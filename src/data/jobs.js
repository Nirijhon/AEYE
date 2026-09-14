/* ============================================================
   DEMO DATA - job openings aligned to A.eye service offerings.
   
   Services:
   1. CCTV Installation Technician
   2. IT / Network Technician
   3. Sales Executive
   4. Admin & Accounting Assistant
   5. CCTV Operator
   ============================================================ */

const JOB_CATEGORIES = [
  'CCTV Installation',
  'IT & Networking',
  'Sales & Business',
  'Admin & Accounting',
  'Security Operations',
];

const JOB_LOCATIONS = [
  'Metro Manila',
  'Cebu',
  'Davao',
  'Quezon City',
  'Makati',
];

const JOB_TYPES = [
  'Full-time',
  'Part-time',
  'Contractual',
  'On-call',
];

const jobs = [
  // CCTV Installation Technician
  {
    id: 1,
    title: 'CCTV Installation Technician',
    category: 'CCTV Installation',
    location: 'Metro Manila',
    type: 'Full-time',
    shift: 'Shifting',
    salary: '18000 - 25000 P/month',
    urgent: true,
    tags: ['Installation', 'CCTV', 'Wiring'],
    postedDaysAgo: 0,
    slots: 3,
    experience: '1-3 years',
    education: 'HS Graduate or TESDA certified',
    requirements: [
      'TESDA NCC II in CCTV Installation preferred',
      'Knowledge of cable management',
      'Experience with NVR DVR setup',
      'Valid driver license',
    ],
    description: 'Install configure and test CCTV systems for residential and commercial clients.'
  },
  // Senior CCTV Technician
  {
    id: 2,
    title: 'Senior CCTV Technician',
    category: 'CCTV Installation',
    location: 'Quezon City',
    type: 'Full-time',
    shift: 'Day',
    salary: '30000 - 40000 P/month',
    urgent: false,
    tags: ['Senior', 'Installation', 'Team Lead'],
    postedDaysAgo: 2,
    slots: 2,
    experience: '3-5 years',
    education: 'TESDA certified or equivalent',
    requirements: [
      '5+ years CCTV installation experience',
      'Team leadership skills',
      'Advanced IP camera knowledge',
    ],
    description: 'Lead installation teams for complex security systems.'
  },
  // IT Network Technician
  {
    id: 3,
    title: 'IT Network Technician',
    category: 'IT and Networking',
    location: 'Makati',
    type: 'Full-time',
    shift: 'Day',
    salary: '20000 - 28000 P/month',
    urgent: true,
    tags: ['Networking', 'IT Support', 'Cabling'],
    postedDaysAgo: 1,
    slots: 4,
    experience: '1-3 years',
    education: 'College graduate or TESDA NC II',
    requirements: [
      'Knowledge of structured cabling',
      'Basic networking TCP/IP WiFi',
      'Customer service orientation',
    ],
    description: 'Install and maintain IT infrastructure including structured cabling and WiFi.'
  },
  // Network Systems Specialist
  {
    id: 4,
    title: 'Network Systems Specialist',
    category: 'IT and Networking',
    location: 'Cebu',
    type: 'Full-time',
    shift: 'Day',
    salary: '25000 - 35000 P/month',
    urgent: false,
    tags: ['Network', 'Systems', 'Security'],
    postedDaysAgo: 5,
    slots: 1,
    experience: '2-4 years',
    education: 'College graduate IT CompSci',
    requirements: [
      'CCNA or equivalent certification preferred',
      'Enterprise networking experience',
      'Network security knowledge',
    ],
    description: 'Design and implement network solutions for business clients.'
  },
  // Sales Executive
  {
    id: 5,
    title: 'Sales Executive - Security Systems',
    category: 'Sales and Business',
    location: 'Metro Manila',
    type: 'Full-time',
    shift: 'Day',
    salary: '15000 base plus commission',
    urgent: true,
    tags: ['Sales', 'Commercial', 'B2B'],
    postedDaysAgo: 0,
    slots: 2,
    experience: '1-2 years',
    education: 'College graduate preferred',
    requirements: [
      'Sales experience in security or tech',
      'Strong negotiation skills',
      'Corporate client experience',
    ],
    description: 'Drive sales of security systems and services to commercial clients.'
  },
  // Field Sales Representative
  {
    id: 6,
    title: 'Field Sales Representative',
    category: 'Sales and Business',
    location: 'Davao',
    type: 'Full-time',
    shift: 'Field-based',
    salary: '12000 base plus commission',
    urgent: false,
    tags: ['Sales', 'Field', 'Regional'],
    postedDaysAgo: 7,
    slots: 1,
    experience: '1+ years',
    education: 'HS Graduate or College',
    requirements: [
      'Willingness to travel within region',
      'Sales or customer service experience',
      'Good communication skills',
    ],
    description: 'Expand sales coverage in Davao region.'
  },
  // Admin and Accounting Assistant
  {
    id: 7,
    title: 'Admin and Accounting Assistant',
    category: 'Admin and Accounting',
    location: 'Metro Manila',
    type: 'Full-time',
    shift: 'Day',
    salary: '15000 - 20000 P/month',
    urgent: false,
    tags: ['Admin', 'Accounting', 'Office'],
    postedDaysAgo: 3,
    slots: 2,
    experience: '1-2 years',
    education: 'College graduate Accounting Admin',
    requirements: [
      'Basic accounting knowledge',
      'Proficiency in MS Office Excel Word',
      'Attention to detail',
    ],
    description: 'Support daily operations with administrative and basic accounting tasks.'
  },
  // Office Coordinator
  {
    id: 8,
    title: 'Office Coordinator',
    category: 'Admin and Accounting',
    location: 'Makati',
    type: 'Full-time',
    shift: 'Day',
    salary: '14000 - 18000 P/month',
    urgent: true,
    tags: ['Admin', 'Coordination', 'Operations'],
    postedDaysAgo: 1,
    slots: 1,
    experience: '1+ years',
    education: 'College graduate',
    requirements: [
      'Administrative experience',
      'Multi-tasking ability',
      'Customer service mindset',
    ],
    description: 'Coordinate office operations and manage schedules.'
  },
  // CCTV Operator
  {
    id: 9,
    title: 'CCTV Operator - Monitoring Center',
    category: 'Security Operations',
    location: 'Metro Manila',
    type: 'Full-time',
    shift: 'Night',
    salary: '16000 - 22000 P/month',
    urgent: true,
    tags: ['Monitoring', 'Surveillance', 'Night Shift'],
    postedDaysAgo: 0,
    slots: 5,
    experience: 'Fresh graduate welcome',
    education: 'HS Graduate',
    requirements: [
      'Alert and attentive during long shifts',
      'Basic computer literacy',
      'Incident documentation skills',
      'Willing to work night shifts',
    ],
    description: 'Monitor CCTV feeds from the central control room and detect suspicious activities.'
  },
  // Senior CCTV Monitor
  {
    id: 10,
    title: 'Senior CCTV Monitor',
    category: 'Security Operations',
    location: 'Metro Manila',
    type: 'Full-time',
    shift: 'Night',
    salary: '22000 - 28000 P/month',
    urgent: false,
    tags: ['Senior', 'Monitoring', 'Lead'],
    postedDaysAgo: 10,
    slots: 2,
    experience: '2+ years monitoring experience',
    education: 'HS Graduate or College',
    requirements: [
      'Previous CCTV monitoring experience',
      'Ability to train new operators',
      'Incident reporting knowledge',
    ],
    description: 'Supervise monitoring center operations during night shifts.'
  }
];

export { JOB_CATEGORIES, JOB_LOCATIONS, JOB_TYPES, jobs };

export function filterJobs(filters) {
  return jobs.filter((job) => {
    if (filters.q) {
      const q = filters.q.toLowerCase();
      const searchable = [
        job.title,
        job.category,
        job.location,
        job.type,
        job.shift,
        ...(job.tags || []),
      ].join(' ').toLowerCase();
      if (!searchable.includes(q)) return false;
    }
    if (filters.categories?.length && !filters.categories.includes(job.category)) return false;
    if (filters.locations?.length && !filters.locations.includes(job.location)) return false;
    if (filters.types?.length && !filters.types.includes(job.type)) return false;
    return true;
  });
}

export function getJob(id) {
  if (typeof id !== 'number' && typeof id !== 'string') return null;
  const numId = typeof id === 'string' ? Number(id) : id;
  return jobs.find((j) => j.id === numId) || null;
}
