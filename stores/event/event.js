import { defineStore } from 'pinia';

export const useEventStore = defineStore('event', () => {
  const { $api } = useNuxtApp();
  const currentEvent = ref({});
  const pastEvent = ref({
    event: {
      name: '',
      date: '',
    },
    pairings: [],
    failedUsers: [],
    declinedUsers: [],
  });

  const setCurrentEvent = (event) => {
    currentEvent.value = event;
  }

  const getPastEvent = async (eventId) => {
    const result = await $api.event.getPastEvent(eventId);
    pastEvent.value = result;
  }

  return { 
    currentEvent,
    pastEvent,
    setCurrentEvent,
    getPastEvent,
  }
})
