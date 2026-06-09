import { createRouter, createWebHistory } from 'vue-router';
import { setupLayouts } from 'virtual:generated-layouts';

const submissionsMeta = { layout: 'submissions' };

const routes = [
  // ─── Default layout ───────────────────────────────────────────────────────
  { path: '/', component: () => import('@/pages/index.vue') },

  { path: '/about-us/about-prism', component: () => import('@/pages/about-us/about-prism.vue') },
  { path: '/about-us/team', component: () => import('@/pages/about-us/team.vue') },

  { path: '/consortium-screens/assays', component: () => import('@/pages/consortium-screens/assays.vue') },
  { path: '/consortium-screens/cell-line-collection', component: () => import('@/pages/consortium-screens/cell-line-collection.vue') },
  { path: '/consortium-screens/collaborating', component: () => import('@/pages/consortium-screens/collaborating.vue') },
  { path: '/consortium-screens/data-analysis', component: () => import('@/pages/consortium-screens/data-analysis.vue') },
  { path: '/consortium-screens/deliverables', component: () => import('@/pages/consortium-screens/deliverables.vue') },

  { path: '/contact-us', component: () => import('@/pages/contact-us.vue') },
  { path: '/faq', component: () => import('@/pages/faq.vue') },
  { path: '/publications', component: () => import('@/pages/publications.vue') },

  { path: '/hero/hero-central-cluster-2d', component: () => import('@/pages/hero/hero-central-cluster-2d.vue') },
  { path: '/hero/hero-central-cluster-3d', component: () => import('@/pages/hero/hero-central-cluster-3d.vue') },
  { path: '/hero/hero-dynamic-spread', component: () => import('@/pages/hero/hero-dynamic-spread.vue') },
  { path: '/hero/hero-even-spread', component: () => import('@/pages/hero/hero-even-spread.vue') },
  { path: '/hero/hero-heatmap-scatter', component: () => import('@/pages/hero/hero-heatmap-scatter.vue') },
  { path: '/hero/hero-multi-cluster', component: () => import('@/pages/hero/hero-multi-cluster.vue') },

  // ─── Submissions layout ───────────────────────────────────────────────────
  { path: '/submissions', component: () => import('@/pages/submissions/index.vue'), meta: submissionsMeta },
  { path: '/submissions/quote-and-po', component: () => import('@/pages/submissions/quote-and-po.vue'), meta: submissionsMeta },

  { path: '/submissions/instructions', component: () => import('@/pages/submissions/instructions/index.vue'), meta: submissionsMeta },
  { path: '/submissions/instructions/:screen', component: () => import('@/pages/submissions/instructions/[screen]/index.vue'), meta: submissionsMeta },
  { path: '/submissions/instructions/:screen/getting-started', component: () => import('@/pages/submissions/instructions/[screen]/getting-started.vue'), meta: submissionsMeta },
  { path: '/submissions/instructions/:screen/requirements', component: () => import('@/pages/submissions/instructions/[screen]/requirements.vue'), meta: submissionsMeta },

  { path: '/submissions/forms', component: () => import('@/pages/submissions/forms/index.vue'), meta: submissionsMeta },
  { path: '/submissions/forms/:screen', component: () => import('@/pages/submissions/forms/[screen]/index.vue'), meta: submissionsMeta },
  { path: '/submissions/forms/:screen/application', component: () => import('@/pages/submissions/forms/[screen]/application.vue'), meta: submissionsMeta },
  { path: '/submissions/forms/:screen/documents', component: () => import('@/pages/submissions/forms/[screen]/documents.vue'), meta: submissionsMeta },
]

const redirects = [
  { path: '/research/white-papers', redirect: '/publications' },
  { path: '/research/conference-abstracts', redirect: '/publications' },
  { path: '/research/publications', redirect: '/publications' },
]

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
