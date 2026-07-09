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
      'All test agents must be solubilized in the appropriate solvent for their specific screen type (i.e. 100% DMSO or 100% aqueous solution). We do not accept or solubilize powder stock.',
    label: 'I acknowledge and agree.',
    default: false,
  },
  TEST_AGENT_REQ_3: {
    key: 'acknowledgement3',
    section: 'Test agent requirements',
    description:
      "The collaborator is responsible for quality control of test agents ahead of submission. PRISM does not quality control test agents before the assay or have the bandwidth to re-run any test agents that do not perform well. Any test agents will be run 'at-risk' to the collaborator.",
    label: 'I acknowledge and agree.',
    default: false,
  },
  SHIPPING_1: {
    key: 'acknowledgement4',
    section: 'Test agent shipping',
    description:
      'Test agents must arrive at the PRISM Lab by 12:00pm ET on the submission window deadline. Any test agents that arrive after this time will not be included in the screen and held until the following screening window.',
    label: 'I acknowledge and agree.',
    default: false,
  },
  SHIPPING_2: {
    key: 'acknowledgement5',
    section: 'Test agent shipping',
    description: `International shipments MUST go through the Broad Institute's Customs Broker and should be shipped at least 1 week before the submission deadline. Review the <a href="/submission-hub/instructions/{screenType}/shipping" target="_blank" rel="noopener noreferrer">Shipping Information</a> for additional instructions and information.`,
    label: 'I acknowledge and agree.',
    default: false,
  },
  RESULTS_USE_1: {
    key: 'acknowledgement6',
    section: 'Use of PRISM results',
    description:
      'Academics/non-profits receive subsidized pricing for PRISM screens and thus, results are for academic/research purposes only. If academics would like to use results for commercial/industry purposes, they will need to purchase a license or sign a sponsored research agreement, and pay a higher fee. Examples of using PRISM results in commercial or industry purposes include but are not limited to: starting a new company using PRISM results, or selling a test agent with PRISM results to a company.',
    label: 'I acknowledge and agree.',
    default: false,
  },
  RESULTS_USE_2: {
    key: 'acknowledgement7',
    section: 'Use of PRISM results',
    description:
      'PRISM retains the right to use collaboratively generated data to validate and improve the PRISM platform.',
    label: 'I acknowledge and agree.',
    default: false,
  },
  RESULTS_USE_3: {
    key: 'acknowledgement9',
    section: 'Use of PRISM results',
    description:
      'PRISM requests acknowledgement in manuscripts in accordance with the NIH guidelines for Authorship Contribution. At minimum, please acknowledge the PRISM lab and use the word "PRISM" in the manuscript. Additional information about citing PRISM can be found on our website.',
    label: 'I acknowledge and agree.',
    default: false,
  },
};

// Same acknowledgements for every screen type — unlike testAgentSchema.js, there's no
// per-screen config here.
export function getFields() {
  return Object.values(FIELDS);
}

export function getInitialData() {
  return Object.fromEntries(Object.values(FIELDS).map((f) => [f.key, f.default]));
}

export function getSummary(data) {
  return getFields().map((f) => ({
    section: f.section,
    label: f.description.replace(/<[^>]+>/g, ''),
    value: data[f.key] ? 'I acknowledge and agree' : 'No response',
  }));
}

export function validate(data) {
  const errors = {};
  for (const f of getFields()) {
    const err = required(data[f.key]);
    if (err) errors[f.key] = err;
  }
  return errors;
}
