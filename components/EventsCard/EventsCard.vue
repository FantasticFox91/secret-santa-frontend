<template>
  <div class="invitation__headings">
    <div>
      <p class="invitation__date">{{ useDateUntil(data.date) }}</p>
      <p class="invitation__name">{{ data.name }}</p>
    </div>
    <div class="invitation__buttons">
      <MainButton class="edit-button" type="button" @click="() => onEventViewButtonClick(data)">View</MainButton>
    </div>
  </div>
</template>

<script setup lang='ts'>
defineProps({
  data: Object
})

const eventStore = useEventStore();

const onEventViewButtonClick = (event) => {
  eventStore.setCurrentEvent(event);
  navigateTo('/dashboard');
}
</script>
