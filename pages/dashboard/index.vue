<script setup>
import { useEventStore } from '~/stores/event/event';
import '../group/invite/invitation.scss';

definePageMeta({
  middleware: ['check-auth']
})

const eventStore = useEventStore();

const userEvent = computed(() => {
  return eventStore.currentEvent;
})

const onEditButtonClick = () => {
  store.showEditEvent();
}

const onMatchButtonClick = () => {
  store.matchUsers();
}

await useAsyncData('users', () => store.getUserEvent());
</script>

<template>
  <section class="invitation">
    <div class="invitation__headings">
      <div v-if="userEvent">
        <p class="invitation__date">{{ useDateUntil(userEvent.date) }}</p>
        <p class="invitation__name">{{ userEvent.name }}</p>
      </div>
      <div class="invitation__buttons">
        <MainButton class="match-button" type="button" @click="onEditButtonClick">
          <svg-icon name="edit" width="24" height="24" />
        </MainButton>
        <MainButton class="edit-button" type="button" @click="onMatchButtonClick">Match</MainButton>
      </div>
    </div>
    <DashboardListWithFilters />
  </section>
</template>

<style lang="scss">
.invitation__headings {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.invitation__buttons {
  display: flex;
  align-items: center;
  gap: 16px;
}

.match-button {
  display: flex;
  align-items: center;
  justify-content: start;
  padding: 10px;
}

.edit-button {
  font-size: 14px;
  line-height: 30px;
  padding: 2px 40px;
}
</style>
