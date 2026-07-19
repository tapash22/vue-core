<script setup lang="ts"></script>
<template>
  <v-footer color="transparent" :app="true">
    <div
      class="d-flex flex-fill flex-row justify-space-between px-4 py-2 text-body-2"
    >
      <span class="d-flex flex-row">
        <strong class="d-flex align-center text-white">
          @
          <!-- <v-icon :icon="IconCopyrightCircle" size="small" class="mr-1" /> -->
          CloudAES {{ new Date().getFullYear() }}.
        </strong>
        <span class="ml-1 text-white"> All rights reserved </span>
      </span>
      <span class="text-white"
        >Powered by <strong class="text-white">My Systems Ltd.</strong></span
      >
    </div>
  </v-footer>
</template>
