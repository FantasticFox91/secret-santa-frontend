<template>
  <div class="invitation__headings">
    <div>
      <p class="invitation__date">{{ useDateFormat(data.date) }}</p>
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
  navigateTo(`/event/past/${event.id}`);
}
</script>
