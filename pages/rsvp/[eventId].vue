<script setup>
definePageMeta({
  layout: 'auth'
})
const route = useRoute();
const eventId = computed(() => {
  return route.params.eventId;
})

</script>

<template>
  <FormRSVP title="you’re invited TO" :eventId="eventId"/>
</template>
