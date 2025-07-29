/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import '@/styles/variables.scss'
import '@/styles/main.scss'

// Composables
import { createVuetify } from 'vuetify'
import colors  from 'vuetify/util/colors'

let secondary = 'amber';
let primary = 'blue';
function mixColors(color1, color2, ratio) {
  const r1 = parseInt(color1.slice(1, 3), 16);
  const g1 = parseInt(color1.slice(3, 5), 16);
  const b1 = parseInt(color1.slice(5, 7), 16);

  const r2 = parseInt(color2.slice(1, 3), 16);
  const g2 = parseInt(color2.slice(3, 5), 16);
  const b2 = parseInt(color2.slice(5, 7), 16);

  const rMix = Math.round(r1 * (1 - ratio) + r2 * ratio);
  const gMix = Math.round(g1 * (1 - ratio) + g2 * ratio);
  const bMix = Math.round(b1 * (1 - ratio) + b2 * ratio);

  return `#${((1 << 24) + (rMix << 16) + (gMix << 8) + bMix).toString(16).slice(1).toUpperCase()}`;
}
function lightenColor(color, amount) {
  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);

  const rLightened = Math.min(255, Math.round(r + (255 - r) * amount));
  const gLightened = Math.min(255, Math.round(g + (255 - g) * amount));
  const bLightened = Math.min(255, Math.round(b + (255 - b) * amount));

  return `#${((1 << 24) + (rLightened << 16) + (gLightened << 8) + bLightened).toString(16).slice(1).toUpperCase()}`;
}
function darkenColor(color, amount) {
  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);

  const rDarkened = Math.max(0, Math.round(r - r * amount));
  const gDarkened = Math.max(0, Math.round(g - g * amount));
  const bDarkened = Math.max(0, Math.round(b - b * amount));

  return `#${((1 << 24) + (rDarkened << 16) + (gDarkened << 8) + bDarkened).toString(16).slice(1).toUpperCase()}`;
}
let primaryLighten6 = lightenColor(colors.blue.lighten5, 0.2);
let primaryLighten7 = lightenColor(colors.blue.lighten5, 0.4);

