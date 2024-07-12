import { defineStore } from 'pinia';

export const useEventStore = defineStore('event', () => {
  const { $api } = useNuxtApp();

  const currentEvent = ref({});

  const setCurrentEvent = (event) => {
    currentEvent.value = event;
  }

  return { 
    currentEvent,
    setCurrentEvent,
  }
})
