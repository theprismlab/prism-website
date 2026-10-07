import { createRouter, createWebHistory } from 'vue-router';
import { setupLayouts } from 'virtual:generated-layouts';

const submissionsLayout = 'submissions';

const routes = [
  // ─── Default layout ───────────────────────────────────────────────────────
  { path: '/', component: () => import('@/pages/index.vue') },

  {
    path: '/about-us/about-prism',
    component: () => import('@/pages/about-us/about-prism.vue'),
  },
  {
    path: '/about-us/team',
    component: () => import('@/pages/about-us/team.vue'),
  },

  {
    path: '/consortium-screens/assays',
    component: () => import('@/pages/consortium-screens/assays.vue'),
    meta: {
      breadcrumbs: () => [{ title: 'Consortium Screens' }, { title: 'Assays' }],
    },
  },
  {
    path: '/consortium-screens/cell-line-collection',
    component: () => import('@/pages/consortium-screens/cell-line-collection.vue'),
    meta: {
      breadcrumbs: () => [{ title: 'Consortium Screens' }, { title: 'Cell Line Collection' }],
    },
  },
  {
    path: '/consortium-screens/collaborating',
    component: () => import('@/pages/consortium-screens/collaborating.vue'),
    meta: {
      breadcrumbs: () => [{ title: 'Consortium Screens' }, { title: 'Collaborating' }],
    },
  },
  {
    path: '/consortium-screens/data-analysis',
    component: () => import('@/pages/consortium-screens/data-analysis.vue'),
    meta: {
      breadcrumbs: () => [{ title: 'Consortium Screens' }, { title: 'Data Analysis' }],
    },
  },
  {
    path: '/consortium-screens/deliverables',
    component: () => import('@/pages/consortium-screens/deliverables.vue'),
    meta: {
      breadcrumbs: () => [{ title: 'Consortium Screens' }, { title: 'Deliverables' }],
    },
  },

  { path: '/contact-us', component: () => import('@/pages/contact-us.vue') },
  {
    path: '/faq',
    component: () => import('@/pages/faq.vue'),
  },
  {
    path: '/webinars',
    component: () => import('@/pages/webinars.vue'),
  },
  {
    path: '/publications',
    component: () => import('@/pages/publications.vue'),
  },
  {
    path: '/oncology-reference/nominations',
    component: () => import('@/pages/oncology-reference/nominations.vue'),
    meta: {
      breadcrumbs: () => [{ title: 'Oncology Reference' }, { title: 'Nominations' }],
    },
  },

  // ─── Submissions layout ───────────────────────────────────────────────────
  {
    path: '/submission-hub/overview',
    component: () => import('@/submissions/index.vue'),
    meta: {
      layout: submissionsLayout,
      breadcrumbs: () => [{ title: 'Submissions' }],
    },
  },
  {
    path: '/submission-hub/quote-and-po',
    component: () => import('@/submissions/quote-and-po.vue'),
    meta: {
      layout: submissionsLayout,
      breadcrumbs: () => [
        { title: 'Submissions', to: '/submission-hub' },
        { title: 'View Quote & Upload PO' },
      ],
    },
  },

  {
    path: '/submission-hub/instructions',
    component: () => import('@/submissions/instructions/index.vue'),
    meta: {
      layout: submissionsLayout,
      breadcrumbs: () => [
        { title: 'Submissions', to: '/submission-hub' },
        { title: 'Instructions' },
      ],
    },
  },
  {
    path: '/submission-hub/instructions/:screenType',
    redirect: (to) => `/submission-hub/instructions/${to.params.screenType}/test-agent`,
  },
  {
    path: '/submission-hub/instructions/:screenType/test-agent',
    component: () => import('@/submissions/instructions/test-agent.vue'),
    meta: {
      layout: submissionsLayout,
      breadcrumbs: (route) => [
        { title: 'Submissions', to: '/submission-hub' },
        { title: 'Instructions', to: '/submission-hub/instructions' },
        { title: `${route.params.screenType} — Test Agent` },
      ],
    },
  },
  {
    path: '/submission-hub/instructions/:screenType/shipping',
    component: () => import('@/submissions/instructions/shipping.vue'),
    meta: {
      layout: submissionsLayout,
      breadcrumbs: (route) => [
        { title: 'Submissions', to: '/submission-hub' },
        { title: 'Instructions', to: '/submission-hub/instructions' },
        { title: `${route.params.screenType} — Shipping` },
      ],
    },
  },

  {
    path: '/submission-hub/forms',
    component: () => import('@/submissions/forms/index.vue'),
    meta: {
      layout: submissionsLayout,
      breadcrumbs: () => [{ title: 'Submissions', to: '/submission-hub' }, { title: 'Forms' }],
    },
  },
  {
    path: '/submission-hub/forms/:screenType/:screen',
    component: () => import('@/submissions/forms/screen-type.vue'),
    meta: {
      layout: submissionsLayout,
      breadcrumbs: (route) => [
        { title: 'Submissions', to: '/submission-hub' },
        { title: 'Forms', to: '/submission-hub/forms' },
        { title: route.params.screenType },
      ],
    },
  },
];

const redirects = [
  { path: '/submissions', redirect: '/submission-hub/overview' },
  {
    path: '/submissions/:pathMatch(.*)*',
    redirect: (to) => `/submission-hub/${[].concat(to.params.pathMatch).join('/')}`,
  },
  { path: '/submission-hub', redirect: '/submission-hub/overview' },
  { path: '/research/white-papers', redirect: '/publications' },
  { path: '/research/conference-abstracts', redirect: '/publications' },
  { path: '/research/publications', redirect: '/publications' },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior() {
    return { top: 0 };
  },
  routes: [...setupLayouts(routes), ...redirects],
});

router.afterEach(() => {
  // HubSpot tracking (production only)
  if (import.meta.env.PROD && typeof window._hsq !== 'undefined' && window._hsq) {
    window._hsq.push(['setPath', window.location.pathname]);
    window._hsq.push(['trackPageView']);
  }
});

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      console.log('Reloading page to fix dynamic import error');
      localStorage.setItem('vuetify:dynamic-reload', 'true');
      location.assign(to.fullPath);
    } else {
      console.error('Dynamic import error, reloading page did not fix it', err);
    }
  } else {
    console.error(err);
  }
});

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload');
});

export default router;
