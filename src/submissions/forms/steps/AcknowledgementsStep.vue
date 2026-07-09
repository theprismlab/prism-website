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
  import { buildScreenFields } from './acknowledgementsSchema.js';

  export default {
    name: 'AcknowledgementsStep',
    props: {
      data: { type: Object, required: true },
      errors: { type: Object, default: () => ({}) },
      screenType: { type: String, default: null },
    },
    computed: {
      screenFields() {
        return buildScreenFields(this.screenType);
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
        return f.description.replace('{screenType}', this.screenType || '');
      },
    },
  };
</script>
