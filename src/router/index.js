import { createRouter, createWebHistory } from 'vue-router';
import { setupLayouts } from 'virtual:generated-layouts';

const submissionsLayout = 'submissions';

const routes = [
  // ─── Default layout ───────────────────────────────────────────────────────
  { path: '/', component: () => import('@/pages/index.vue') },

  {
    path: '/about-us/about-prism',
    component: () => import('@/pages/about-us/about-prism.vue'),
    meta: {
      breadcrumbs: () => [
        { title: 'About Us', disabled: true },
        { title: 'About PRISM', disabled: true },
      ],
    },
  },
  {
    path: '/about-us/team',
    component: () => import('@/pages/about-us/team.vue'),
    meta: {
      breadcrumbs: () => [
        { title: 'About Us', disabled: true },
        { title: 'Team', disabled: true },
      ],
    },
  },

  {
    path: '/consortium-screens/assays',
    component: () => import('@/pages/consortium-screens/assays.vue'),
    meta: {
      breadcrumbs: () => [
        { title: 'Consortium Screens', disabled: true },
        { title: 'Assays', disabled: true },
      ],
    },
  },
  // {
  //   path: '/consortium-screens/assays2',
  //   component: () => import('@/pages/consortium-screens/assays2.vue'),
  // },
  {
    path: '/consortium-screens/cell-line-collection',
    component: () => import('@/pages/consortium-screens/cell-line-collection.vue'),
    meta: {
      breadcrumbs: () => [
        { title: 'Consortium Screens', disabled: true },
        { title: 'Cell Line Collection', disabled: true },
      ],
    },
  },
  {
    path: '/consortium-screens/cell-line-explorer',
    component: () => import('@/pages/consortium-screens/cell-line-explorer/index.vue'),
  },
  {
    path: '/consortium-screens/collaborating',
    component: () => import('@/pages/consortium-screens/collaborating.vue'),
    meta: {
      breadcrumbs: () => [
        { title: 'Consortium Screens', disabled: true },
        { title: 'Collaborating', disabled: true },
      ],
    },
  },
  {
    path: '/consortium-screens/data-analysis',
    component: () => import('@/pages/consortium-screens/data-analysis.vue'),
    meta: {
      breadcrumbs: () => [
        { title: 'Consortium Screens', disabled: true },
        { title: 'Data Analysis', disabled: true },
      ],
    },
  },
  {
    path: '/consortium-screens/deliverables',
    component: () => import('@/pages/consortium-screens/deliverables.vue'),
    meta: {
      breadcrumbs: () => [
        { title: 'Consortium Screens', disabled: true },
        { title: 'Deliverables', disabled: true },
      ],
    },
  },

  { path: '/contact-us', component: () => import('@/pages/contact-us.vue') },

  // {
  //   path: '/faq',
  //   component: () => import('@/pages/faq.vue'),
  //   meta: {
  //     breadcrumbs: () => [
  //       { title: 'Resources', disabled: true },
  //       { title: 'FAQ', disabled: true },
  //     ],
  //   },
  // },
  {
    path: '/webinars',
    component: () => import('@/pages/webinars.vue'),
    meta: {
      breadcrumbs: () => [
        { title: 'Resources', disabled: true },
        { title: 'Webinars', disabled: true },
      ],
    },
  },
  {
    path: '/publications',
    component: () => import('@/pages/publications.vue'),
    meta: {
      breadcrumbs: () => [
        { title: 'Resources', disabled: true },
        { title: 'Publications', disabled: true },
      ],
    },
  },

  // ─── Submissions layout ───────────────────────────────────────────────────
  {
    path: '/submission-hub/overview',
    component: () => import('@/submissions/index.vue'),
    meta: {
      layout: submissionsLayout,
      breadcrumbs: () => [{ title: 'Submissions', disabled: true }],
    },
  },
  {
    path: '/submission-hub/quote-and-po',
    component: () => import('@/submissions/quote-and-po.vue'),
    meta: {
      layout: submissionsLayout,
      breadcrumbs: () => [
        { title: 'Submissions', to: '/submission-hub', disabled: true },
        { title: 'View Quote & Upload PO', disabled: true },
      ],
    },
  },

  {
    path: '/submission-hub/instructions',
    component: () => import('@/submissions/instructions/index.vue'),
    meta: {
      layout: submissionsLayout,
      breadcrumbs: () => [
        { title: 'Submissions', to: '/submission-hub', disabled: true },
        { title: 'Instructions', disabled: true },
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
        { title: 'Submissions', to: '/submission-hub', disabled: true },
        { title: 'Instructions', to: '/submission-hub/instructions', disabled: true },
        { title: `${route.params.screenType} — Test Agent`, disabled: true },
      ],
    },
  },
  {
    path: '/submission-hub/instructions/:screenType/shipping',
    component: () => import('@/submissions/instructions/shipping.vue'),
    meta: {
      layout: submissionsLayout,
      breadcrumbs: (route) => [
        { title: 'Submissions', to: '/submission-hub', disabled: true },
        { title: 'Instructions', to: '/submission-hub/instructions', disabled: true },
        { title: `${route.params.screenType} — Shipping`, disabled: true },
      ],
    },
  },

  {
    path: '/submission-hub/forms',
    component: () => import('@/submissions/forms/index.vue'),
    meta: {
      layout: submissionsLayout,
      breadcrumbs: () => [
        { title: 'Submissions', to: '/submission-hub', disabled: true },
        { title: 'Forms', disabled: true },
      ],
    },
  },
  {
    path: '/submission-hub/forms/:screenType/:screen',
    component: () => import('@/submissions/forms/screen-type.vue'),
    meta: {
      layout: submissionsLayout,
      breadcrumbs: (route) => [
        { title: 'Submissions', to: '/submission-hub', disabled: true },
        { title: 'Forms', to: '/submission-hub/forms', disabled: true },
        { title: route.params.screenType, disabled: true },
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
