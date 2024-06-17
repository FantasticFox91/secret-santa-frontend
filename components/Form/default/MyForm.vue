<script setup>
import './form.scss';

defineProps({
  title: {
    type: String,
    default: 'Title',
  }
})
</script>

<template>
  <form class="form">
    <h1 class="form__heading">{{ title }}</h1>
    <slot></slot>
  </form>
</template>
