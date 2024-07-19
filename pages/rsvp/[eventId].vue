<script setup>
definePageMeta({
  layout: 'auth'
})
const userStore = useUserStore();
const route = useRoute();
const eventId = computed(() => {
  return route.params.eventId;
})

onMounted(() => {
  userStore.user = {
    'email': route.query.email
  };
})

</script>

<template>
  <FormRSVP title="you’re invited TO" :eventId="eventId"/>
</template>
