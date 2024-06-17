<script setup>
import './slide-panel.scss';
import { useUserStore } from '../../stores/user/user';

const store = useUserStore();
const { myWishListShown } = storeToRefs(store);

const onCloseMyWishList = () => {
  store.hideMyWishList();
}

watch(myWishListShown, (newValue, oldValue) => {
  if (newValue) {
    document.body.classList.add("scroll-lock");
  } else {
    document.body.classList.remove("scroll-lock");
  }
})
</script>

<template>
  <Transition name="slide-panel">
    <div class="slide-panel" v-show="myWishListShown">
      <div class="slide-panel__container">
        <button class="slide-panel__close-button" type="button" @click="onCloseMyWishList">
          <span class="visually-hidden">Close slide panel</span>
          <svg-icon name="cross" width="64" height="64" />
        </button>
        <div class="slide-panel__heading">
          <slot name="title"></slot>
        </div>
        <slot></slot>
      </div>
    </div>
  </Transition> 
</template>
