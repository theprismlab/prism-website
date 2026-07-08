<template>
  <div>
    <template v-for="(sectionItems, sectionTitle) in groupedFields" :key="sectionTitle">
      <h3 class="prism-text-form-group-label">{{ sectionTitle }}</h3>
      <div v-for="f in sectionItems" :key="f.key" class="mb-4">
        <p class="prism-text-form-body" v-html="descriptionHtml(f)" />
        <v-checkbox
          v-model="data[f.key]"
          :label="f.label"
          hide-details="auto"
          :error-messages="errors[f.key]"
        />
      </div>
    </template>
  </div>
</template>

<script>
  import { getFields } from './acknowledgementsSchema.js';

  export default {
    name: 'AcknowledgmentsStep',
    props: {
      data: { type: Object, required: true },
      errors: { type: Object, default: () => ({}) },
      // Still needed for descriptionHtml() — the acknowledgement text links to
      // screen-specific instructions pages, even though the fields themselves don't vary.
      screenType: { type: String, default: null },
    },
    computed: {
      screenFields() {
        return getFields();
      },
      groupedFields() {
        const groups = {};
        for (const f of this.screenFields) {
          if (!groups[f.section]) groups[f.section] = [];
          groups[f.section].push(f);
        }
        return groups;
      },
    },
    methods: {
      descriptionHtml(f) {
        // screenType comes from the route and is spliced into an href inside HTML that's
        // rendered via v-html — encode it so it can't break out of the attribute/tag.
        const safeScreenType = encodeURIComponent(this.screenType || '');
        return f.description.replace(/\{screenType\}/g, safeScreenType);
      },
    },
  };
</script>
