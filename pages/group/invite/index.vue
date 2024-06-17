<script setup>
import './invitation.scss';
import { differenceInDays, differenceInWeeks, parseISO } from 'date-fns';

definePageMeta({
  middleware: ['check-auth']
})
const store = useUserStore();

await useAsyncData('users', () => store.getUserEvent())

const userEvent = computed(() => {
  return store.userEvent;
})

const getDateUntilEvent = (date) => {
  const targetDate = parseISO(date);
  const now = new Date();
  
  const totalDays = differenceInDays(targetDate, now);
  const weeks = Math.floor(totalDays / 7);
  const days = totalDays % 7;

  let result = '';
  if (weeks > 0) {
    result += `${weeks} WEEKS`;
  }
  if (days > 0) {
    if (weeks > 0) result += ' & ';
    result += `${days} DAYS`;
  }

  if (weeks === 0 && days === 0) {
    return "It's today"  
  }

  result += ' UNTIL';

  return result;
}

// const { data, pending, error, refresh } = await useAsyncData(
//   'userEvents',
//   () => store.getUserEvent()
// );
</script>

<template>
  <section class="invitation">
    <p class="invitation__date">{{ getDateUntilEvent(userEvent.date) }}</p>
    <p class="invitation__name">{{ userEvent.name }}</p>
    <button>Edit</button>
    <FormInvitation class="invitation__form"/>
    <InvitationList />
    <Teleport to="body">
      <ModalDelete />
    </Teleport>
  </section>
</template>
