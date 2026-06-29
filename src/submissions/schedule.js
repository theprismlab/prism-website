import { ASSAYS } from '@/utils/assays';
import { statusMeta } from './status-utils.js';

export const SCHEDULE = [
  {
    screen_type: 'EPS',
    screen_name: 'EPS008',
    time_point: ASSAYS.EPS.time_point,
    window_start: '2026-06-15',
    window_end: '2026-06-26',
    data_delivery_date: 'November 2026',
  },
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
    window_start: '2026-09-07',
    window_end: '2026-09-18',
    data_delivery_date: 'January 2027',
  },
  {
    screen_type: 'CPS',
    screen_name: 'CPS017',
    time_point: ASSAYS.CPS.time_point,
    window_start: '2026-09-07',
    window_end: '2026-09-18',
    data_delivery_date: 'January 2027',
  },
  {
    screen_type: 'APS',
    screen_name: 'APS009',
    time_point: ASSAYS.APS.time_point,
    window_start: '2026-09-07',
    window_end: '2026-09-18',
    data_delivery_date: 'January 2027',
  },
  {
    screen_type: 'AIR',
    screen_name: 'AIR003',
    time_point: ASSAYS.AIR.time_point,
    window_start: '2026-09-07',
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

export function computedStatus(item) {
  const today = todayET();
  if (today < item.window_start) return 'SCHEDULED';
  if (today <= item.window_end) return 'OPEN';
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
export function enrichEntry(item) {
  const status = computedStatus(item);
  return {
    ...item,
    status,
    statusMeta: statusMeta(status),
    windowDates: formatWindow(item),
  };
}

// Returns a fully display-ready object for a given screen type (soonest open/scheduled entry),
// or null if no qualifying entry exists.
export function resolveScreenDisplay(screenType) {
  const entry =
    SCHEDULE.filter((item) => {
      if (item.screen_type !== screenType) return false;
      const status = computedStatus(item);
      return status === 'OPEN' || status === 'SCHEDULED';
    }).sort((a, b) => a.window_start.localeCompare(b.window_start))[0] ?? null;

  if (!entry) return null;

  const assay = ASSAYS[screenType] ?? {};
  return {
    ...enrichEntry(entry),
    screenFullName: assay.screen_full ?? null,
    testAgents: assay.test_agents ?? null,
  };
}

// Convenience: enrich all SCHEDULE entries (useful for table displays).
export function enrichedSchedule() {
  return SCHEDULE.map(enrichEntry);
}

export const FIELD_LABELS = {
  screen_name: 'Screen Name',
  screen_type: 'Screen Type',
  time_point: 'Timepoint',
  testAgents: 'Test Agents',
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

// Fields rendered in the form page meta bar.
export const FORM_FIELD_KEYS = [
  'time_point',
  'testAgents',
  'windowDates',
  'status',
  'data_delivery_date',
];
