<script setup>
import './header.scss';
const authStore = useAuthStore();
const { user } = storeToRefs(authStore)
</script>

<template>
  <header class="header">
    <div class="container header__container">
      <div class="header__wrapper">
        <Burger />
        <Avatar-header :name="`${user.firstName} ${user.lastName}`" :imageSrc="user.avatar" header/>
      </div>
    </div>
  </header>
</template>
