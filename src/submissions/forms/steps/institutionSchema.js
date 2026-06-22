// Institution step field schema and per-screen rules.
// Pure JS — no Vue dependencies.

import { required, validEmail } from './validationHelpers';

export const COLLABORATOR_TYPE_OPTIONS = {
  DMC: { key: 'DMC', label: 'DepMap Consortium' },
  BROAD: { key: 'NFP', label: 'Broad Institute' },
  ACADEMIC: { key: 'ACADEMIC', label: 'Academic Institution' },
  INDUSTRY: { key: 'INDUSTRY', label: 'Industry' },
};

export const INSTITUTION_TYPE_OPTIONS = Object.values(COLLABORATOR_TYPE_OPTIONS).map((o) => ({
  title: o.label,
  value: o.key,
}));

const requiresExtendedForm = (data) =>
  !!data.institutionType && data.institutionType !== COLLABORATOR_TYPE_OPTIONS.DMC.key;

const hasSelectedInstitution = (data) => requiresExtendedForm(data) && !!data.institutionName;

const hasInstitutionName = (data) => !!data.institutionName;

export const FIELDS = {
  INSTITUTION_TYPE: {
    key: 'institutionType',
    label: 'Institution Type',
    placeholder: 'Select an institution type',
  },
  INSTITUTION_NAME: {
    key: 'institutionName',
    label: 'Institution Name',
    showIf: (data) => !!data.institutionType,
  },
  QUOTE_ACKNOWLEDGEMENT: {
    key: 'quoteAcknowledgement',
    label: 'Quote Acknowledgement',
    showIf: hasSelectedInstitution,
  },
  COMMERCIAL_USE: {
    key: 'commercialUse',
    label: 'Commercial Use?',
    showIf: hasInstitutionName,
  },
  COMMERCIAL_USE_ACKNOWLEDGEMENT: {
    key: 'commercialUseAcknowledgement',
    label: 'Commercial Use Acknowledgement',
    showIf: (data) => data.commercialUse === 'Yes',
  },
  FUNDING_INSTITUTION_NAME: {
    key: 'fundingInstitutionName',
    label: 'Funding Institution Name',
    showIf: (data) => data.institutionType === COLLABORATOR_TYPE_OPTIONS.INDUSTRY.key,
  },
  FUNDING_INSTITUTION_ADDRESS: {
    key: 'fundingInstitutionAddress',
    label: 'Funding Institution Address',
    showIf: (data) => data.institutionType === COLLABORATOR_TYPE_OPTIONS.INDUSTRY.key,
  },
  BILLING_CONTACT_NAME: {
    key: 'billingInvoiceContactName',
    label: 'Billing / Invoice Contact Name',
    showIf: (data) => data.institutionType === COLLABORATOR_TYPE_OPTIONS.INDUSTRY.key,
  },
  BILLING_CONTACT_EMAIL: {
    key: 'billingInvoiceContactEmail',
    label: 'Billing / Invoice Contact Email',
    showIf: (data) => data.institutionType === COLLABORATOR_TYPE_OPTIONS.INDUSTRY.key,
  },
  COMMENTS: { key: 'comments', label: 'Comments', showIf: hasInstitutionName },
};

export function getInitialData() {
  return Object.fromEntries(Object.values(FIELDS).map((f) => [f.key, '']));
}

export function getSummary(data) {
  return Object.values(FIELDS)
    .filter((f) => !f.showIf || f.showIf(data))
    .map((f) => ({ label: f.label, value: data[f.key] }))
    .filter((item) => item.value);
}

const EMAIL_FIELDS = new Set([FIELDS.BILLING_CONTACT_EMAIL.key]);

export function validate(data, _screenType) {
  const errors = {};
  Object.values(FIELDS).forEach((f) => {
    if (f.showIf && !f.showIf(data)) return;
    const err = required(data[f.key]) || (EMAIL_FIELDS.has(f.key) ? validEmail(data[f.key]) : undefined);
    if (err) errors[f.key] = err;
  });
  return errors;
}
