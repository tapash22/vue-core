<script setup lang="ts">
import layer from '@/assets/images/cloud_logo.svg';
</script>
<template>
  <aesl-appbar />
  <div class="w-screen h-100 registration">
    <v-container class="h-100 d-flex align-center absolute">
      <v-row class="d-flex justify-end">
        <v-col cols="6" class="w-100 h-full d-flex justify-center align-center">
          <v-img :src="layer" max-width="200" />
        </v-col>
        <v-col cols="6" class="d-flex justify-center align-center">
          <v-sheet class="pa-6" color="#fff" width="500" rounded="lg">
            <router-view />
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </div>
  <aes-auth-footer />
</template>

<style scoped>
.registration {
  position: relative;
  background-image: url('@/assets/images/auth_background.jpg');
  background-position: center;
  background-attachment: fixed;
  background-size: cover;
}
</style>
