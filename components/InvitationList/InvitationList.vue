
<script setup>
import './invitation-list.scss';

defineProps({
  wishlist: {
    type: Boolean,
    default: false,
  }
})

const userStore = useUserStore();

const onUserWishlistClick = (userId) => {
  userStore.showUserWishList(userId, userStore.userEvent.id);
}

</script>

<template>
  <ul v-if="wishlist" class="invitation-list">
    <InviteCard class="invite-card--wishlist" v-for="user in userStore.userEvent.userStatus" :user="user" :key="user.user.id" @click="() => onUserWishlistClick(user.user.id)"/>
  </ul>
  <ul v-else class="invitation-list">
    <InviteCard v-for="user in userStore.userEvent.userStatus" :user="user" :key="user.user.id"/>
  </ul>
</template>
