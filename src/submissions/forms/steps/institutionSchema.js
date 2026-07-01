// Institution step field schema and per-screen rules.
// Pure JS — no Vue dependencies.

import { required, validEmail } from './validationHelpers';

export const COLLABORATOR_TYPE_OPTIONS = {
  DMC: { key: 'DMC', label: 'Dependency Map Consortium' },
  BROAD: { key: 'NFP', label: 'Broad Institute & Affiliated Institutions' },
  ACADEMIC: { key: 'ACADEMIC', label: 'Academic Institution (Non-Broad or Broad Affiliates)' },
  INDUSTRY: { key: 'INDUSTRY', label: 'Industry' },
};

export const INSTITUTION_TYPE_OPTIONS = Object.values(COLLABORATOR_TYPE_OPTIONS).map((o) => ({
  title: o.label,
  value: o.key,
}));

const requiresExtendedForm = (data) =>
  !!data.institutionType && data.institutionType !== COLLABORATOR_TYPE_OPTIONS.DMC.key;

const isAcademicOrBroad = (data) =>
  data.institutionType === COLLABORATOR_TYPE_OPTIONS.BROAD.key ||
  data.institutionType === COLLABORATOR_TYPE_OPTIONS.ACADEMIC.key;

export const FIELDS = {
  INSTITUTION_TYPE: {
    key: 'institutionType',
    label: 'Institution Type',
  },
  INSTITUTION_NAME: {
    key: 'institutionName',
    label: 'Institution Name',
    showIf: (data) => !!data.institutionType,
  },
  QUOTE_ACKNOWLEDGEMENT: {
    key: 'quoteAcknowledgement',
    label: 'Quote Acknowledgement',
    default: false,
    showIf: isAcademicOrBroad,
  },
  COMMERCIAL_USE: {
    key: 'commercialUse',
    label: 'Commercial Use?',
    showIf: isAcademicOrBroad,
  },
  COMMERCIAL_USE_ACKNOWLEDGEMENT: {
    key: 'commercialUseAcknowledgement',
    label: 'Commercial Use Acknowledgement',
    default: false,
    showIf: (data) => data.commercialUse === 'Yes',
  },
  FUNDING_INSTITUTION_NAME: {
    key: 'fundingInstitutionName',
    label: 'Funding Institution Name',
    showIf: requiresExtendedForm,
  },
  FUNDING_INSTITUTION_ADDRESS: {
    key: 'fundingInstitutionAddress',
    label: 'Funding Institution Address',
    showIf: requiresExtendedForm,
  },
  BILLING_CONTACT_NAME: {
    key: 'billingInvoiceContactName',
    label: 'Billing / Invoice Contact Name',
    showIf: requiresExtendedForm,
  },
  BILLING_CONTACT_EMAIL: {
    key: 'billingInvoiceContactEmail',
    label: 'Billing / Invoice Contact Email',
    showIf: requiresExtendedForm,
  },
  COMMENTS: {
    key: 'comments',
    label: 'Comments',
    hint: 'For example, requests to receive invoices earlier due to funding deadlines',
    showIf: requiresExtendedForm,
    required: false,
  },
};

export function getInitialData() {
  return Object.fromEntries(Object.values(FIELDS).map((f) => [f.key, f.default ?? '']));
}

export function getSummary(data) {
  return Object.values(FIELDS)
    .filter((f) => !f.showIf || f.showIf(data))
    .map((f) => {
      const raw = data[f.key];
      let value;
      if (raw === true) value = 'Confirmed';
      else if (raw === false || raw === '' || raw == null) value = 'No response';
      else value = String(raw);
      return { label: f.label, value };
    });
}

const EMAIL_FIELDS = new Set([FIELDS.BILLING_CONTACT_EMAIL.key]);

export function validate(data, _screenType) {
  const errors = {};
  Object.values(FIELDS).forEach((f) => {
    if (f.showIf && !f.showIf(data)) return;
    if (f.required === false) return;
    const err =
      required(data[f.key]) || (EMAIL_FIELDS.has(f.key) ? validEmail(data[f.key]) : undefined);
    if (err) errors[f.key] = err;
  });
  return errors;
}
