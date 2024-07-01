<script setup>
definePageMeta({
  layout: 'auth'
})

const store = useUserStore();

onMounted(() => {
  store.declineInvitation(store.user.email);
})
</script>

<template>
  <FormDeclined title="Thanks"/>
</template>
