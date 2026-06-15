import { getInitialData as collaboratorInit, validate as collaboratorValidate } from './CollaboratorStep.vue';
import { getInitialData as institutionInit, validate as institutionValidate } from './InstitutionStep.vue';
import { getInitialData as testAgentInit, validate as testAgentValidate } from './TestAgentStep.vue';
import { getInitialData as acknowledgementsInit, validate as acknowledgementsValidate } from './AcknowledgmentsStep.vue';
import { getInitialData as reviewInit, validate as reviewValidate } from './ReviewStep.vue';

export const STEP_REGISTRY = {
  collaborator: { getInitialData: collaboratorInit, validate: collaboratorValidate },
  institution: { getInitialData: institutionInit, validate: institutionValidate },
  testAgent: { getInitialData: testAgentInit, validate: testAgentValidate },
  acknowledgments: { getInitialData: acknowledgementsInit, validate: acknowledgementsValidate },
  review: { getInitialData: reviewInit, validate: reviewValidate },
};
