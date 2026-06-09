import { defineStore } from 'pinia'

export const FORM_STEPS = [
  { id: 'contact', title: 'Contact Info', icon: 'mdi-account-outline' },
  { id: 'screen-details', title: 'Screen Details', icon: 'mdi-television-play' },
  { id: 'application', title: 'Application', icon: 'mdi-file-document-edit-outline' },
  { id: 'documents', title: 'Supporting Documents', icon: 'mdi-paperclip' },
  { id: 'review', title: 'Review & Submit', icon: 'mdi-check-circle-outline' },
]

export const useFormProgressStore = defineStore('formProgress', {
  state: () => ({
    screens: {},
  }),
  getters: {
    stepStatus: (state) => (screen, index) => {
      const s = state.screens[screen]
      if (!s) return index === 0 ? 'current' : 'locked'
      if (s.completed.includes(index)) return 'completed'
      if (s.current === index) return 'current'
      return 'locked'
    },
    canAccess: (state) => (screen, index) => {
      const s = state.screens[screen]
      if (!s) return index === 0
      return index <= s.current || s.completed.includes(index)
    },
    openPanel: (state) => (screen) => state.screens[screen]?.openPanel ?? 0,
  },
  actions: {
    _ensure(screen) {
      if (!this.screens[screen]) {
        this.screens[screen] = {
          current: 0,
          openPanel: 0,
          completed: [],
          formData: {
            contact: { firstName: '', lastName: '', email: '', company: '' },
            'screen-details': {
              screenType: null,
              location: '',
              weeklyImpressions: '',
              audienceCategory: null,
            },
            application: { campaignDescription: '', campaignStartDate: '', duration: null },
            documents: { notes: '' },
            review: { confirmed: false },
          },
        }
      }
    },
    completeStep(screen, index) {
      this._ensure(screen)
      const s = this.screens[screen]
      if (!s.completed.includes(index)) s.completed.push(index)
      if (index + 1 > s.current) {
        s.current = index + 1
        s.openPanel = index + 1
      }
    },
    setOpenPanel(screen, index) {
      this._ensure(screen)
      this.screens[screen].openPanel = index
    },
  },
})
