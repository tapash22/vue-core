<template>
  <div class="w-100 d-flex flex-row align-center justify-space-between">
    <div class="w-100">
      <slot name="title" />
    </div>
    <div class="w-100 d-flex flex-row align-center justify-end ga-3">
      <slot name="controls" />
    </div>
  </div>
</template>
