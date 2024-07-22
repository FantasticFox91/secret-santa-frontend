<script setup>
const store = useUserStore();
const { userSlidePanel } = storeToRefs(store);

const wishlist = resolveComponent('Wishlist');
const editEvent = resolveComponent('FormEdit');
const editUser = resolveComponent('FormUser');

const components = {
  'editevent': editEvent,
  'wishlist': wishlist,
  'userEdit': editUser,
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
          <component :is="components[userSlidePanel]" />
        </SlidePanel>
      </div>
    </div>
    <Teleport to="body">
      <ModalDelete />
    </Teleport>
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
