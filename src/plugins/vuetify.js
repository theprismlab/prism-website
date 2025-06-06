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
    'primary': colors.blue.base,
    'primary-darken-1': colors.blue.darken1,
    'primary-darken-2': colors.blue.darken2,
    'primary-darken-3': colors.blue.darken3,
    'primary-darken-4': colors.blue.darken4,
    'primary-lighten-1': colors.blue.lighten1,
    'primary-lighten-2': colors.blue.lighten2,
    'primary-lighten-3': colors.blue.lighten3,
    'primary-lighten-4': colors.blue.lighten4,
    'primary-lighten-5': colors.blue.lighten5,
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

