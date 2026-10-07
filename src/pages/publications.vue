<template>
  <page>
    <page-header>
      <template #title>Publications</template>
      <!-- <ul v-if="typeCounts.length" class="publications-counts" aria-label="Publications by type">
        <li v-for="count in typeCounts" :key="count.type" class="publications-counts__item">
          <span class="publications-counts__dot" :style="{ backgroundColor: count.color }" />
          <span class="publications-counts__value">{{ count.total }}</span>
          <span class="publications-counts__label">{{ count.label }}</span>
        </li>
      </ul> -->
    </page-header>

    <!-- Bottom padding is trimmed because the explorer's sticky toolbar
         carries its own top margin. -->
    <page-section width="default" :padding-bottom="6">
      <div class="featured-section__heading">
        <section-overline gradient>Featured</section-overline>
        <span class="featured-section__rule" aria-hidden="true" />
      </div>
      <v-row>
        <v-col v-for="card in featuredCards" :key="card.id" cols="12" md="4">
          <publication-card
            :item="card"
            :type-style="typeStyles[card.type]"
            :links="getLinks(card)"
            featured
          />
        </v-col>
      </v-row>
    </page-section>

    <publications-explorer :items="data" :type-styles="typeStyles" :get-links="getLinks" />
  </page>
</template>

