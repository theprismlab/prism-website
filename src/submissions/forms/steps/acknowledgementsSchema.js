// Acknowledgements step field schema and per-screen rules.
// Pure JS — no Vue dependencies.

import { required } from './validationHelpers';

const FIELDS = {
  TEST_AGENT_REQ_1: {
    key: 'acknowledgement1',
    section: 'Test agent requirements',
    description:
      'You have carefully reviewed the <a href="/submission-hub/instructions/{screenType}/test-agent" target="_blank" rel="noopener noreferrer">Screen Information & Test Agent Requirements</a> to ensure your test agents are being submitted at the proper volume and stock concentration and compatible with the selected screen type.',
    label: 'I acknowledge and agree.',
    default: false,
  },
  TEST_AGENT_REQ_2: {
    key: 'acknowledgement2',
    section: 'Test agent requirements',
    description:
      'All test agents must be solubilized in either 100% DMSO for MTS and CPS screens or 100% aqueous solution for APS and AIR screens. We do not QC compounds before the PRISM assay. The collaborator is responsible for QC\'ing test agents ahead of submission.',
    label: 'I acknowledge and agree.',
    default: false,
  },
  SHIPPING_1: {
    key: 'acknowledgement3',
    section: 'Test agent shipping',
    description:
      'Test agents must arrive at the PRISM Lab by 12:00pm ET on the submission window deadline. Any test agents that arrive after this time will not be included in the screen and held until the following screening window.',
    label: 'I acknowledge and agree.',
    default: false,
  },
  SHIPPING_2: {
    key: 'acknowledgement4',
    section: 'Test agent shipping',
    description:
      `International shipments MUST go through the Broad Institute's Customs Broker and should be shipped at least 1 week before the submission deadline. Review the <a href="/submission-hub/instructions/{screenType}/shipping" target="_blank" rel="noopener noreferrer">Shipping Information</a> for additional instructions and information.`,
    label: 'I acknowledge and agree.',
    default: false,
  },
  RESULTS_USE_1: {
    key: 'acknowledgement5',
    section: 'Use of PRISM results',
    description:
      'Academics/non-profits receive subsidized pricing for PRISM screens and thus, results are for academic/research purposes only. If academics would like to use results for commercial/industry purposes, they will need to purchase a license or sign a sponsored research agreement, and pay a higher fee. Examples of using PRISM results in commercial or industry purposes include but are not limited to: starting a new company using PRISM results, or selling a test agent with PRISM results to a company.',
    label: 'I acknowledge and agree.',
    default: false,
  },
  RESULTS_USE_2: {
    key: 'acknowledgement6',
    section: 'Use of PRISM results',
    description:
      'PRISM retains the right to use collaboratively generated data to validate and improve the PRISM platform.',
    label: 'I acknowledge and agree.',
    default: false,
  },
  RESULTS_USE_3: {
    key: 'acknowledgement7',
    section: 'Use of PRISM results',
    description:
      'PRISM requests acknowledgement in manuscripts in accordance with the NIH guidelines for Authorship Contribution. At minimum, please acknowledge the PRISM lab and use the word "PRISM" in the manuscript. Additional information about citing PRISM can be found on our website.',
    label: 'I acknowledge and agree.',
    default: false,
  },
};

// Per-screen field lists — extend as screen variants are added.
const SCREEN_CONFIGS = {
  default: [
    'TEST_AGENT_REQ_1',
    'TEST_AGENT_REQ_2',
    'SHIPPING_1',
    'SHIPPING_2',
    'RESULTS_USE_1',
    'RESULTS_USE_2',
    'RESULTS_USE_3',
  ],
};

export function buildScreenFields(screenType) {
  const keys = SCREEN_CONFIGS[screenType] || SCREEN_CONFIGS.default;
  return keys.map((k) => FIELDS[k]);
}

export function getInitialData() {
  return Object.fromEntries(Object.values(FIELDS).map((f) => [f.key, f.default]));
}

export function getSummary(data) {
  return Object.values(FIELDS)
    .map((f) => ({ label: f.section + ': ' + f.description.slice(0, 60) + '…', value: data[f.key] ? 'Confirmed' : null }))
    .filter((item) => item.value);
}

export function validate(data, screenType) {
  const errors = {};
  for (const f of buildScreenFields(screenType)) {
    const err = required(data[f.key]);
    if (err) errors[f.key] = err;
  }
  return errors;
}
