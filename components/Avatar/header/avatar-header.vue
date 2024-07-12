<script setup>
import '../avatar.scss';

defineProps({
  name: String,
  imageSrc: String,
  header: Boolean
})

const isMenuShown = ref(false);

const onClick = () => {
  isMenuShown.value = !isMenuShown.value;
  if (isMenuShown.value) {
    window.addEventListener('click', closeMenu);
    window.addEventListener('keydown', onEscPress);
  } else {
    cleanupEventListeners();
  }
}

const closeMenu = (e) => {
  if (!e.target.closest('.avatar')) {
    isMenuShown.value = false;
    cleanupEventListeners();
  }
}

const onEscPress = (e) => {
  if (e.key === 'Escape') {
    isMenuShown.value = false;
    cleanupEventListeners();
  }
}

const cleanupEventListeners = () => {
  window.removeEventListener('click', closeMenu);
  window.removeEventListener('keydown', onEscPress);
}
</script>

<template>
  <div class="avatar avatar--header" :class="{'avatar--open': isMenuShown}" ref="avatar">
    <img v-if="imageSrc" class="avatar__image" :src="imageSrc" />
    <div v-else class="avatar__circle">
      <p class="avatar__name">{{ name[0] }}</p>
    </div>
    <button class="avatar__login" @click="onClick">
      <p class="avatar__heading">Logged in as</p>
      <p class="avatar__loginas">{{ name }}</p>
    </button>
    <transition>
    <div class="avatar__menu" v-if="isMenuShown">
      <ul class="avatar__list">
        <li class="avatar__item">
          <NuxtLink class="avatar__link avatar__link--account" to="#">My account</NuxtLink>
        </li>
        <li class="avatar__item">
          <NuxtLink class="avatar__link avatar__link--event" to="/event">My event</NuxtLink>
        </li>
        <li class="avatar__item">
          <button class="avatar__link avatar__link--logout" type="button">Logout</button>
        </li>
      </ul>
    </div>
    </transition>
  </div>
</template>
