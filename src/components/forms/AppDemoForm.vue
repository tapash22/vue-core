<script setup lang="ts">
import { useFormSlots } from '@/composables/useFormSlots.ts';
import { required } from '@/plugins/validation-rules.ts';
import { ref } from 'vue';
import IconPlus from '~icons/mdi/plus';
import AppButton from '../button/AppButton.vue';
import AppFormDialog from './AppFormDialog.vue';

interface UserFormData {
  name: string;
  age: number | null;
  salary: number | null;
}

const { first, second, third } = useFormSlots();

const openDialog = defineModel({ required: false, default: false });

const formData = ref<UserFormData>({
  name: '',
  age: null,
  salary: null,
});

// Handle submission when validation passes
const handleFormSubmit = (closeDone: () => void) => {
  console.log('Submitted User Data:', formData.value);

  // 1. Process your API call or state save here
  // await api.saveUser(formData.value)

  // 2. Clear local data state
  formData.value = { name: '', age: null, salary: null };

  // 3. Trigger the reset and close callback provided by AppFormDialog
  closeDone();
};
</script>

<template>
  <AppFormDialog
    v-model="openDialog"
    title="Create New User"
    sub-title=""
    size="sm"
    :rows="2"
    :cols="2"
    submit-text="Save User"
    cancel-text="Cancel"
    validate-on="submit"
    @submit="handleFormSubmit"
  >
    <!-- Activator Slot -->
    <template #activator="{ props }">
      <AppButton v-bind="props" title="Add User" :preicon="IconPlus" />
    </template>
    <!-- First Slot (Row 1, Col 1) -->
    <template #[first]>
      <v-text-field
        v-model="formData.name"
        label="Full Name"
        variant="outlined"
        density="comfortable"
        :rules="[required]"
        class="required"
      />
    </template>
    <!-- Second Slot (Row 1, Col 2) -->
    <template #[second]>
      <v-text-field
        v-model.number="formData.age"
        label="Age"
        type="number"
        variant="outlined"
        density="comfortable"
        :rules="[required]"
      />
    </template>

    <!-- Third Slot (Row 2, Col 1) -->
    <template #[third]>
      <v-text-field
        v-model.number="formData.salary"
        label="Salary"
        type="number"
        prefix="$"
        variant="outlined"
        density="comfortable"
        :rules="[required]"
      />
    </template>
  </AppFormDialog>
</template>
