
<script setup>
import '../invitation-list.scss';

const props = defineProps({
  users: {
    type: Array
  }
})

</script>

<template>
  <ul class="invitation-list">
    <InviteCard v-for="user in users" :user="user" :key="user.id" type="past"/>
  </ul>
</template>
