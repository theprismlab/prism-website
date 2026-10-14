<template>
  <!-- One anatomy for a topic wherever it appears: dimmed parent, then name. The topic
       colour is a left border on the host (chip or panel), not part of the label. -->
  <span class="topic-label">
    <span v-if="parent" class="topic-parent">
      <!-- v-text keeps the segments exact: no template whitespace can leak in. -->
      <template v-for="(part, i) in highlight(parent)" :key="i">
        <mark v-if="part.isMatch" class="faq-highlight" v-text="part.text" />
        <span v-else v-text="part.text" />
      </template>
      <span v-text="' ›'" />
    </span>
    <span class="topic-name">
      <template v-for="(part, i) in highlight(name)" :key="i">
        <mark v-if="part.isMatch" class="faq-highlight" v-text="part.text" />
        <span v-else v-text="part.text" />
      </template>
    </span>
  </span>
</template>

<script>
  export default {
    name: 'TopicLabel',
    props: {
      name: { type: String, required: true },
      // Category of a sub-topic; omitted for a top-level topic.
      parent: { type: String, default: '' },
      // Splits text into { text, isMatch } segments so search hits can be marked.
      highlight: { type: Function, default: (text) => [{ text, isMatch: false }] },
    },
  };
</script>

<style scoped>
  .topic-label {
    display: inline-flex;
    flex-wrap: wrap;
    align-items: center;
  }
  .topic-parent {
    opacity: 0.55;
    margin-right: 4px;
  }
</style>
