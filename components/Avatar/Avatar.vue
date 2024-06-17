<script setup>
import './avatar.scss';

defineProps({
  name: String,
  imageSrc: String,
  status: String,
  santaHat: Boolean,
  header: Boolean
})
</script>

<template>
  <div
    class="avatar"
    :class="{
      'avatar--available': status === 'available',
      'avatar--unavailable': status === 'unavailable',
      'avatar--unknown': status === 'unknown',
      'avatar--santa': santaHat,
      'avatar--header': header,
    }"
  >
    <img v-if="imageSrc" class="avatar__image" :src="imageSrc" />
    <div v-else class="avatar__circle">
      <p class="avatar__name">{{ name[0] }}</p>
    </div>
  </div>
</template>
