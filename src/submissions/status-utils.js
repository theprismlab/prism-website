export const STATUS_META = {
  OPEN: {
    key: 'open',
    label: 'Open Window',
    color: 'teal-accent-4',
  },
  'IN-PROGRESS': {
    key: 'in-progress',
    label: 'In Progress',
    color: 'yellow-darken-2',
  },
  SCHEDULED: {
    key: 'scheduled',
    label: 'Scheduled',
    color: 'grey',
  },
  MAX_CAPACITY: {
    key: 'max-capacity',
    label: 'Max Capacity',
    color: 'orange',
  },
  CLOSE: {
    key: 'closed',
    label: 'Closed',
    color: 'red',
  },
};

export function statusMeta(status) {
  return (
    STATUS_META[status] ?? {
      key: 'default',
      label: status ?? '',
      color: 'default',
    }
  );
}
