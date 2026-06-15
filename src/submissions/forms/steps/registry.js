import {
  getInitialData as collaboratorInit,
  getSummary as collaboratorSummary,
  validate as collaboratorValidate,
} from './CollaboratorStep.vue';
import {
  getInitialData as institutionInit,
  getSummary as institutionSummary,
  validate as institutionValidate,
} from './InstitutionStep.vue';
import {
  getInitialData as acknowledgementsInit,
  getSummary as acknowledgementsSummary,
  validate as acknowledgementsValidate,
} from './AcknowledgmentsStep.vue';
import { getInitialData as reviewInit, validate as reviewValidate } from './ReviewStep.vue';

import ApsTestAgentStep, {
  getInitialData as apsInit,
  getSummary as apsSummary,
  validate as apsValidate,
} from './TestAgentStep/APS.vue';
import AirTestAgentStep, {
  getInitialData as airInit,
  getSummary as airSummary,
  validate as airValidate,
} from './TestAgentStep/AIR.vue';
import EpsTestAgentStep, {
  getInitialData as epsInit,
  getSummary as epsSummary,
  validate as epsValidate,
} from './TestAgentStep/EPS.vue';
import MtsTestAgentStep, {
  getInitialData as mtsInit,
  getSummary as mtsSummary,
  validate as mtsValidate,
} from './TestAgentStep/MTS.vue';
import CpsTestAgentStep, {
  getInitialData as cpsInit,
  getSummary as cpsSummary,
  validate as cpsValidate,
} from './TestAgentStep/CPS.vue';

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

export const TEST_AGENT_REGISTRY = {
  APS: { component: ApsTestAgentStep, getInitialData: apsInit, getSummary: apsSummary, validate: apsValidate },
  AIR: { component: AirTestAgentStep, getInitialData: airInit, getSummary: airSummary, validate: airValidate },
  EPS: { component: EpsTestAgentStep, getInitialData: epsInit, getSummary: epsSummary, validate: epsValidate },
  MTS: { component: MtsTestAgentStep, getInitialData: mtsInit, getSummary: mtsSummary, validate: mtsValidate },
  CPS: { component: CpsTestAgentStep, getInitialData: cpsInit, getSummary: cpsSummary, validate: cpsValidate },
};
