<script setup>
import './invite-card.scss';
import { useMainStore } from '@/stores/main/main';
const { $modals } = useNuxtApp();
const mainStore = useMainStore();
const authStore = useAuthStore();

defineProps({
  user: Object,
  type: {
    type: String,
    default: '',
  },
  santa: {
    type: Boolean,
    default: false
  }
})

const onDeleteClick = (user) => {
  mainStore.deleteUser = user;
  $modals.show('delete');
}
</script>

<template>
  <div class="invite-card" :class="{'invite-card--thank-you': type === 'thank-you'}">
    <p v-if="type === 'wishlist'" class="invite-card__label">for</p>
    <p v-else-if="type === 'thank-you'" class="invite-card__label invite-card__label--thank-you">to</p>
    <Avatar class="invite-card__avatar" :class="{'avatar--santa': santa}" :name="user.user.firstName" :status="user.status" :imageSrc="user.user.avatar"/>
    <div class="invite-card__info">
      <p class="invite-card__name">{{ `${user.user.firstName} ${user.user.lastName.length ? user.user.lastName : ''}` }}</p>
      <p class="invite-card__email">{{ user.user.email }}</p>
    </div>
    <button class="invite-card__delete" v-if="user.user.status !== 'ACCEPTED' && type !== 'past' && authStore.isAdmin() && user.status === 'INVITED'" @click.stop="onDeleteClick(user)">
      <span class="visually-hidden">Delete invitation</span>
    </button>
  </div>
</template>
