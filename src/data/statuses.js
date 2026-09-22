/* ============================================================
   CANONICAL STATUS ENUMS — single source of truth.
   -----------------------------------------------------------------
   Every screen (public tracker, client dashboard, admin console)
   and every service reads these. When the real database arrives,
   these exact strings become the DB enum values — keep them
   stable once wired up.
   ============================================================ */

/** Client request pipeline, in order. */
export const REQUEST_STATUSES = ['New', 'Under Review', 'Quoted', 'Assigned', 'On Site', 'Completed'];

/** Application pipeline, in order. 'Not Selected' is the reject branch. */
export const APPLICATION_STAGES = ['Submitted', 'Under Review', 'Interview', 'Background check', 'Hired', 'Not Selected'];

/** Stages a candidate can be advanced to (forward-only, no stage-jumping). */
export function nextStage(list, current) {
  const i = list.indexOf(current);
  if (i === -1 || i === list.length - 1) return [];
  return list.slice(i + 1);
}

/** Next pipeline status for a client request. */
export const nextRequestStatus = (current) => nextStage(REQUEST_STATUSES, current);

/** Next application stage (excludes the reject branch — rejecting is a separate action). */
export const nextApplicationStage = (current) =>
  nextStage(APPLICATION_STAGES, current).filter((s) => s !== 'Not Selected');

/** Status → badge color variant, shared by all tables. */
export const STATUS_TO_BADGE = {
  Active: 'success',
  'On Site': 'success',
  Received: 'info',
  New: 'info',
  'Under Review': 'amber',
  Quoted: 'amber',
  Assigned: 'brand',
  Complete: 'success',
  Completed: 'success',
  Open: 'success',
  Filled: 'neutral',
  Pending: 'amber',
  Hired: 'success',
  'Not Selected': 'danger',
  Closed: 'neutral',
  'Follow-up': 'danger',
  Submitted: 'info',
  Interview: 'info',
  'Background check': 'brand',
  Offered: 'brand',
  Rejected: 'danger',
  Draft: 'neutral',
  Published: 'success',
  Deployed: 'success',
  Scheduled: 'info',
  Standby: 'amber',
  'Off Duty': 'neutral',
  Available: 'success',
  'On Duty': 'brand',
  'On Leave': 'amber',
};