<script>
  import * as d3 from 'd3';
  import PublicationCard from '@/components/PublicationCard.vue';
  import PublicationsExplorer from '@/components/PublicationsExplorer.vue';

  const dataPath = import.meta.env.BASE_URL + 'data/';
  const whitepaperDateFormatter = new Intl.DateTimeFormat(undefined, {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  function parseDateValue(dateValue) {
    if (!dateValue) return null;

    const raw = String(dateValue).trim();
    const direct = new Date(raw);
    if (!Number.isNaN(direct.getTime())) return direct;

    const mdyMatch = raw.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{2,4})$/);
    if (!mdyMatch) return null;

    const month = Number(mdyMatch[1]) - 1;
    const day = Number(mdyMatch[2]);
    const yearPart = Number(mdyMatch[3]);
    const year = yearPart < 100 ? 2000 + yearPart : yearPart;
    const parsed = new Date(year, month, day);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
  }

  function formatWhitepaperDate(dateValue) {
    const parsed = parseDateValue(dateValue);
    return parsed ? whitepaperDateFormatter.format(parsed) : dateValue;
  }

  function getYearFromDate(dateValue) {
    const parsed = parseDateValue(dateValue);
    return parsed ? String(parsed.getFullYear()) : '';
  }

  // Single source of truth for per-type customization.
  // To add a new type: add a new entry here. No other code changes required.
  // `links` lists all possible link fields for the type, in display order.
  // The first entry is treated as the primary link (no left icon by convention).
  const TYPE_CONFIG = {
    Publication: {
      order: 1,
      icon: 'mdi-file-document-outline',
      color: '#3f51b5',
      file: 'Website Content - 2025  - Publications.csv',
      idPrefix: 'publication',
      pluralLabel: 'Publications',
      links: [{ field: 'link', label: 'Read Publication' }],
      parseRow: (d) => ({
        year: d.Year,
        link: d.Link,
        publisher: d.Publisher,
        author: d.Author,
      }),
    },
    'White Paper': {
      order: 3,
      icon: 'mdi-book-outline',
      color: '#8e24aa',
      file: 'Website Content - 2025  - White Papers.csv',
      idPrefix: 'white-paper',
      pluralLabel: 'White papers',
      links: [
        { field: 'link', label: 'Read White Paper' },
        { field: 'portalLink', label: 'Explore Data', icon: 'mdi-chart-box-outline' },
      ],
      parseRow: (d) => ({
        link: d['Paper Link'],
        portalLink: d['Portal Link'],
        date: formatWhitepaperDate(d.Date),
        tag: d.Tag,
        year: getYearFromDate(d.Date),
        publisher: 'PRISM White Papers',
        author: d.Author,
      }),
    },
    Conference: {
      order: 2,
      icon: 'mdi-presentation',
      color: '#009688',
      file: 'Website Content - 2025  - Conference Abstracts.csv',
      idPrefix: 'conference',
      pluralLabel: 'Conference abstracts',
      links: [
        { field: 'link', label: 'Read Abstract' },
        { field: 'posterLink', label: 'View Poster', icon: 'mdi-eye-outline' },
        { field: 'presentationLink', label: 'View Presentation', icon: 'mdi-video-outline' },
      ],
      parseRow: (d) => ({
        year: d.Year,
        link: d.Link,
        posterLink: d['Poster Link'],
        presentationLink: d['Presentation Link'],
        publisher: d.Conference,
        author: d.Author != '' ? d.Author : 'N/A',
      }),
    },
  };

  export default {
    components: {
      PublicationCard,
      PublicationsExplorer,
    },
    data() {
      return {
        data: [],
      };
    },
    computed: {
      featuredCards() {
        // Sort featured cards by the 'order' property from TYPE_CONFIG
        return this.data
          .filter((d) => d.featured == 1)
          .sort((a, b) => {
            const orderA = TYPE_CONFIG[a.type]?.order || 99;
            const orderB = TYPE_CONFIG[b.type]?.order || 99;
            return orderA - orderB;
          });
      },
      typeCounts() {
        return Object.entries(TYPE_CONFIG)
          .sort(([, a], [, b]) => a.order - b.order)
          .map(([type, cfg]) => ({
            type,
            color: cfg.color,
            label: cfg.pluralLabel || type,
            total: this.data.filter((d) => d.type === type).length,
          }))
          .filter((c) => c.total > 0);
      },
      typeStyles() {
        return Object.fromEntries(
          Object.entries(TYPE_CONFIG).map(([type, cfg]) => [
            type,
            { icon: cfg.icon, bg: cfg.color, fg: '#ffffff', border: cfg.color },
          ]),
        );
      },
    },
    async created() {
      this.data = (await this.getData()).sort((a, b) => a.order - b.order);
    },
    methods: {
      async getData() {
        const loaders = Object.entries(TYPE_CONFIG).map(([type, cfg]) => {
          const url = `${dataPath}${cfg.file}`;

          return d3
            .csv(url, (d, i) => {
              return {
                title: d.Title,
                type,
                id: `${cfg.idPrefix}-${i}`,
                featured: d.Featured,
                ...cfg.parseRow(d),
              };
            })
            .catch((err) => {
              console.error(`[publications] failed to load ${type} CSV (${url}):`, err);
              return [];
            });
        });
        const groups = await Promise.all(loaders);
        return groups.flat().sort((a, b) => +b.year - +a.year);
      },
      getLinks(item) {
        const cfg = TYPE_CONFIG[item?.type];
        if (!cfg?.links) return [];
        return cfg.links.map((l) => ({ ...l, href: item[l.field] })).filter((l) => l.href);
      },
    },
  };
</script>

<style scoped>
  .publications-lead {
    max-width: 640px;
    color: rgba(30, 34, 48, 0.78);
    margin-bottom: 1.5rem;
  }

  /* ---------- Header: count-by-type row ---------- */
  .publications-counts {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem 2rem;
    padding: 0;
    margin: 0;
  }

  .publications-counts__item {
    display: inline-flex;
    align-items: baseline;
    gap: 0.5rem;
    margin: 0;
    padding: 0;
  }

  .publications-counts__dot {
    align-self: center;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .publications-counts__value {
    font-size: 1.05rem;
    font-weight: 600;
    letter-spacing: -0.01em;
    color: rgb(30, 34, 48);
    font-variant-numeric: tabular-nums;
  }

  .publications-counts__label {
    font-size: 0.8rem;
    font-weight: 500;
    letter-spacing: 0.02em;
    color: rgba(30, 34, 48, 0.62);
  }

  /* ---------- Featured section ---------- */
  .featured-section__heading {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.25rem;
  }

  .featured-section__rule {
    flex: 1;
    height: 1px;
    background: rgba(30, 34, 48, 0.1);
  }
</style>
