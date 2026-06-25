import { FIELDS as COLLABORATOR_FIELDS } from './collaboratorSchema.js';
import { FIELDS as INSTITUTION_FIELDS, COLLABORATOR_TYPE_OPTIONS } from './institutionSchema.js';
import { FIELDS as TEST_AGENT_FIELDS } from './testAgentSchema.js';
import { buildScreenFields as buildAcknowledgementFields } from './acknowledgementsSchema.js';

export function parseFormDataForApi(formData, screenType) {
  const collaborator = formData.collaborator ?? {};
  const institution = formData.institution ?? {};
  const acknowledgments = formData.acknowledgments ?? {};
  const testAgent = formData.testAgent ?? { rows: [], combinations: [] };

  const collaboratorTypeKey = institution[INSTITUTION_FIELDS.INSTITUTION_TYPE.key];
  const collaboratorTypeLabel =
    Object.values(COLLABORATOR_TYPE_OPTIONS).find((o) => o.key === collaboratorTypeKey)?.label ??
    collaboratorTypeKey;

  const managers = collaborator[COLLABORATOR_FIELDS.DATA_ACCESS_MANAGERS.key] ?? [];
  const mainContact = managers[0] ?? {};

  const fundingInst = [
    institution[INSTITUTION_FIELDS.FUNDING_INSTITUTION_NAME.key],
    institution[INSTITUTION_FIELDS.FUNDING_INSTITUTION_ADDRESS.key],
  ]
    .filter(Boolean)
    .join(' ');

  const grantAdmin = [
    institution[INSTITUTION_FIELDS.BILLING_CONTACT_NAME.key],
    institution[INSTITUTION_FIELDS.BILLING_CONTACT_EMAIL.key],
  ]
    .filter(Boolean)
    .join(' ');

  const ackFields = buildAcknowledgementFields(screenType);
  const agreements = {};
  for (const f of ackFields) {
    if (acknowledgments[f.key]) {
      const cleanDesc = f.description
        .replace(/<[^>]+>/g, '')
        .replace(/\{screenType\}/g, screenType);
      agreements[cleanDesc] = 'I acknowledge and agree';
    }
  }

  const compounds = (testAgent.rows ?? []).map((row) => ({
    [TEST_AGENT_FIELDS.COMPOUND_NAME.key]: row[TEST_AGENT_FIELDS.COMPOUND_NAME.key] ?? '',
    [TEST_AGENT_FIELDS.TOP_DOSE.key]: row[TEST_AGENT_FIELDS.TOP_DOSE.key] ?? '',
    [TEST_AGENT_FIELDS.TOP_DOSE_UNIT.key]: row[TEST_AGENT_FIELDS.TOP_DOSE_UNIT.key] ?? '',
    [TEST_AGENT_FIELDS.CONC_AMOUNT.key]: row[TEST_AGENT_FIELDS.CONC_AMOUNT.key] ?? '',
    [TEST_AGENT_FIELDS.CONC_AMOUNT_UNIT.key]: row[TEST_AGENT_FIELDS.CONC_AMOUNT_UNIT.key] ?? '',
    [TEST_AGENT_FIELDS.CONC.key]: row[TEST_AGENT_FIELDS.CONC.key] ?? '',
    [TEST_AGENT_FIELDS.CONC_UNIT.key]: row[TEST_AGENT_FIELDS.CONC_UNIT.key] ?? '',
    [TEST_AGENT_FIELDS.STORAGE_CONDITIONS.key]: row[TEST_AGENT_FIELDS.STORAGE_CONDITIONS.key] ?? '',
    [TEST_AGENT_FIELDS.HEALTH_HAZARD.key]: row[TEST_AGENT_FIELDS.HEALTH_HAZARD.key] ?? '',
  }));

  return {
    compoundInfo: {
      screen: screenType,
      submission_type: screenType,
      submitter_email: collaborator[COLLABORATOR_FIELDS.YOUR_EMAIL.key] ?? '',
      submitter_name: collaborator[COLLABORATOR_FIELDS.YOUR_NAME.key] ?? '',
      investigator_email: collaborator[COLLABORATOR_FIELDS.INVESTIGATOR_EMAIL.key] ?? '',
      investigator_name: collaborator[COLLABORATOR_FIELDS.INVESTIGATOR_NAME.key] ?? '',
      main_contact: mainContact.name ?? '',
      main_contact_email: mainContact.email ?? '',
      home_institution: institution[INSTITUTION_FIELDS.INSTITUTION_NAME.key] ?? '',
      total_num_cpds: (testAgent.rows ?? []).length,
      collaboration_type: collaboratorTypeLabel ?? '',
      agreements,
      funding_comments: institution[INSTITUTION_FIELDS.COMMENTS.key] ?? '',
      br_funding_inst: fundingInst,
      grant_admin: grantAdmin,
    },
    compounds,
    combinations: testAgent.combinations ?? [],
  };
}
