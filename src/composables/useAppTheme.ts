import { computed } from 'vue';
import { useTheme } from 'vuetify';

export function useAppTheme() {
  const theme = useTheme();

  const isDark = computed(() => theme.global.name.value === 'dark');

  const toggleTheme = () => {
    theme.global.name.value = isDark.value ? 'light' : 'dark';
  };

  return {
    isDark,
    toggleTheme,
  };
}
