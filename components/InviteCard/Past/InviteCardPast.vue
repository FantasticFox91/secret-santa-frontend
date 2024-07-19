<template>
  <li class="invite-card">
    <Avatar class="invite-card__avatar" :class="{'avatar--santa': santa}" :name="user.firstName" :status="user.status" :imageSrc="user.avatar"/>
    <div class="invite-card__info">
      <p class="invite-card__name">{{ user.firstName }}</p>
      <p class="invite-card__email">{{ user.email }}</p>
    </div>
  </li>
</template>

<script setup lang='ts'>
import '../invite-card.scss';

defineProps({
  user: Object,
  santa: {
    type: Boolean,
    default: false
  }
})
</script>
