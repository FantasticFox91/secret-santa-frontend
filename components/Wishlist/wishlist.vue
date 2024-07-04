
<script setup>
import './wishlist.scss';
import { useMainStore } from '../../stores/main/main.js';

const item = ref(null);


const mainStore = useMainStore();
const userStore = useUserStore();

const userWishlist = computed(() => {
  return userStore.wishlist;
})

watchEffect(async () => {
  try {
    item.value = await mainStore.getUrlMeta('https://www.ozon.ru/product/realme-smartfon-note-50-3-64-gb-chernyy-1388203267/?avtc=1&avte=1&avts=1718030858');
  } catch (error) {
    console.error('Error fetching metadata:', error);
  }
});

</script>

<template>
  <h2 class="form-edit__title title">wishlist</h2>
  <InviteCard :user="userStore.user" type="wishlist"/>
  <ul class="wishlist-side" v-if="userWishlist.length">
    <li class="wishlist-side__item" v-for="item in userWishlist">
      <div class="wishlist-side__top">
        <p class="wishlist-side__label">iPhone 15</p>
        <MainButton class="button slide-panel__edit-button wishlist-side__button">Details</MainButton>
      </div>
      <div class="wishlist-side__card" v-if="item">
        <div class="wishlist-side__description">
          <p class="wishlist-side__subtitle">{{ item.site }}</p>
          <h2 class="wishlist-side__title">{{ item.title }}</h2>
          <p class="wishlist-side__info">{{ item.description }}</p>
        </div>
        <img class="wishlist-side__image" :src="item.image" width="385" height="202"/>
      </div>
    </li>
  </ul>
  <p v-else>
    Sorry this user didn't submit wishlist
  </p>
</template>
