import { createVuetify } from 'vuetify';
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg';
import 'vuetify/styles';

export default createVuetify({
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: { mdi },
  },
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        dark: false,
        colors: {
          primary: '#2563EB',
          secondary: '#424242',
          background: '#FFFFFF',
          surface: '#FFFFFF',

          // Custom colors
          icon: '#475569',
          text: '#1E293B',
        },
      },
      dark: {
        dark: true,
        colors: {
          primary: '#1E293B',
          secondary: '#BDBDBD',
          background: '#121212',
          surface: '#1E1E1E',

          // Custom colors
          icon: '#F8FAFC',
          text: '#E2E8F0',
        },
      },
    },
  },
});
