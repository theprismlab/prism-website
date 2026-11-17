<template>
  <ol class="story-cards">
    <li v-for="(card, i) in cards" :key="card.title" class="story-card">
      <div class="story-card__top">
        <span class="story-card__number">{{ String(i + 1).padStart(2, '0') }}</span>
        <span class="story-card__eyebrow">{{ card.eyebrow }}</span>
      </div>
      <h3 class="story-card__title prism-text-headline-small">{{ card.title }}</h3>
      <p class="story-card__body prism-text-body-medium">{{ card.body }}</p>
      <ul v-if="card.points && card.points.length" class="story-card__points">
        <li v-for="point in card.points" :key="point">{{ point }}</li>
      </ul>
    </li>
  </ol>
</template>

<script>
  /**
   * StoryCards
   *
   * An ordered row of large cards that tells a paper's story left to right:
   * each card has a step number, an eyebrow naming the part, a title, a short
   * body, and an optional list of supporting points.
   *
   */
  import { STORY_CARDS } from './content.js';
  export default {
    name: 'ManuscriptStoryCards',
    data() {
      return {
        cards: STORY_CARDS,
      };
    },
  };
</script>

<style scoped>
  .story-cards {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 16px;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  /* Each card lays its four parts (number row, title, body, points) on the
     parent grid's rows via subgrid, so every row is as tall as the tallest
     card's and the hairline above the points sits at one height across the
     row. Browsers without subgrid fall back to a simple stacked card. */
  .story-card {
    display: grid;
    grid-template-rows: subgrid;
    grid-row: span 4;
    align-content: start;
    padding: 28px 28px 24px;
    border: 1px solid rgba(var(--v-theme-on-surface), 0.1);
    border-radius: var(--prism-radius-lg);
    background: rgb(var(--v-theme-surface));
    box-shadow: 0 1px 2px rgba(16, 24, 40, 0.04);
  }

  /* Step number on a hairline, eyebrow after it: the ordering cue */
  .story-card__top {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;
  }
  .story-card__number {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: rgba(var(--v-theme-primary), 0.1);
    font-size: 0.8125rem;
    font-weight: 700;
    font-variant-numeric: tabular-nums;
    color: rgb(var(--v-theme-primary));
  }
  .story-card__eyebrow {
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: rgba(var(--v-theme-on-surface), 0.6);
  }

  .story-card__title {
    margin: 0 0 10px;
    line-height: 1.2;
    letter-spacing: -0.01em;
    color: rgb(var(--v-theme-on-surface));
  }
  .story-card__body {
    margin: 0;
    color: rgba(var(--v-theme-on-surface), 0.78);
  }

  /* Supporting points follow the body directly, under a hairline */
  .story-card__points {
    margin: 0;
    padding: 20px 0 0;
    border-top: 1px solid rgba(var(--v-theme-on-surface), 0.1);
    list-style: none;
  }
  .story-card__points li {
    position: relative;
    padding: 4px 0 4px 18px;
    font-size: 0.875rem;
    line-height: 1.45;
    color: rgb(var(--v-theme-on-surface));
  }
  .story-card__points li::before {
    content: '';
    position: absolute;
    top: 0.8em;
    left: 2px;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: rgb(var(--v-theme-primary));
  }
  .story-card__body {
    margin-bottom: 20px;
  }

  /* sm and below: stack, number still leads each card */
  @media (max-width: 959.98px) {
    .story-cards {
      grid-template-columns: 1fr;
    }
  }
  @media (max-width: 600px) {
    .story-card {
      padding: 20px 18px 18px;
    }
  }
</style>
