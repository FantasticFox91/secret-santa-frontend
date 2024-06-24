<script setup>
import './form.scss';

defineProps({
  title: {
    type: String,
  }
})
</script>

<template>
  <form class="form">
    <h1 v-if="title" class="form__heading">{{ title }}</h1>
    <slot></slot>
  </form>
</template>
