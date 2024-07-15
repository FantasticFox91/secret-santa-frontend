<template>
  <section class="events">
    <h1 class="title">Events list</h1>
    <EventsList :items="userEvents" />
    <Accordion label="Past events" v-if="finishedEvents.length">
      <EventsList :items="finishedEvents" />
    </Accordion>
    <MainButton type="button" @click="onCreateNewEventButtonClick">
      Create new event
    </MainButton>
  </section>
</template>

<script setup lang='ts'>
definePageMeta({
  middleware: ['check-auth']
});

const userStore = useUserStore();
const { userEvents } = storeToRefs(userStore);

const finishedEvents = computed(() => {
  return userEvents.value.filter((event) => {
    const today = new Date();
    const eventDate = new Date(event.date);

    return eventDate < today;
  })
})

const onCreateNewEventButtonClick = () => {
  navigateTo('/event/new');
}
</script>

<style lang="scss">
  .events {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
</style>
