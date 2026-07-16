<script setup lang="ts">
import { defaults as dialogDefaults } from '@/plugins/vuetify/dialogs';
import { computed } from 'vue';
import { useDefaults } from 'vuetify';
import IconTimes from '~icons/aes-light-general/times';

const props = withDefaults(
  defineProps<{
    size?: 'tiny' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
    title: string;
    disableClose?: boolean;
    showFooter?: boolean;
    onClose?: () => void;
  }>(),
  {
    size: 'sm',
    disableClose: false,
    showFooter: true,
  }
);
const dialogWidth = computed(() => {
  if (props.size === 'tiny') return '20%';
  else if (props.size === 'sm') return '30%';
  else if (props.size === 'md') return '40%';
  else if (props.size === 'lg') return '50%';
  else if (props.size === 'xl') return '70%';
  else return '80%';
});

const dialog = defineModel({ required: false, default: false });
function closeDialog() {
  dialog.value = false;
  props.onClose?.();
}

useDefaults();
</script>

<template>
  <v-dialog :width="dialogWidth" content-class="aesl-dialog" v-model="dialog">
    <template #activator="slotProps">
      <slot name="activator" v-bind="slotProps" />
    </template>
    <v-defaults-provider :defaults="dialogDefaults.AeslDialog.VDialog.VCard">
      <v-card rounded="xl">
        <v-card-title class="aesl-dialog-header">
          {{ title }}
          <v-spacer />
          <v-btn
            :icon="IconTimes"
            @click.stop="closeDialog"
            :disabled="disableClose"
          />
        </v-card-title>
        <v-card-text
          :class="{ 'no-footer': !showFooter }"
          class="aesl-dialog-body"
        >
          <slot />
        </v-card-text>
        <v-card-actions v-if="showFooter" class="aesl-dialog-actions">
          <v-spacer />
          <slot name="footer-controls" v-bind="{ closeDialog }" />
          <v-spacer />
        </v-card-actions>
      </v-card>
    </v-defaults-provider>
  </v-dialog>
</template>

<style lang="scss">
.aesl-dialog {
  .v-card {
    .v-card-title.aesl-dialog-header {
      position: fixed;
      display: flex;
      align-items: center;
      justify-content: start;
      top: 0;
      left: 0;
      right: 0;
      background: rgb(var(--v-theme-surface));
      border-bottom: 2px solid
        rgba(var(--v-border-color), var(--v-border-opacity));
      padding: 20px 20px;
      border-radius: 20px 20px 0 0;
    }
    .v-card-text.aesl-dialog-body {
      position: relative;
      margin-top: 100px;
      margin-bottom: 82px;
      display: flex;
      overflow-y: auto;

      &.no-footer {
        margin-bottom: 10px;
      }
    }
    .v-card-actions.aesl-dialog-actions {
      padding: 10px 10px 20px 10px;
      position: fixed;
      display: flex;
      gap: 10px;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgb(var(--v-theme-surface));
      // border-top: 2px solid rgba(var(--v-border-color), var(--v-border-opacity));
      border-radius: 0 0 20px 20px;
    }
  }
}
</style>
