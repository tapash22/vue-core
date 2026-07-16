<script setup lang="ts">
import { TableItem } from '@/types/table.ts';
import { computed, ref } from 'vue';
import { useDefaults } from 'vuetify';
import type { VDataTable } from 'vuetify/components';
import AppTableSearch from '../fields/AppTableSearch.vue';
import AppHeader from '../headers/AppHeader.vue';
import AppPagination from '../pagination/AppPagination.vue';
import AppTabs, { type TabOption } from '../tabs/AppTabs.vue';
import AppTableCell from './cells/AppTableCell.vue';

const props = withDefaults(
  defineProps<{
    title?: string;
    headers: VDataTable['headers'];
    searchable?: boolean;
    items: TableItem[];
    paginationPageOptions?: number[];
    switchOptions?: Array<TabOption>;
    activeTab?: string;
    variant?: 'plain' | 'rounded' | 'inner';
    showSerialNumbers?: boolean;
  }>(),
  {
    searchable: false,
    paginationPageOptions: () => [5, 10, 15, 20],
    variant: 'plain',
    showSerialNumbers: true,
  }
);

const searchText = ref<string>('');
const page = ref<number>(1);
const noOfItemsPerPage = defineModel('itemsPerPage', {
  required: false,
  default: 10,
});
const activeTabOption = defineModel('activeTab', { required: false });

const headersWithNo = computed<VDataTable['headers']>(() => {
  if (props.showSerialNumbers && typeof props.headers === 'object')
    return [
      {
        title: 'No.',
        align: 'start',
        key: '#no',
        width: '5px',
        headerProps: {
          style: 'padding-right: 5px;width:5px;',
        },
        cellProps: {
          style: 'padding-right: 5px;width:5px;',
        },
        sortable: false,
      },
      ...props.headers,
    ];
  else return props.headers;
});

useDefaults();
</script>

<template>
  <v-data-table
    :headers="headersWithNo"
    :items="items"
    v-model:page="page"
    v-model:items-per-page="noOfItemsPerPage"
    :search="searchText"
    class="aesl-data-table"
    :class="{
      'is-rounded': variant === 'rounded',
      'is-plain': variant === 'plain',
      'is-inner': variant === 'inner',
    }"
  >
    <template #top>
      <app-header
        class="aesl-data-table-header"
        :class="{ 'pa-5': variant === 'inner', 'pb-4': true }"
      >
        <template #title>
          <app-tabs
            v-if="switchOptions && switchOptions.length"
            :options="switchOptions"
            v-model:active-tab="activeTabOption"
          />
          <h2 v-else>{{ title }}</h2>
        </template>
        <template #controls>
          <app-table-search v-if="searchable" v-model:search="searchText" />
          <slot name="table-controls" />
        </template>
      </app-header>
    </template>
    <!-- modifying the default rendering of a table cell -->
    <template v-if="showSerialNumbers" #[`item.#no`]="{ internalItem }">
      {{ internalItem.index + 1 }}
    </template>
    <template
      v-for="header in headers"
      #[`item.${header.key}`]="{ item, column }"
    >
      <!-- eslint-disable-next-line vue/valid-v-for -->
      <slot :name="`item.${header.key}`" :item="item" :column="column" />
      <!-- eslint-disable-next-line vue/valid-v-for -->
      <app-table-cell
        v-if="!$slots[`item.${header.key}`]"
        :context="column.headerProps?.context"
        :item="item"
        :value-key="column.key || ''"
      >
        <template #default="{ value }">
          <span class="text-subtitle-2 font-weight-medium">{{
            value === undefined ? '---' : value
          }}</span>
        </template>

        <template #actions="slotProps">
          <slot name="actions" v-bind="slotProps" />
        </template>
      </app-table-cell>
    </template>

    <template #bottom="{ pageCount }">
      <app-pagination
        v-model:page="page"
        v-model:items-per-page="noOfItemsPerPage"
        :page-count="pageCount"
        :page-options="paginationPageOptions"
        class="table-pagination"
      />
    </template>
  </v-data-table>
</template>

<style lang="scss">
.aesl-data-table {
  &.v-table {
    background-color: transparent;
  }
  .v-table__wrapper {
    background-color: white;
    thead {
      th {
        font-size: 16px;
        padding: 10px;
      }
    }
  }
  .table-pagination {
    border-top: 2px solid #dfe3e8;
    background-color: #fff;
  }

  &.is-rounded {
    .v-table__wrapper {
      border-radius: 25px 25px 0 0;
    }
    .table-pagination {
      border-radius: 0 0 25px 25px;
    }
  }

  &.is-plain {
    .v-table__wrapper {
      border-radius: 4px 4px 0px 0px;
      border: 1px solid #dfe3e8;
      border-bottom: none;
    }
  }

  &.is-inner {
    &.v-table {
      border: 1px solid #dfe3e8;
      border-radius: 10px !important;
      .aesl-data-table-header {
        h2 {
          font-size: 1.2rem;
        }
      }
      .table-pagination {
        border-radius: 0 0 25px 25px;
      }
      .v-table__wrapper {
        border-radius: 0;
        thead {
          tr {
            background-color: #efefef;
          }
        }
      }
    }
  }
}
</style>
