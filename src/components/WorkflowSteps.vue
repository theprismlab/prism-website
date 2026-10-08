<template>
  <ol
    class="workflow"
    :style="{ '--workflow-color': color, '--workflow-circle': `${circleSize}px` }"
  >
    <li v-for="(step, index) in steps" :key="step.title" class="workflow-step">
      <div class="workflow-marker">
        <div class="workflow-circle">
          <img
            v-if="step.image"
            :src="step.image"
            :alt="step.imageAlt || ''"
            class="workflow-image"
          />
          <v-icon v-else-if="step.icon" :icon="step.icon" :size="circleSize * 0.45" />
          <span v-else class="workflow-number">{{ index + 1 }}</span>
        </div>
        <span v-if="index < steps.length - 1" class="workflow-connector" aria-hidden="true"></span>
      </div>

      <div class="workflow-content">
        <!-- <div v-if="numbered" class="workflow-step-label">Step {{ String(index + 1).padStart(2, '0') }}</div> -->
        <div class="workflow-title">{{ step.title }}</div>
        <div v-if="step.caption" class="workflow-caption">{{ step.caption }}</div>
      </div>
    </li>
  </ol>
</template>

<script>
  /**
   * WorkflowSteps
   *
   * Horizontal step-by-step workflow that stacks vertically on small screens.
   * Each step's circle shows, in order of preference:
   *   - `image`: an image src (e.g. '/images/workflow/pool.svg'), with optional `imageAlt`
   *   - `icon`: an MDI icon name (e.g. 'mdi-dna')
   *   - the step number
   *
   * <workflow-steps :steps="[{ title: 'Pool', caption: '...', image: '/images/pool.svg' }]" />
   */
  export default {
    name: 'WorkflowSteps',
    props: {
      // [{ title, caption?, image?, imageAlt?, icon? }]
      steps: { type: Array, required: true },
      // Accent color for circles, connectors, and step labels
      color: { type: String, default: 'var(--v-primary)' },
      // Circle diameter in px
      circleSize: { type: Number, default: 64 },
      // Show a "Step 01" label above each title
      numbered: { type: Boolean, default: true },
    },
  };
</script>

<style scoped>
  .workflow {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: 1fr;
    gap: 16px;
  }

  .workflow-step {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .workflow-marker {
    position: relative;
    display: flex;
    justify-content: center;
    width: 100%;
  }

  .workflow-circle {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--workflow-circle);
    height: var(--workflow-circle);
    flex-shrink: 0;
    border-radius: 50%;
    border: 2px solid color-mix(in srgb, var(--workflow-color) 40%, white);
    background: color-mix(in srgb, var(--workflow-color) 10%, white);
    color: var(--workflow-color);
    overflow: hidden;
  }

  .workflow-image {
    width: 65%;
    height: 65%;
    object-fit: contain;
  }

  .workflow-number {
    font-size: 1.25rem;
    font-weight: 700;
  }

  /* Spans from this circle to the next, 8px clear of each (next center = 100% + 16px grid gap) */
  .workflow-connector {
    position: absolute;
    top: 50%;
    left: calc(50% + var(--workflow-circle) / 2 + 8px);
    width: calc(100% - var(--workflow-circle));
    height: 2px;
    background: color-mix(in srgb, var(--workflow-color) 30%, white);
  }

  .workflow-content {
    margin-top: 16px;
  }

  .workflow-step-label {
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--workflow-color);
    margin-bottom: 4px;
  }

  .workflow-title {
    font-size: 1.05rem;
    font-weight: 700;
    color: var(--v-grey-darken-4);
    margin-bottom: 4px;
  }

  .workflow-caption {
    font-size: 0.9rem;
    line-height: 1.45;
    color: var(--v-grey-darken-1);
  }

  /* sm and below: stack vertically, connector runs down from each circle */
  @media (max-width: 960px) {
    .workflow {
      grid-auto-flow: row;
      gap: 0;
    }

    .workflow-step {
      flex-direction: row;
      align-items: stretch;
      text-align: left;
      gap: 16px;
    }

    .workflow-marker {
      flex-direction: column;
      align-items: center;
      width: auto;
    }

    .workflow-connector {
      position: static;
      flex: 1;
      width: 2px;
      height: auto;
      min-height: 16px;
      margin: 6px 0;
    }

    .workflow-content {
      margin-top: 0;
      padding: 8px 0 24px;
    }
  }
</style>
