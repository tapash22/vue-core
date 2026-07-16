<script setup lang="ts">
import { computed } from 'vue';
import { useDisplay } from 'vuetify';

const props = defineProps<{ file: File }>();

const fileUri = computed(() => {
  if (props.file) {
    return URL.createObjectURL(props.file);
  } else return '';
});
const { height } = useDisplay();
</script>
<template>
  <v-row class="ma-0">
    <v-col :cols="$slots['preview-form'] ? 6 : 12" class="preview-file">
      <v-img
        v-if="file.type.startsWith('image/')"
        :src="fileUri"
        width="100%"
        :height="height * 0.6"
      />
      <iframe
        v-else
        :src="fileUri"
        width="100%"
        :height="height * 0.6"
      ></iframe>
    </v-col>
    <v-col cols="6" align-self="center" v-if="$slots['preview-form']">
      <slot name="preview-form" />
    </v-col>
  </v-row>
</template>

<style lang="scss" scoped>
.preview-file {
  border: 1px solid #dfe3e8;
  border-radius: 10px;
}
</style>
