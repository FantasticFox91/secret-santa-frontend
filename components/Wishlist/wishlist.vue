
<script setup>
import './wishlist.scss';

const item = ref(null);
const mainStore = useMainStore();
const userStore = useUserStore();
const authStore = useAuthStore();

const isMyWishList = computed(() => {
  return userStore.user?.user?.id === authStore.user?.id; 
})

const userWishlist = computed(() => {
  return userStore.wishlist;
})

const onEditWishListClick = () => {
  userStore.hideMyWishList();
  navigateTo('/wishlist');
}

</script>

<template>
  <div class="wishlist-side__headings">
    <h2 class="form-edit__title title">wishlist</h2>
    <MainButton v-if="isMyWishList" class="edit-button" type="button" @click="onEditWishListClick">Edit</MainButton>
  </div>
  <InviteCard class="wishlist-side__invite-card" :user="userStore.user" type="wishlist"/>
  <ul class="wishlist-side" v-if="userWishlist.length">
    <li class="wishlist-side__item" v-for="item in userWishlist" :key="item.id">
      <div class="wishlist-side__top">
        <p class="wishlist-side__label">{{ item.name }}</p>
        <MainButton class="button slide-panel__edit-button wishlist-side__button">Details</MainButton>
      </div>
      <div class="wishlist-side__card">
        <div class="wishlist-side__description">
          <p class="wishlist-side__subtitle">OZON.RU</p>
          <h2 class="wishlist-side__title">{{ item.siteTitle }}</h2>
          <p class="wishlist-side__info">{{ item.siteDescription }}</p>
        </div>
        <img class="wishlist-side__image" :src="item.siteImage" width="385" height="202"/>
      </div>
    </li>
  </ul>
  <p v-else>
    Sorry this user didn't submit wishlist
  </p>
</template>
