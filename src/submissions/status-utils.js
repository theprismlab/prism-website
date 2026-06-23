export const STATUS_META = {
  OPEN: {
    key: 'open',
    label: 'Accepting Submissions',
    color: 'teal-accent-4',
    dotColor: '#00BFA5',
  },
  'IN-PROGRESS': {
    key: 'in-progress',
    label: 'In Progress',
    color: 'yellow-darken-2',
    dotColor: '#F9A825',
  },
  CLOSED: {
    key: 'closed',
    label: 'Closed',
    color: 'red-accent-4',
    dotColor: '#FF1744',
  },
  SCHEDULED: {
    key: 'scheduled',
    label: 'Scheduled',
    color: 'grey-lighten-2',
    dotColor: '#BDBDBD',
  },
};

export function normalizeStatus(status) {
  const s = (status || '').toUpperCase();
  if (s === 'OPEN' || s === 'ACTIVE') return 'OPEN';
  if (s === 'ACTIVE - WINDOW CLOSED' || s === 'IN-PROGRESS' || s === 'IN PROGRESS') return 'IN-PROGRESS';
  if (s === 'CLOSED' || s === 'COMPLETE') return 'CLOSED';
  if (s === 'SCHEDULED') return 'SCHEDULED';
  return null;
}

export function statusMeta(status) {
  return STATUS_META[status] ?? { key: 'default', label: status ?? '', color: 'default', dotColor: '#BDBDBD' };
}
