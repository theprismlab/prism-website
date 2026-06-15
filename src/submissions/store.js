import { defineStore } from 'pinia';

export const FORM_STEPS = [
  { id: 'collaborator', title: 'Collaborator', icon: 'mdi-account-outline' },
  { id: 'screen-details', title: 'Screen Details', icon: 'mdi-television-play' },
  { id: 'application', title: 'Application', icon: 'mdi-file-document-edit-outline' },
  { id: 'documents', title: 'Supporting Documents', icon: 'mdi-paperclip' },
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
          formData: {
            collaborator: { firstName: '', lastName: '', email: '', company: '' },
            'screen-details': { rows: [{ pert_name: '', pert_dose: '', pert_id: '' }] },
            application: { campaignDescription: '', campaignStartDate: '', duration: null },
            documents: { notes: '' },
            review: { confirmed: false },
          },
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
