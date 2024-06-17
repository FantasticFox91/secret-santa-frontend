
<script setup>
import './burger.scss';
import { useMainStore } from '../../stores/main/main';

const mainStore = useMainStore();
const { burgerShown } = storeToRefs(mainStore);

const toggleBurger = () => {
  console.log(burgerShown.value)
  if (burgerShown.value) {
    mainStore.hideBurger();
  } else {
    mainStore.showBurger();
  }
}

</script>

<template>
  <div class="burger" :class="{'burger--open': burgerShown}">
    <button class="burger__button" @click="toggleBurger">
      <span class="visually-hidden">Show/hide menu</span>
    </button>
    <!-- <Transition name="slide-right" mode="out-in">
      <div class="burger__menu" v-show="isBurgerOpen">
        <ul class="burger__list">
          <li>
            <NuxtLink class="burger__link" to="/">Dashboard</NuxtLink>
          </li>
          <li>
            <NuxtLink class="burger__link" to="/">Our group</NuxtLink>
          </li>
          <li>
            <button class="burger__link" @click="showMyWishList">My wish list</button>
          </li>
        </ul>
        <EventsList />
      </div>
    </Transition> -->
  </div>
</template>
