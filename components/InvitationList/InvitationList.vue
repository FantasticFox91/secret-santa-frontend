
<script setup>
import './invitation-list.scss';

const props = defineProps({
  wishlist: {
    type: Boolean,
    default: false,
  },
  dashboard: {
    type: Boolean,
    default: false,
  },
  statusFilter: {
    type: String,
    required: false
  }
})

const userStore = useUserStore();

const onUserWishlistClick = (userId) => {
  userStore.showUserWishList(userId, userStore.userEvent.id);
}

const users = computed(() => {
  const { dashboard, statusFilter } = props;
  const { userStatus } = userStore.userEvent;

  if (!dashboard || statusFilter === "") {
    return userStatus;
  }

  const upperCaseStatusFilter = statusFilter.toUpperCase();
  return userStatus.filter(user => user.status === upperCaseStatusFilter);
});

</script>

<template>
  <ul v-if="wishlist" class="invitation-list">
    <InviteCard class="invite-card--wishlist" v-for="user in users" :user="user" :key="user.user.id" @click="() => onUserWishlistClick(user.user.id)"/>
  </ul>
  <ul v-else class="invitation-list">
    <InviteCard v-for="user in users" :user="user" :key="user.user.id"/>
  </ul>
</template>
