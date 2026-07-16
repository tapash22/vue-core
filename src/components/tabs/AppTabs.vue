<script setup lang="ts">
export interface TabOption {
  title: string;
  value: string;
}
defineProps<{
  options?: Array<TabOption>;
  activeTab?: TabOption;
}>();

const tab = defineModel('activeTab', { required: false });
</script>
<template>
  <v-tabs
    v-model="tab"
    :hide-slider="true"
    :height="60"
    class="aesl-tabs align-center"
    bg-color="#fff"
  >
    <v-tab
      v-for="option in options"
      :key="option.value"
      :value="option.value"
      rounded="pill"
      variant="elevated"
      elevation="0"
      :height="40"
      >{{ option.title }}</v-tab
    >
  </v-tabs>
</template>

<style lang="scss">
.aesl-tabs.v-slide-group.v-tabs {
  display: inline-flex;
  border: thin solid #dfe3e8;
  border-radius: 50px;
  padding: 10px;

  .v-slide-group__container {
    .v-slide-group__content {
      .v-btn {
        .v-btn__content {
          font-weight: 500 !important;
        }
      }
    }
  }
}
</style>
