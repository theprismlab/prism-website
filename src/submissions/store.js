import { defineStore } from 'pinia';
import { STEP_REGISTRY } from './forms/steps/registry';

export const FORM_STEPS = [
  { id: 'collaborator', title: 'Collaborator', icon: 'mdi-account-outline' },
  { id: 'institution', title: 'Institution', icon: 'mdi-office-building' },
  { id: 'testAgent', title: 'Test Agent', icon: 'mdi-flask-outline' },
  { id: 'acknowledgements', title: 'Acknowledgements', icon: 'mdi-handshake-outline' },
  { id: 'review', title: 'Review & Submit', icon: 'mdi-check-circle-outline' },
];

// Furthest step a screen may navigate to: the first not-yet-completed step, since steps must
// be completed in order (an out-of-order 'completed' entry — e.g. from the live-validation
// watcher marking a later step valid before earlier ones are done — should not unlock it).
function firstIncompleteIndex(s) {
  if (!s) return 0;
  for (let i = 0; i < FORM_STEPS.length; i++) {
    if (!s.completed.includes(i)) return i;
  }
  return FORM_STEPS.length - 1;
}

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
      if (s?.completed.includes(index)) return 'completed';
      if ((s?.openPanel ?? 0) === index) return 'current';
      return index <= firstIncompleteIndex(s) ? 'available' : 'locked';
    },
    openPanel: (state) => (screenName) => state.screens[screenName]?.openPanel ?? null,
    maxOpenIndex: (state) => (screenName) => firstIncompleteIndex(state.screens[screenName]),
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
            FORM_STEPS.map((s) => [s.id, STEP_REGISTRY[s.id].getInitialData(screenType)]),
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
    // Manually opening a panel (accordion click, sidebar click) — blocked for steps beyond the
    // first incomplete one so a step can't be reached before the ones ahead of it are done.
    setOpenPanel(screenName, screenType, index) {
      this._ensure(screenName, screenType);
      const s = this.screens[screenName];
      if (index != null && index > firstIncompleteIndex(s)) return;
      s.openPanel = index;
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
