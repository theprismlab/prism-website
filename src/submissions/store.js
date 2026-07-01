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
    // Form progress/data keyed by the specific resolved screen name (e.g. 'MTS034'), not the
    // screen type — a type can have more than one screen over time (e.g. 'MTS033', 'MTS034'
    // are both 'MTS'), and each should start with a fresh form, not inherit a prior screen's
    // in-progress draft.
    screens: {},
    lastScreenType: null,
  }),
  getters: {
    stepStatus: (state) => (screenName, index) => {
      const s = state.screens[screenName];
      if (!s) return index === 0 ? 'current' : 'available';
      if (s.completed.includes(index)) return 'completed';
      if (s.openPanel === index) return 'current';
      return 'available';
    },
    openPanel: (state) => (screenName) => state.screens[screenName]?.openPanel ?? null,
  },
  actions: {
    // screenType is only needed the first time, to build the right initial form shape
    // (schemas key off the type, e.g. 'MTS'/'CPS', not the specific screen name).
    _ensure(screenName, screenType) {
      if (!this.screens[screenName]) {
        this.screens[screenName] = {
          openPanel: 0,
          completed: [],
          formData: Object.fromEntries(
            FORM_STEPS.map((s) => [s.id, STEP_REGISTRY[s.id].getInitialData(screenType)])
          ),
        };
      }
    },
    completeStep(screenName, screenType, index) {
      this._ensure(screenName, screenType);
      const s = this.screens[screenName];
      if (!s.completed.includes(index)) s.completed.push(index);
      if (index + 1 < FORM_STEPS.length) s.openPanel = index + 1;
    },
    setOpenPanel(screenName, screenType, index) {
      this._ensure(screenName, screenType);
      this.screens[screenName].openPanel = index;
    },
    setLastScreenType(screenType) {
      if (screenType) this.lastScreenType = screenType;
    },
    uncompleteStep(screenName, index) {
      const s = this.screens[screenName];
      if (!s) return;
      s.completed = s.completed.filter((i) => i !== index);
    },
    markStepValid(screenName, screenType, index) {
      this._ensure(screenName, screenType);
      const s = this.screens[screenName];
      if (!s.completed.includes(index)) s.completed.push(index);
    },
  },
});
