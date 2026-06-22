// Collaborator step field schema.
// Pure JS — no Vue dependencies.

import { required, validEmail } from './validationHelpers';

export const FIELDS = {
  YOUR_NAME: { key: 'yourName', label: 'Your Name' },
  YOUR_EMAIL: {
    key: 'yourEmail',
    label: 'Your Email (institutional email, no personal emails)',
  },
  INVESTIGATOR_NAME: { key: 'investigatorName', label: 'Investigator Name' },
  INVESTIGATOR_EMAIL: {
    key: 'investigatorEmail',
    label: 'Investigator Email (institutional email, no personal emails)',
  },
  DATA_ACCESS_MANAGERS: {
    key: 'dataAccessManagers',
    nameLabel: 'Data Access Manager Name',
    emailLabel: 'Data Access Manager Email',
  },
};

export function getInitialData() {
  return {
    [FIELDS.YOUR_NAME.key]: '',
    [FIELDS.YOUR_EMAIL.key]: '',
    [FIELDS.INVESTIGATOR_NAME.key]: '',
    [FIELDS.INVESTIGATOR_EMAIL.key]: '',
    [FIELDS.DATA_ACCESS_MANAGERS.key]: [{ name: '', email: '' }],
  };
}

export function getSummary(data) {
  const simple = [
    FIELDS.YOUR_NAME,
    FIELDS.YOUR_EMAIL,
    FIELDS.INVESTIGATOR_NAME,
    FIELDS.INVESTIGATOR_EMAIL,
  ]
    .map((f) => ({ label: f.label, value: data[f.key] }))
    .filter((item) => item.value);

  const managers = (data[FIELDS.DATA_ACCESS_MANAGERS.key] || [])
    .filter((m) => m.name || m.email)
    .map((m, i) => ({
      label: `Data Access Manager ${i + 1}`,
      value: [m.name, m.email].filter(Boolean).join(', '),
    }));

  return [...simple, ...managers];
}

export function validate(data) {
  const errors = {};

  const err = (key, ...validators) => {
    for (const v of validators) {
      const msg = v(data[key]);
      if (msg) {
        errors[key] = msg;
        return;
      }
    }
  };

  err(FIELDS.YOUR_NAME.key, required);
  err(FIELDS.YOUR_EMAIL.key, required, validEmail);
  err(FIELDS.INVESTIGATOR_NAME.key, required);
  err(FIELDS.INVESTIGATOR_EMAIL.key, required, validEmail);

  (data[FIELDS.DATA_ACCESS_MANAGERS.key] || []).forEach((m, i) => {
    const hasName = !!m.name;
    const hasEmail = !!m.email;
    if (hasName || hasEmail) {
      if (!hasName) errors[`dataAccessManagers_${i}_name`] = 'Required';
      if (!hasEmail) {
        errors[`dataAccessManagers_${i}_email`] = 'Required';
      } else {
        const e = validEmail(m.email);
        if (e) errors[`dataAccessManagers_${i}_email`] = e;
      }
    }
  });

  return errors;
}
