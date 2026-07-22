// src/composables/useAppTheme.ts
import { computed } from 'vue';
import { useTheme } from 'vuetify';

export function useAppTheme() {
  const theme = useTheme();

  const isDark = computed(() => theme.global.current.value.dark);

  function toggleTheme() {
    console.log(isDark.value);
    // ✅ Use theme.change() instead of directly mutating theme.global.name.value
    const nextTheme = isDark.value ? 'light' : 'dark';
    theme.change(nextTheme);
  }

  return {
    isDark,
    toggleTheme,
  };
}
