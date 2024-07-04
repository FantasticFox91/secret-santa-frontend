<script setup>
import './invitation.scss';

definePageMeta({
  middleware: ['check-auth']
})

const store = useUserStore();

await useAsyncData('users', () => store.getUserEvent());

const userEvent = computed(() => {
  return store.userEvent;
});
</script>

<template>
  <section class="invitation">
    <p class="invitation__date">{{ useDateUntil(userEvent.date) }}</p>
    <p class="invitation__name">{{ userEvent.name }}</p>
    <FormInvitation :eventId="userEvent.id" class="invitation__form"/>
    <InvitationList />
  </section>
</template>
