<template>
  <ul class="pairing-list">
    <li class="pairing-list__item" v-for="pair in pairs" :key="pair.id">
      <InviteCardPast :user="pair.santa" santa/>
      <div class="pairing-list__line"></div>
      <InviteCardPast :user="pair.person"/>
    </li>
  </ul>
</template>

<script setup lang='ts'>
import './pairing-list.scss';

defineProps({
  pairs: Object
})
</script>
