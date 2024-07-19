<template>
  <section class="past-event" v-if="!pending">
    <div>
      <p class="invitation__date">{{ useDateFormat(pastEvent.event.date) }}</p>
      <p class="invitation__name">{{ pastEvent.event.name }}</p>
    </div>
    <PairingList :pairs="pastEvent.pairings" />
    <Accordion v-if="pastEvent.failedUsers.length" label="Failed to RSVP">
      <InvitationListPast :users="pastEvent.failedUsers" />
    </Accordion>
    <Accordion v-if="pastEvent.declinedUsers.length" label="declined to participate">
      <InvitationListPast :users="pastEvent.declinedUsers" />
    </Accordion>
  </section>
</template>

<script setup lang='ts'>
definePageMeta({
  middleware: ['check-auth']
});

const eventStore = useEventStore()
const route = useRoute();
const eventId = computed(() => {
  return route.params.eventID;
})

const { pastEvent } = storeToRefs(eventStore);

const { data, pending } = await useAsyncData('event', () => eventStore.getPastEvent(eventId.value), {
  server: false
});

</script>

<style lang="scss">
.past-event {
  display: flex;
  padding-bottom: 50px;
  flex-direction: column;
  gap: 20px;
}
</style>
