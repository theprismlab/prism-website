// Plugins
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import Fonts from 'unplugin-fonts/vite';
import Layouts from 'vite-plugin-vue-layouts';
import Vue from '@vitejs/plugin-vue';
import Vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';

// Utilities
import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Layouts(),
    Vue({
      template: { transformAssetUrls },
    }),
    // https://github.com/vuetifyjs/vuetify-loader/tree/master/packages/vite-plugin#readme
    Vuetify({
      autoImport: true,
      styles: {
        configFile: 'src/styles/variables.scss',
      },
    }),
    Components({ dirs: ['src/components', 'src/pages'] }),
    Fonts({
      google: {
        families: [
          {
            name: 'Roboto',
            styles: 'wght@100;300;400;500;700;900',
          },
          {
            name: 'Inter',
            styles: 'wght@100;200;300;400;500;600;700;800;900',
          },
          {
            name: 'Inter Tight',
            styles: 'wght@100;200;300;400;500;600;700;800;900',
          },
          {
            name: 'Archivo Expanded',
            styles: 'wght@400;500;600;700;800;900',
          },
        ],
      },
      custom: {
        families: [],
        // EOT is an IE-only format with no valid preload MIME type; strip it to avoid browser warnings.
        linkFilter: (tags) => tags.filter((tag) => tag.attrs?.type !== 'font/eot'),
      },
    }),
    AutoImport({
      imports: ['vue', 'vue-router'],
      eslintrc: {
        enabled: true,
      },
      vueTemplate: true,
    }),
    {
      name: 'remove-mdi-font-preloads',
      transformIndexHtml(html) {
        return html.replace(/<link rel="preload" as="font"[^>]*materialdesignicons[^>]*>\n?/g, '');
      },
    },
  ],
  define: { 'process.env': {} },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
    extensions: ['.js', '.json', '.jsx', '.mjs', '.ts', '.tsx', '.vue'],
  },
  server: {
    port: 3000,
    proxy: {
      // Proxied same-origin so pdf.js's outline-extraction fetch() never hits
      // assets.clue.io directly — see the comment on PDF_BASE_URL in
      // src/submissions/instructions/pdf-outline.js for why.
      '/pdf-assets': {
        target: 'https://assets.clue.io',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/pdf-assets/, ''),
      },
    },
  },
  css: {
    preprocessorOptions: {
      sass: {
        api: 'modern-compiler',
      },
    },
  },
});
