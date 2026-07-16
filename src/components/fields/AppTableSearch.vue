<script setup lang="ts">
import { useIcons } from '@/composables/icons';

const search = defineModel('search', { required: true, default: '' });

const { getIcon } = useIcons();
</script>
<template>
  <div class="aesl-table-search-wrapper">
    <v-text-field
      v-model="search"
      class="aesl-search"
      label="Search"
      :prepend-inner-icon="getIcon('aesl-search')"
      :clearable="true"
    />
  </div>
</template>

<style lang="scss">
.aesl-table-search-wrapper {
  width: 300px;
  .aesl-search {
    .v-input__control {
      .v-field__field {
        height: 52px;
      }
    }
  }
}
</style>
