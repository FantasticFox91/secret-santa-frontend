<script setup>
const user = {
  id: 1,
  name: 'Dianne Russell',
  email: 'drussell@example.com',
  status: 'available',
  avatarSrc: '/_nuxt/assets/images/avatar-01.png'
}
</script>

<template>
  <MainHeader />
  <main class="main">
    <div class="container default">
      <NuxtLink to="/dashboard">
        <svg-icon class="auth__icon" name="logo__secret-santa" width="347" height="188" />
      </NuxtLink>
      <SlidePanelBurger />
      <div class="default__column">
        <slot></slot>
        <SlidePanel>
          <template #title>
            <h1 class="title">Wishlist</h1>
            <MainButton class="slide-panel__edit-button" type="button">edit</MainButton>
          </template>
          <!-- <InviteCard type="wishlist" :user="user"/> -->
          <Wishlist />
        </SlidePanel>
      </div>
    </div>
  </main>
</template>

<style lang="scss">
@import '../assets/styles/variables.scss';

.main {
  min-height: 900px;
  margin-bottom: 400px;
  background-color: $color-silver-tree;
}

.default {
  position: relative;
  display: grid;
  grid-template-columns: 453px 1fr;
  width: 100%;
  height: 100%;
  margin-top: -110px;
  padding-top: 110px;
  background: url('../assets/images/bg_default.svg') no-repeat;

  &__column {
    position: relative;
  }
}

</style>
