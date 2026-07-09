import { FIELDS as COLLABORATOR_FIELDS } from './collaboratorSchema.js';
import { FIELDS as INSTITUTION_FIELDS, COLLABORATOR_TYPE_OPTIONS } from './institutionSchema.js';
import {
  buildCombinationFields,
  buildScreenFields as buildTestAgentFields,
} from './testAgentSchema.js';
import { getFields as getAcknowledgementFields } from './acknowledgementsSchema.js';

export function parseFormDataForApi(formData, screenType, screenName) {
  const collaborator = formData.collaborator ?? {};
  const institution = formData.institution ?? {};
  const acknowledgements = formData.acknowledgements ?? {};
  const testAgent = formData.testAgent ?? { rows: [], combinations: [] };

  const collaboratorTypeKey = institution[INSTITUTION_FIELDS.INSTITUTION_TYPE.key];
  const collaboratorTypeLabel =
    Object.values(COLLABORATOR_TYPE_OPTIONS).find((o) => o.key === collaboratorTypeKey)?.label ??
    collaboratorTypeKey;

  const managers = (collaborator[COLLABORATOR_FIELDS.DATA_ACCESS_MANAGERS.key] ?? []).filter(
    (m) => m.name && m.email,
  );

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

  const ackFields = getAcknowledgementFields();
  const agreements = {};
  for (const f of ackFields) {
    if (acknowledgements[f.key]) {
      const cleanDesc = f.description
        .replace(/<[^>]+>/g, '')
        .replace(/\{screenType\}/g, screenType);
      agreements[cleanDesc] = 'I acknowledge and agree';
    }
  }

  // Omit main_contact/main_contact_email entirely when no managers were provided, rather than
  // sending them as empty strings.
  const mainContactFields =
    managers.length > 0
      ? {
          main_contact: managers
            .map((m) => m.name)
            .filter(Boolean)
            .join(', '),
          main_contact_email: managers
            .map((m) => m.email)
            .filter(Boolean)
            .join(', '),
        }
      : {};

  const compoundFields = buildTestAgentFields(screenType);

  //  // const compounds below will be used when api is updated/removes previously required fields
  // const compounds = (testAgent.rows ?? []).map((row) =>
  //   Object.fromEntries(compoundFields.map((f) => [f.key, row[f.key] ?? ''])),
  // );

  // This work-around will be depricated once the API no longer requires previously hardcoded fields.
  const compounds = (testAgent.rows ?? []).map((row) => {
    const base = Object.fromEntries(compoundFields.map((f) => [f.key, row[f.key] ?? '']));
    return {
      ...base,
      // API expects boolean; form uses 'Yes'/'No'.
      health_hazard: base.health_hazard === 'Yes',
      // Fields no longer collected by the form — hardcoded to satisfy the API contract.
      full_brd: '',
      supplier: 'Broad Institute of MIT and Harvard',
      supplier_catalog_name: 'Broad Institute of MIT and Harvard',
    };
  });
  const results = {
    compoundInfo: {
      screen: screenName,
      submission_type: screenType,
      submitter_email: collaborator[COLLABORATOR_FIELDS.YOUR_EMAIL.key] ?? '',
      submitter_name: collaborator[COLLABORATOR_FIELDS.YOUR_NAME.key] ?? '',
      investigator_email: collaborator[COLLABORATOR_FIELDS.INVESTIGATOR_EMAIL.key] ?? '',
      investigator_name: collaborator[COLLABORATOR_FIELDS.INVESTIGATOR_NAME.key] ?? '',
      ...mainContactFields,
      home_institution: institution[INSTITUTION_FIELDS.INSTITUTION_NAME.key] ?? '',
      total_num_cpds: String((testAgent.rows ?? []).length),
      collaboration_type: collaboratorTypeLabel ?? '',
      agreements,
      funding_comments: institution[INSTITUTION_FIELDS.COMMENTS.key] ?? '',
      br_funding_inst: fundingInst,
      grant_admin: grantAdmin,
      project_goals: 'Testing. Field to be removed.', // to be removed
      supplier: 'Testing. Field to be removed.',
      supplier_catalog_name: 'Testing. Field to be removed.',
      quote_acknowledgement:
        institution[INSTITUTION_FIELDS.QUOTE_ACKNOWLEDGEMENT.key] === true
          ? 'I acknowledge and agree'
          : '',
      commercial_use: institution[INSTITUTION_FIELDS.COMMERCIAL_USE.key] ?? '',
      commercial_use_acknowledgement:
        institution[INSTITUTION_FIELDS.COMMERCIAL_USE_ACKNOWLEDGEMENT.key] === true
          ? 'I acknowledge and agree'
          : '',
    },
    compounds,
    combinations:
      buildCombinationFields(screenType).length > 0
        ? (testAgent.combinations ?? []).map((row) =>
            Object.fromEntries(
              buildCombinationFields(screenType).map((f) => [f.key, row[f.key] ?? '']),
            ),
          )
        : [],
  };
  return results;
}
