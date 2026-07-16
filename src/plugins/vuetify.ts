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
      // ==========================
      // LIGHT (Dark UI)
      // ==========================
      light: {
        dark: false,
        colors: {
          /* Brand */
          primary: '#3B82F6',
          secondary: '#94A3B8',
          success: '#22C55E',
          warning: '#FBBF24',
          error: '#F87171',
          info: '#38BDF8',

          /* Layout */
          background: '#0F172A',
          surface: '#1E293B',
          surfaceVariant: '#334155',

          /* Text */
          text: '#E2E8F0',
          heading: '#F8FAFC',
          paragraph: '#CBD5E1',
          muted: '#94A3B8',

          /* Card */
          card: '#1E293B',
          cardBorder: '#334155',
          cardShadow: '#020617',

          /* Border */
          border: '#334155',
          divider: '#475569',

          /* Button */
          button: '#3B82F6',
          buttonText: '#FFFFFF',

          /* Header */
          header: '#1E293B',
          headerText: '#F8FAFC',

          /* Sidebar */
          sidebar: '#172033',
          sidebarText: '#E2E8F0',

          /* Icon */
          icon: '#FFFFFF',

          /* Input */
          input: '#1E293B',
          inputBorder: '#475569',

          /* Hover */
          hover: '#243247',
        },
      },

      // ==========================
      // DARK (Light UI)
      // ==========================
      dark: {
        dark: true,
        colors: {
          /* Brand */
          primary: '#2563EB',
          secondary: '#64748B',
          success: '#22C55E',
          warning: '#F59E0B',
          error: '#EF4444',
          info: '#06B6D4',

          /* Layout */
          background: '#F8FAFC',
          surface: '#FFFFFF',
          surfaceVariant: '#F1F5F9',

          /* Text */
          text: '#0F172A',
          heading: '#020617',
          paragraph: '#475569',
          muted: '#94A3B8',

          /* Card */
          card: '#FFFFFF',
          cardBorder: '#E2E8F0',
          cardShadow: '#CBD5E1',

          /* Border */
          border: '#E2E8F0',
          divider: '#CBD5E1',

          /* Button */
          button: '#2563EB',
          buttonText: '#FFFFFF',

          /* Header */
          header: '#FFFFFF',
          headerText: '#0F172A',

          /* Sidebar */
          sidebar: '#FFFFFF',
          sidebarText: '#334155',

          /* Icon */
          icon: '#475569',

          /* Input */
          input: '#FFFFFF',
          inputBorder: '#CBD5E1',

          /* Hover */
          hover: '#EFF6FF',
        },
      },
    },
  },
});
