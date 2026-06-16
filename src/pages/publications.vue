<template>
  <page id="publication-page">
    <app-container>
      <prism-page-title>Publications</prism-page-title>
    </app-container>

    <app-container wide>
      <h2 class="text-overline">Featured</h2>
      <v-row justify="center" class="mb-12">
        <v-col v-for="card in featuredCards" :key="card.id" cols="12" md="4">
          <publication-card
            :item="card"
            :type-style="typeStyles[card.type]"
            :links="getLinks(card)"
            featured
          />
        </v-col>
      </v-row>
    </app-container>

    <publications-explorer :items="data" :type-styles="typeStyles" :get-links="getLinks" />
  </page>
</template>

<script>
  import * as d3 from 'd3';
  import PublicationCard from '@/components/PublicationCard.vue';
  import PublicationsExplorer from '@/components/PublicationsExplorer.vue';

  const dataPath = import.meta.env.PROD ? import.meta.env.BASE_URL + 'data/' : '../public/data/';
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
        const loaders = Object.entries(TYPE_CONFIG).map(([type, cfg]) =>
          d3.csv(`${dataPath}${cfg.file}`, (d, i) => ({
            title: d.Title,
            type,
            id: `${cfg.idPrefix}-${i}`,
            featured: d.Featured,
            ...cfg.parseRow(d),
          })),
        );
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
  .publication-title {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 500;
    color: rgb(23, 23, 23) !important;
  }
</style>
