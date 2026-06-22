import {
  getInitialData as collaboratorInit,
  getSummary as collaboratorSummary,
  validate as collaboratorValidate,
} from './collaboratorSchema.js';
import {
  getInitialData as institutionInit,
  getSummary as institutionSummary,
  validate as institutionValidate,
} from './institutionSchema.js';
import {
  getInitialData as testAgentInit,
  getSummary as testAgentSummary,
  validate as testAgentValidate,
} from './testAgentSchema.js';
import {
  getInitialData as acknowledgementsInit,
  getSummary as acknowledgementsSummary,
  validate as acknowledgementsValidate,
} from './acknowledgementsSchema.js';
import {
  getInitialData as reviewInit,
  validate as reviewValidate,
} from './reviewSchema.js';

export const STEP_REGISTRY = {
  collaborator: {
    getInitialData: collaboratorInit,
    getSummary: collaboratorSummary,
    validate: collaboratorValidate,
  },
  institution: {
    getInitialData: institutionInit,
    getSummary: institutionSummary,
    validate: institutionValidate,
  },
  testAgent: {
    getInitialData: testAgentInit,
    getSummary: testAgentSummary,
    validate: testAgentValidate,
  },
  acknowledgments: {
    getInitialData: acknowledgementsInit,
    getSummary: acknowledgementsSummary,
    validate: acknowledgementsValidate,
  },
  review: {
    getInitialData: reviewInit,
    getSummary: null,
    validate: reviewValidate,
  },
};
