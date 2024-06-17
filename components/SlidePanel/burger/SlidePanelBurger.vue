<script setup>
import './slide-panel-burger.scss';
import { useMainStore } from '../../stores/main/main';
import { useUserStore } from '../../stores/user/user';

const store = useMainStore();
const userStore = useUserStore();
const { burgerShown } = storeToRefs(store);

const showMyWishList = () => {
  store.hideBurger();
  userStore.showMyWishList();
}

watch(burgerShown, (newValue, oldValue) => {
  if (newValue) {
    document.body.classList.add("scroll-lock");
  } else {
    document.body.classList.remove("scroll-lock");
  }
})
</script>

<template>
  <Transition name="slide-from-right">
    <div class="slide-panel-burger" v-show="burgerShown">
      <ul class="slide-panel-burger__list">
        <li>
          <NuxtLink class="slide-panel-burger__link" to="/dashboard">Dashboard</NuxtLink>
        </li>
        <li>
          <NuxtLink class="slide-panel-burger__link" to="/group/invite">Our group</NuxtLink>
        </li>
        <li>
          <button class="slide-panel-burger__link" @click="showMyWishList">My wish list</button>
        </li>
      </ul>
      <EventsList />
    </div>
  </Transition>
</template>
