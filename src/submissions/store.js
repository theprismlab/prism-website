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
    screens: {},
  }),
  getters: {
    stepStatus: (state) => (screen, index) => {
      const s = state.screens[screen];
      if (!s) return index === 0 ? 'current' : 'available';
      if (s.completed.includes(index)) return 'completed';
      if (s.openPanel === index) return 'current';
      return 'available';
    },
    openPanel: (state) => (screen) => state.screens[screen]?.openPanel ?? 0,
  },
  actions: {
    _ensure(screen) {
      if (!this.screens[screen]) {
        this.screens[screen] = {
          openPanel: 0,
          completed: [],
          formData: Object.fromEntries(
            FORM_STEPS.map((s) => [s.id, STEP_REGISTRY[s.id].getInitialData()])
          ),
        };
      }
    },
    completeStep(screen, index) {
      this._ensure(screen);
      const s = this.screens[screen];
      if (!s.completed.includes(index)) s.completed.push(index);
      if (index + 1 < FORM_STEPS.length) s.openPanel = index + 1;
    },
    setOpenPanel(screen, index) {
      this._ensure(screen);
      this.screens[screen].openPanel = index;
    },
  },
});
