import { ASSAYS } from '@/utils/assays';
import { statusMeta } from './status-utils.js';

export const SCHEDULE = [
  {
    screen_type: 'MTS',
    screen_name: 'MTS033',
    time_point: ASSAYS.MTS.time_point,
    window_start: '2026-07-13',
    window_end: '2026-07-24',
    data_delivery_date: 'November 2026',
  },
  {
    screen_type: 'MTS',
    screen_name: 'MTS034',
    time_point: ASSAYS.MTS.time_point,
    window_start: '2026-09-08',
    window_end: '2026-09-18',
    data_delivery_date: 'January 2027',
  },
  {
    screen_type: 'CPS',
    screen_name: 'CPS017',
    time_point: ASSAYS.CPS.time_point,
    window_start: '2026-09-08',
    window_end: '2026-09-18',
    data_delivery_date: 'January 2027',
  },
  {
    screen_type: 'APS',
    screen_name: 'APS009',
    time_point: ASSAYS.APS.time_point,
    window_start: '2026-09-08',
    window_end: '2026-09-18',
    data_delivery_date: 'January 2027',
  },
  {
    screen_type: 'AIR',
    screen_name: 'AIR003',
    time_point: ASSAYS.AIR.time_point,
    window_start: '2026-09-08',
    window_end: '2026-09-18',
    data_delivery_date: 'January 2027',
  },
  {
    screen_type: 'EPS',
    screen_name: 'EPS009 (PR1000)',
    time_point: ASSAYS.EPS.time_point,
    window_start: '2026-11-02',
    window_end: '2026-11-13',
    data_delivery_date: 'April 2027',
  },
];

function todayET() {
  return new Date().toLocaleDateString('en-CA', { timeZone: 'America/New_York' });
}

// screenRouteStateFor: optional (screenName, screenType) => { status, message } lookup, e.g.
// screenStatusStore.screenRouteStateFor. Checks both that this schedule entry IS the type's
// current screen (identity, from prism_screens) AND that the type's submission window is
// currently OPEN (accessibility, from prism_submission_window_message) — matching name alone
// isn't enough, since a screen can be the current one for its type while its window is
// closed/at capacity. When both hold, the API is treated as ground truth and the window-date
// estimate below is overridden to OPEN.
export function computedStatus(item, screenRouteStateFor) {
  const validation = screenRouteStateFor?.(item.screen_name, item.screen_type);
  if (validation?.status === 'valid') return 'OPEN';
  const today = todayET();
  if (today < item.window_start) return 'SCHEDULED';
  if (today <= item.window_end) return 'OPEN'; // NEVER DEFINE OPEN, API NEEDS TO BE USED
  return 'IN-PROGRESS';
}

export function formatWindow(item) {
  const start = new Date(item.window_start + 'T00:00:00Z');
  const end = new Date(item.window_end + 'T00:00:00Z');
  const startStr = start.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
  const endStr =
    start.getMonth() === end.getMonth()
      ? end.toLocaleDateString('en-US', { day: 'numeric', timeZone: 'UTC' })
      : end.toLocaleDateString('en-US', { month: 'long', day: 'numeric', timeZone: 'UTC' });
  return `${startStr} – ${endStr}`;
}

// Decorates a raw SCHEDULE entry with derived display fields.
export function enrichEntry(item, screenRouteStateFor) {
  const status = computedStatus(item, screenRouteStateFor);
  return {
    ...item,
    status,
    statusMeta: statusMeta(status),
    windowDates: formatWindow(item),
  };
}

// Convenience: enrich all SCHEDULE entries (useful for table displays).
export function enrichedSchedule(screenRouteStateFor) {
  return SCHEDULE.map((item) => enrichEntry(item, screenRouteStateFor));
}

export const FIELD_LABELS = {
  screen_name: 'Screen Name',
  screen_type: 'Screen Type',
  time_point: 'Timepoint',
  windowDates: 'Submission Window',
  status: 'Screen Status',
  data_delivery_date: 'Estimated Data Delivery',
};

// Fields rendered in the hub schedule table (status needs a custom chip slot).
export const TABLE_FIELD_KEYS = [
  'screen_name',
  'time_point',
  'windowDates',
  'status',
  'data_delivery_date',
];
