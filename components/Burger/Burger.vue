
<script setup>
import './burger.scss';
import { useMainStore } from '../../stores/main/main';

const mainStore = useMainStore();
const { burgerShown } = storeToRefs(mainStore);

const toggleBurger = () => {
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
  </div>
</template>
