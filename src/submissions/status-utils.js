export const STATUS_META = {
  OPEN: {
    key: 'open',
    // label: 'Accepting Submissions',
    label: 'Open Window',
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

export function statusMeta(status) {
  return (
    STATUS_META[status] ?? {
      key: 'default',
      label: status ?? '',
      color: 'default',
      dotColor: '#BDBDBD',
    }
  );
}
