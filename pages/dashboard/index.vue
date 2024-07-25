<script setup>
import { useEventStore } from '~/stores/event/event';
import '../group/invite/invitation.scss';

definePageMeta({
  middleware: ['check-auth']
})

const eventStore = useEventStore();
const store = useUserStore();
const authStore = useAuthStore();

const userEvent = computed(() => {
  return eventStore.currentEvent;
})

const onEditButtonClick = () => {
  store.showEditEvent();
}

const onMatchButtonClick = () => {
  store.matchUsers();
}

const users = computed(() => {
  const declinedUsers = [];
  const failedUsers = [];

  userEvent.value.userStatus.forEach((userStatus) => {
    switch (userStatus.status) {
      case 'DECLINED':
        declinedUsers.push(userStatus);
        break;
      case 'INVITED':
        failedUsers.push(userStatus);
        break;
    }
  });

  return {declinedUsers, failedUsers}
})

onMounted(() => {
  if (store.userEvents.length) {
    const today = new Date();
    const eventDate = new Date(userEvent.value.date);
    store.getPastEvents();
  
    if (eventDate < today) {
      eventStore.setCurrentEvent(store.userEvents[0]);
    }
  } else {
    navigateTo('event/new')
  }
})
</script>

<template>
  <section class="invitation" v-if="store.userEvents.length">
    <div class="invitation__headings">
      <div v-if="userEvent">
        <p class="invitation__date">{{ useDateUntil(userEvent.date) }}</p>
        <p class="invitation__name">{{ userEvent.name }}</p>
      </div>
      <div class="invitation__buttons" v-if="authStore.isAdmin()">
        <MainButton class="match-button" type="button" @click="onEditButtonClick">
          <svg-icon name="edit" width="24" height="24" />
        </MainButton>
        <MainButton v-if="!userEvent?.pairings.length && authStore.isAdmin()" class="edit-button" type="button" @click="onMatchButtonClick">Match</MainButton>
      </div>
    </div>
    <DashboardListWithFilters v-if="!userEvent.pairings.length"/>
    <div class="invitation__matched" v-else>
      <PairingList :pairs="userEvent.pairings" secret/>
      <Accordion v-if="users.failedUsers.length" label="Failed to RSVP">
        <InvitationListPast :users="users.failedUsers" />
      </Accordion>
      <Accordion v-if="users.declinedUsers.length" label="declined to participate">
        <InvitationListPast :users="users.declinedUsers" />
      </Accordion>
    </div>
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

.invitation__matched {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
