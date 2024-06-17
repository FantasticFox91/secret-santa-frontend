<script setup>
import './main-button.scss';

defineProps({
  disabled: {
    type: Boolean,
    default: false,
  }
})
</script>

<template>
  <button class="button" type="button" :disabled="disabled">
    <slot></slot>
  </button>
</template>
