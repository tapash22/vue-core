<script setup lang="ts">
import IconSettingsFilled from '~icons/mdi/settings';
</script>
<template>
  <v-footer color="transparent" :app="true">
    <div
      class="d-flex flex-fill flex-row justify-space-between px-4 py-2 text-body-2"
    >
      <span class="d-flex flex-row">
        <strong class="d-flex align-center">
          <v-icon :icon="IconSettingsFilled" size="small" class="mr-1" />
          Anwar Group {{ new Date().getFullYear() }}.
        </strong>
        <span class="ml-1"> All rights reserved </span>
      </span>
      <span>Powered by <strong>Anwar Enterprise Systems Ltd.</strong></span>
    </div>
  </v-footer>
</template>
