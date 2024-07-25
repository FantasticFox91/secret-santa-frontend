<script setup>
definePageMeta({
  middleware: ['check-auth']
})

const userStore = useUserStore();

onMounted(async() => {
  await userStore.getUserEvent();
  if (userStore.userEvents.length) {
    navigateTo('/dashboard');
  } else {
    navigateTo('/event/new');
  }
})

</script>

<template>
</template>

<style lang="scss">

</style>
