<script setup lang="ts">
import Logo from '@/assets/images/aes_light.svg';
</script>
<template>
  <v-app-bar flat location="top" class="px-8 py-2" color="transparent">
    <v-img :max-height="32" :max-width="100" contain :src="Logo" />
  </v-app-bar>
</template>
