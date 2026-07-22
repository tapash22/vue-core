// src/composables/useAppTheme.ts
import { computed } from 'vue';
import { useTheme } from 'vuetify';

export function useAppTheme() {
  const theme = useTheme();

  const isDark = computed(() => theme.global.current.value.dark);

<<<<<<< HEAD
  const toggleTheme = () => {
    requestAnimationFrame(() => {
      theme.global.name.value = isDark.value ? 'light' : 'dark';
    });
  };
=======
  function toggleTheme() {
    console.log(isDark.value);
    // ✅ Use theme.change() instead of directly mutating theme.global.name.value
    const nextTheme = isDark.value ? 'light' : 'dark';
    theme.change(nextTheme);
  }
>>>>>>> 7565f22 (implement chart and added appbasechart for use any type of chart)

  return {
    isDark,
    toggleTheme,
  };
}
