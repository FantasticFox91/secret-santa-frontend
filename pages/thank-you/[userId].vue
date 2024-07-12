<script setup>
import './thank-you.scss';

definePageMeta({
  middleware: ['check-auth']
})

const store = useUserStore();
const route = useRoute();
const userId = computed(() => {
  return route.params.userId;
})

const { data, pending } = await useAsyncData('user', () => store.getUserById(userId.value), {
  server: false
});
</script>

<template>
  <section class="thank-you" v-if="!pending">
    <FormThankYou :data="data" />
  </section>
</template>
