import { defineStore } from 'pinia';
import { STEP_REGISTRY } from './forms/steps/registry';

export const FORM_STEPS = [
  { id: 'collaborator', title: 'Collaborator', icon: 'mdi-account-outline' },
  { id: 'institution', title: 'Institution', icon: 'mdi-office-building' },
  { id: 'testAgent', title: 'Test Agent', icon: 'mdi-flask-outline' },
  { id: 'acknowledgments', title: 'Acknowledgments', icon: 'mdi-handshake-outline' },
  { id: 'review', title: 'Review & Submit', icon: 'mdi-check-circle-outline' },
];

export const useFormProgressStore = defineStore('formProgress', {
  state: () => ({
    screenTypes: {},
    lastScreenType: null,
  }),
  getters: {
    stepStatus: (state) => (screenType, index) => {
      const s = state.screenTypes[screenType];
      if (!s) return index === 0 ? 'current' : 'available';
      if (s.completed.includes(index)) return 'completed';
      if (s.openPanel === index) return 'current';
      return 'available';
    },
    openPanel: (state) => (screenType) => state.screenTypes[screenType]?.openPanel ?? null,
  },
  actions: {
    _ensure(screenType) {
      if (!this.screenTypes[screenType]) {
        this.screenTypes[screenType] = {
          openPanel: 0,
          completed: [],
          formData: Object.fromEntries(
            FORM_STEPS.map((s) => [s.id, STEP_REGISTRY[s.id].getInitialData(screenType)])
          ),
        };
      }
    },
    completeStep(screenType, index) {
      this._ensure(screenType);
      const s = this.screenTypes[screenType];
      if (!s.completed.includes(index)) s.completed.push(index);
      if (index + 1 < FORM_STEPS.length) s.openPanel = index + 1;
    },
    setOpenPanel(screenType, index) {
      this._ensure(screenType);
      this.screenTypes[screenType].openPanel = index;
    },
    setLastScreenType(screenType) {
      if (screenType) this.lastScreenType = screenType;
    },
    uncompleteStep(screenType, index) {
      const s = this.screenTypes[screenType];
      if (!s) return;
      s.completed = s.completed.filter((i) => i !== index);
    },
    markStepValid(screenType, index) {
      this._ensure(screenType);
      const s = this.screenTypes[screenType];
      if (!s.completed.includes(index)) s.completed.push(index);
    },
  },
});
