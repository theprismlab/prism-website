/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins';
import Prism from './lib/prism.js';
import './lib/prism.css';

// Components
import App from './App.vue';

// Composables
import { createApp } from 'vue';

const app = createApp(App);
app.use(Prism);
registerPlugins(app);

app.mount('#app');
