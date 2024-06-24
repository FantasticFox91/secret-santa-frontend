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

const goToDashboardPage = () => {
  store.hideBurger();
  navigateTo('/dashboard');
}

const goToOurGroupPage = () => {
  store.hideBurger();
  navigateTo('/group/invite');
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
          <button class="slide-panel-burger__link" @click="goToDashboardPage">Dashboard</button>
        </li>
        <li>
          <button class="slide-panel-burger__link" @click="goToOurGroupPage">Our group</button>
        </li>
        <li>
          <button class="slide-panel-burger__link" @click="showMyWishList">My wish list</button>
        </li>
      </ul>
      <EventsList />
    </div>
  </Transition>
</template>
