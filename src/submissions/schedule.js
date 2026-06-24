import { ASSAYS } from '@/utils/assays';

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

// Returns 'YYYY-MM-DD' in US Eastern Time for lexicographic date comparison.
export function todayET() {
  return new Date().toLocaleDateString('en-CA', { timeZone: 'America/New_York' });
}

export function computedStatus(item) {
  const today = todayET();
  if (today < item.window_start) return 'SCHEDULED';
  if (today <= item.window_end) return 'OPEN';
  return 'IN-PROGRESS';
}

// Returns the OPEN or SCHEDULED entry for a screen type with the soonest window_start,
// or null if no such entry exists.
export function resolveScreenEntry(screenType) {
  return (
    SCHEDULE.filter((item) => {
      if (item.screen !== screenType) return false;
      const status = computedStatus(item);
      return status === 'OPEN' || status === 'SCHEDULED';
    }).sort((a, b) => a.window_start.localeCompare(b.window_start))[0] ?? null
  );
}
