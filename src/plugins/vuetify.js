import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';
import '@/styles/variables.scss';
import '@/styles/main.scss';

import { createVuetify } from 'vuetify';
import colors from 'vuetify/util/colors';
import cssRaw from '@/lib/prism.css?raw';

function cssVar(name) {
  const match = cssRaw.match(new RegExp(`${name}:\\s*([^;]+)`));
  return match?.[1].trim() ?? null;
}

export default createVuetify({
  theme: {
    defaultTheme: 'prismTheme',
    themes: {
      prismTheme: {
        dark: false,
        colors: {
          // Semantic colors from prism.css
          primary:   cssVar('--prism-color-primary'),
          secondary: cssVar('--prism-color-orange-500'),
          error:     cssVar('--prism-color-red-500'),
          success:   cssVar('--prism-color-green-500'),
          warning:   cssVar('--prism-color-amber-700'),
          info:      cssVar('--prism-color-primary'),

          // Full Vuetify palette
          red:        colors.red.base,
          pink:       colors.pink.base,
          purple:     colors.purple.base,
          indigo:     colors.indigo.base,
          blue:       colors.blue.base,
          'light-blue': colors.lightBlue.base,
          cyan:       colors.cyan.base,
          teal:       colors.teal.base,
          green:      colors.green.base,
          'light-green': colors.lightGreen.base,
          lime:       colors.lime.base,
          yellow:     colors.yellow.base,
          amber:      colors.amber.base,
          orange:     colors.orange.base,
          'deep-orange': colors.deepOrange.base,
          brown:      colors.brown.base,
          grey:       colors.grey.base,
          'blue-grey': colors.blueGrey.base,
        },
      },
    },
  },
});
