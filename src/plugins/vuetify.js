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


const prismTheme = {
  dark: false,
  colors: {
    'background': '#FFFFFF',
    'surface': '#FFFFFF',
    'surface-bright': '#FFFFFF',
    'surface-light': '#EEEEEE',
    'surface-variant': '#424242',
    'on-surface-variant': '#EEEEEE',
    'primary': '#0E7AFF',
    'primary-darken-1': '#1F5592',
    'secondary': 'orange',
    'secondary-darken-1': '#018786',
    'error': '#B00020',
    'info': '#2196F3',
    'success': '#4CAF50',
    'warning': '#FB8C00',
  },
  variables: {
    'y-spacer': 48,
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

