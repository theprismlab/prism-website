import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';
import '@/styles/variables.scss';
import '@/styles/main.scss';

import { createVuetify } from 'vuetify';
import { prismTheme } from '@/lib/prism';

export default createVuetify({
  theme: {
    defaultTheme: 'light',
    themes: {
      light: prismTheme,
    },
  },
});
