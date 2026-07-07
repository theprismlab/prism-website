import { defineStore } from 'pinia';
import { findScreens, fetchSubmissionMessage, stripSeqSuffix } from './api.js';
import { loadableState, loadableActions } from './loadable.js';

// Single source of truth for "what do we know about a submission type," keyed by screen_type
// (e.g. 'MTS'). Each entry merges two APIs that answer two different questions:
//   - name:   which screen is current for this type. Resolved from prism_screens.status ONLY
//             (newest 'ACTIVE' by date_created) — prism_screens.status is never used for
//             anything else, in particular never as a signal for submission accessibility.
//   - status/message (+ rest): whether that screen currently accepts submissions, straight from
//             prism_submission_window_message. That API is the ONLY source for accessibility.
export const useScreenStatusStore = defineStore('screenStatus', {
  state: () => ({
    statuses: {}, // { [SCREEN_TYPE]: { ...raw prism_submission_window_message fields, name } }
    ...loadableState(),
  }),
  getters: {
    statusFor: (state) => (screenType) =>
      screenType ? (state.statuses[screenType.toUpperCase()] ?? null) : null,
    // Convenience wrapper — just the current screen's name, tolerates a falsy screenType.
    activeScreenNameFor() {
      return (screenType) => this.statusFor(screenType)?.name ?? null;
    },
    // fetchSubmissionMessage returns one row per real submission type, so its keys (after
    // stripSeqSuffix) are the canonical list of known screen types.
    isValidType: (state) => (screenType) =>
      !!screenType && Object.prototype.hasOwnProperty.call(state.statuses, screenType.toUpperCase()),
    // Is this exact screen name valid to submit against for this type? { status: null } means
    // valid; { status: 'INVALID', message } means not. Two independent checks: screenName must
    // be the type's current screen (identity, from prism_screens), AND the type's submission
    // window must currently be OPEN (accessibility, from prism_submission_window_message).
    validationFor() {
      return (screenName, screenType) => {
        const invalid = {
          status: 'INVALID',
          message: `Screen '${screenName}' is not associated with submission type '${screenType}'`,
        };
        if (!screenName || !screenType) return invalid;
        const s = this.statusFor(screenType);
        if (!s || s.name !== screenName) return invalid;
        if (s.status !== 'OPEN') return { status: 'INVALID', message: s.message };
        return { status: null, message: null };
      };
    },
  },
  actions: loadableActions(async function (apiUrl) {
    const [screens, messages] = await Promise.all([findScreens(apiUrl), fetchSubmissionMessage(apiUrl)]);
    const map = {};
    for (const msg of messages || []) {
      const key = stripSeqSuffix(msg.submission_type);
      if (key) map[key] = { ...msg, name: null };
    }
    for (const key of Object.keys(map)) {
      const active = screens
        .filter((screen) => stripSeqSuffix(screen.screen_type) === key && screen.status === 'ACTIVE')
        .sort((a, b) => new Date(b.date_created) - new Date(a.date_created));
      map[key].name = active[0]?.name ?? null;
    }
    this.statuses = map;
    console.log('[screenStatusStore] resolved statuses', this.statuses);
  }),
});

// Shared wording for an unrecognized :screenType — kept in one place since it's used by
// InstructionsSubDrawer.vue, test-agent.vue, and shipping.vue.
export function invalidScreenTypeMessage(screenType) {
  return `'${screenType}' is not a valid screen type. Please select one from the menu`;
}
