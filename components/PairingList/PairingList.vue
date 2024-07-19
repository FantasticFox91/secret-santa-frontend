<template>
  <ul class="pairing-list">
    <li class="pairing-list__item" v-for="pair in pairs" :key="pair.id">
      <PairingItem :pair="{santa: pair.santa, person: pair.person}" secret/>
    </li>
  </ul>
</template>

<script setup lang='ts'>
import './pairing-list.scss';

defineProps({
  pairs: Object,
  secret: {
    type: Boolean,
    default: false,
  }
})
</script>
