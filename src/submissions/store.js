import { defineStore } from 'pinia';

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
          formData: {
            collaborator: {
              yourName: '',
              yourEmail: '',
              investigatorName: '',
              investigatorEmail: '',
              dataAccessManagerNames: '',
              dataAccessManagerEmails: '',
            },
            institution: {
              institutionType: '', // dropdown with options for: broad, dmc, academic, industry
              institutionName: '', // if broad or dms, show dropdown with mock-array of a few names; if academic or industry, show text input
              // if DMS, go to next step. If broad or academic or industry, show the following additional fields:
              quoteAcknowledgement: '',
              commerecialUse: '', // if yes, show commerecialUseAcknowledgement
              commerecialUseAcknowledgement: '',
              // if industry, show the following additional fields:
              fundingInstitutionName: '', // for type 'industry'
              fundingInstitutionAddress: '', // for type 'industry'
              billingInvoiceContactName: '', // for type 'industry'
              billingInvoiceContactEmail: '', // for type 'industry'
              comments: '',
            },
            testAgent: { rows: [{ pert_name: '', pert_dose: '', pert_id: '' }] },
            acknowledgments: { acknowledgement1: '', acknowledgement2: '' },
            review: { confirmed: false }, // populate questions and answers for each previous step to display in the review step
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