const prismTheme = {
  dark: false,
  colors: {
    'background': '#FFFFFF',
    'surface': '#FFFFFF',
    'surface-bright': '#FFFFFF',
    'surface-light': '#EEEEEE',
    'surface-variant': '#424242',
    'on-surface-variant': '#EEEEEE',
    // 'primary': '#0E7AFF',
    // 'primary': colors.blue.accent3,
    // 'primary': colors.blue.base,
    //'primary-base': colors.blue.accent3,
    'primary-base': mixColors(colors.blue.accent3, colors.blue.base, 0.2), // testing
    'primary-darken-1': colors.blue.darken1,
    'primary-darken-2': colors.blue.darken2,
    'primary-darken-3': colors.blue.darken3,
    'primary-darken-4': colors.blue.darken4,
    'primary-darken-5': darkenColor(colors.blue.darken4, 0.2),
    'primary-darken-6': darkenColor(colors.blue.darken4, 0.4),
    'primary-lighten-1': colors.blue.lighten1,
    'primary-lighten-2': colors.blue.lighten2,
    'primary-lighten-3': colors.blue.lighten3,
    'primary-lighten-4': colors.blue.lighten4,
    'primary-lighten-5': colors.blue.lighten5,
    'primary-lighten-6': lightenColor(colors.blue.lighten5, 0.2), // custom lightened color
    'primary-lighten-7': lightenColor(colors.blue.lighten5, 0.4), // custom lightened color
    'primary-accent-1': colors.blue.accent1,
    'primary-accent-2': colors.blue.accent2,
    'primary-accent-3': colors.blue.accent3,

    'secondary': colors[secondary].base,
    'secondary-lighten-1': colors[secondary].lighten1,
    'secondary-lighten-2': colors[secondary].lighten2,
    'secondary-lighten-3': colors[secondary].lighten3,
    'secondary-lighten-4': colors[secondary].lighten4,
    'secondary-lighten-5': colors[secondary].lighten5,
    'secondary-darken-1': colors[secondary].darken1,
    'secondary-darken-2': colors[secondary].darken2,
    'secondary-darken-3': colors[secondary].darken3,
    'secondary-darken-4': colors[secondary].darken4,
    'secondary-accent-1': colors[secondary].accent1,
    'secondary-accent-2': colors[secondary].accent2,
    'secondary-accent-3': colors[secondary].accent3,  
    'secondary-accent-4': colors[secondary].accent4,
    'error': colors.deepOrange.accent3,
    'info': '#2196F3',
    'success': colors.teal.accent3,
    'success-accent-1': colors.teal.accent1,
    'success-accent-2': colors.teal.accent2,
    'success-accent-3': colors.teal.accent3,
    'success-accent-4': colors.teal.accent4,
    'grey-lighten-1': colors.grey.lighten1,
    'grey-lighten-2': colors.grey.lighten2,
    'grey-lighten-3': colors.grey.lighten3,
    'grey-lighten-4': colors.grey.lighten4,
    'grey-lighten-5': colors.grey.lighten5,
    'grey': colors.grey.base,
    'grey-darken-1': colors.grey.darken1,
    'grey-darken-2': colors.grey.darken2,
    'grey-darken-3': colors.grey.darken3,
    'warning': '#FB8C00',
    'teal-bkg': '#d5dde0',
    'red': colors.red.base,
    'red-lighten-1': colors.red.lighten1,
    'red-lighten-2': colors.red.lighten2,
    'red-lighten-3': colors.red.lighten3,
    'red-darken-1': colors.red.darken1,
    'red-darken-2': colors.red.darken2,
    'red-darken-3': colors.red.darken3,
    'red-accent-1': colors.red.accent1,
    'red-accent-2': colors.red.accent2,
    'red-accent-3': colors.red.accent3,
    "teal-cyan-accent-4": mixColors(colors.teal.accent4,  colors.cyan.accent4, 0.5),
    "teal-cyan-accent-3": mixColors(colors.teal.accent3,  colors.cyan.accent3, 0.5),
    "teal-cyan-accent-2": mixColors(colors.teal.accent2,  colors.cyan.accent2, 0.5),
    "teal-cyan-accent-1": mixColors(colors.teal.accent1,  colors.cyan.accent1, 0.5),
    'teal-cyan-darken-1': mixColors(colors.teal.darken1,  colors.cyan.darken1, 0.7), // in use
    'teal-cyan-lighten-1': mixColors(colors.teal.lighten1,  colors.cyan.lighten1, 0.7), 
    'teal-cyan-lighten-2': mixColors(colors.teal.lighten2,  colors.cyan.lighten2, 0.7),
    'teal-cyan-lighten-3': mixColors(colors.teal.lighten3,  colors.cyan.lighten3, 0.7),
    'teal-cyan-lighten-4': mixColors(colors.teal.lighten4,  colors.cyan.lighten4, 0.7), // in use
    'cyan': colors.cyan.base,
    'cyan-lighten-1': colors.cyan.lighten1,
    'cyan-lighten-2': colors.cyan.lighten2,
    'cyan-lighten-3': colors.cyan.lighten3,
    'cyan-lighten-4': colors.cyan.lighten4,
    'cyan-darken-1': colors.cyan.darken1,
    'cyan-darken-2': colors.cyan.darken2,
    'cyan-darken-3': colors.cyan.darken3,
    'cyan-accent-1': colors.cyan.accent1,
    'cyan-accent-2': colors.cyan.accent2,
    'cyan-accent-3': colors.cyan.accent3,
    'cyan-accent-4': colors.cyan.accent4,
    'teal': colors.teal.base,
    'teal-lighten-1': colors.teal.lighten1,
    'teal-lighten-2': colors.teal.lighten2,
    'teal-lighten-3': colors.teal.lighten3,
    'teal-darken-1': colors.teal.darken1,
    'teal-darken-2': colors.teal.darken2,
    'teal-darken-3': colors.teal.darken3,
    'teal-accent-1': colors.teal.accent1,
    'teal-accent-2': colors.teal.accent2,
    'teal-accent-3': colors.teal.accent3,
    'teal-accent-4': colors.teal.accent4,
    'purple': colors.purple.base,
    'purple-lighten-1': colors.purple.lighten1,
    'purple-lighten-2': colors.purple.lighten2,
    'purple-lighten-3': colors.purple.lighten3,
    'purple-darken-1': colors.purple.darken1,
    'purple-darken-2': colors.purple.darken2,
    'purple-darken-3': colors.purple.darken3,
    'purple-accent-1': colors.purple.accent1,
    'purple-accent-2': colors.purple.accent2,
    'purple-accent-3': colors.purple.accent3,
    'purple-accent-4': colors.purple.accent4,
    'blue-base': colors.blue.base,
    'blue-lighten-1': colors.blue.lighten1,
    'blue-lighten-2': colors.blue.lighten2,
    'blue-lighten-3': colors.blue.lighten3,
    'blue-lighten-4': colors.blue.lighten4,
    'blue-lighten-5': colors.blue.lighten5,
    'blue-lighten-6': lightenColor(colors.blue.lighten5, 0.2), // custom lightened color
    'blue-lighten-7': lightenColor(colors.blue.lighten5, 0.4), // custom lightened color
   
    'blue-darken-1': colors.blue.darken1,    
    'blue-darken-2': colors.blue.darken2,
    'blue-darken-3': colors.blue.darken3,
    'blue-accent-1': colors.blue.accent1,
    'blue-accent-2': colors.blue.accent2,
    'blue-accent-3': colors.blue.accent3,
    'blue-accent-4': colors.blue.accent4,
    'blue-grey': colors.blueGrey.base,
    'blue-grey-lighten-1': colors.blueGrey.lighten1,
    'blue-grey-lighten-2': colors.blueGrey.lighten2,
    'blue-grey-lighten-3': colors.blueGrey.lighten3,
    'blue-grey-darken-1': colors.blueGrey.darken1,
    'blue-grey-darken-2': colors.blueGrey.darken2,
    'blue-grey-darken-3': colors.blueGrey.darken3,
    'indigo': colors.indigo.base,
    'indigo-lighten-1': colors.indigo.lighten1,
    'indigo-lighten-2': colors.indigo.lighten2,
    'indigo-lighten-3': colors.indigo.lighten3,
    'indigo-darken-1': colors.indigo.darken1,
    'indigo-darken-2': colors.indigo.darken2,
    'indigo-darken-3': colors.indigo.darken3,
    'indigo-accent-1': colors.indigo.accent1,
    'indigo-accent-2': colors.indigo.accent2,
    'indigo-accent-3': colors.indigo.accent3,
    'indigo-accent-4': colors.indigo.accent4,
    'primary-desaturated': mixColors(colors[primary].base, colors.grey.base, 0.5),
    'primary-accent-1-desaturated': mixColors(colors[primary].accent1, colors.grey.base, 0.5),
    'primary-accent-2-desaturated': mixColors(colors[primary].accent2, colors.grey.base, 0.5),
    'primary-accent-3-desaturated': mixColors(colors[primary].accent3, colors.grey.base, 0.5),
    'primary-accent-4-desaturated': mixColors(colors[primary].accent4, colors.grey.base, 0.5),
    'primary-darken-1-desaturated': mixColors(colors[primary].darken1, colors.grey.darken1, 0.5),
    'primary-darken-2-desaturated': mixColors(colors[primary].darken2, colors.grey.darken2, 0.5),
    'primary-darken-3-desaturated': mixColors(colors[primary].darken3, colors.grey.darken3, 0.75),
    'primary-darken-4-desaturated': mixColors(colors[primary].darken4, colors.grey.darken4, 0.7),
    'primary-darken-5-desaturated': mixColors(darkenColor(colors[primary].darken4, 0.2), colors.grey.darken4, 0.75),
     'primary-darken-6-desaturated': mixColors(darkenColor(colors[primary].darken4, 0.5), colors.grey.darken4, 0.75),
 'primary-lighten-6-desaturated': mixColors(primaryLighten6, colors.grey.lighten5, 0.5),
 'primary-lighten-7-desaturated': mixColors(primaryLighten7, colors.grey.lighten5, 0.5),

    //'primary-darken-6-desaturated': mixColors(colors[primary].darken4, colors.grey.darken4, 0.75),
  },
  variables: {
    // 'y-spacer': 48,
    'border-color': '#000000',
    'border-opacity': 0.12,
    'high-emphasis-opacity': 0.87,
    'medium-emphasis-opacity': 0.60,
    'disabled-opacity': 0.38,
    'idle-opacity': 0.04,
    'hover-opacity': 0.04,
    'focus-opacity': 0.12,
    'selected-opacity': 0.08,
    'activated-opacity': 0.12,
    'pressed-opacity': 0.12,
    'dragged-opacity': 0.08,
    'theme-kbd': '#212529',
    'theme-on-kbd': '#FFFFFF',
    'theme-code': '#F5F5F5',
    'theme-on-code': '#000000',
  }
}




// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  options: {
    customProperties: true,
  },
  // theme: {
  //   defaultTheme: 'light',
  //   themes: {
  //     light: {
  //       primary: '#0E7AFF',
  //       secondary: '#b0bec5',
  //       grey: "#999999",
  //       accent:"#FFA427",   
  //       error: '#FF5252',
  //       info: '#2196F3',
  //       success: '#4CAF50',
  //       warning: '#FFC107',
  //     }
  //   }
  // },
  theme: {
    defaultTheme: 'prismTheme',
    themes: {
      prismTheme,
    },
  },
})

