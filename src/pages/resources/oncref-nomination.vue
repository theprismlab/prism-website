<template>
  <page class="pt-0">
    <page-section background="multi-focal-cool" :padding="14">
      <app-container>
        <!-- <section-overline gradient></section-overline> -->
        <prism-page-title>Oncref Nomination</prism-page-title>
        <p class="prism-text-body-large">Blah blah blah.</p>
      </app-container>
    </page-section>

    <page-section :padding="12">
      <app-container>
        <section-overline gradient>NOMINATION</section-overline>
        <prism-section-title>Nomination Steps</prism-section-title>
        <p class="prism-text-body-large mb-10" style="max-width: 760px">
          Placeholder copy describing the nomination process.
        </p>

        <prism-expansion-panels v-model="openPanel">
          <v-expansion-panel
            v-for="(section, i) in sections"
            :key="section.id"
            :value="i"
            :disabled="section.locked"
            :class="{ 'is-completed': section.completed }"
          >
            <v-expansion-panel-title>
              <v-icon
                v-if="section.completed"
                class="step-icon mr-2"
                color="teal-accent-4"
                size="26"
              >
                mdi-check-circle
              </v-icon>
              <v-icon
                v-else
                class="step-number mr-2"
                size="26"
                :icon="`mdi-numeric-${i + 1}-circle-outline`"
              />
              <span>{{ section.title }}</span>
              <v-icon
                v-if="section.locked"
                class="step-lock ml-auto"
                size="20"
                icon="mdi-lock-outline"
              />
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <p class="prism-text-body-medium">{{ section.text }}</p>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </prism-expansion-panels>
      </app-container>
    </page-section>
  </page>
</template>

<script>
  export default {
    name: 'OncrefNomination',
    components: {},
    data() {
      return {
        openPanel: null,
        sections: [
          {
            id: 'collaborator',
            title: 'Collaborator',
            text: 'Dummy content.',
            completed: false,
            locked: false,
          },
          {
            id: 'institution',
            title: 'Institution',
            text: 'Dummy content.',
            completed: false,
            locked: false,
          },
          {
            id: 'test-agent',
            title: 'Test Agent',
            text: 'Dummy content.',
            completed: false,
            locked: false,
          },
          {
            id: 'acknowledgements',
            title: 'Acknowledgements',
            text: 'Dummy content.',
            completed: false,
            locked: false,
          },
          {
            id: 'review',
            title: 'Review & Submit',
            text: 'Dummy content for the review section.',
            completed: false,
            locked: true,
          },
        ],
      };
    },
    computed: {},
    async created() {},
    methods: {},
  };
</script>

<style scoped>
  /* xs */
  @media (max-width: 600px) {
  }
</style>
