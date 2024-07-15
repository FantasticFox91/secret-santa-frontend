<script setup>
import './form-rsvp.scss';
import MyForm from '../default/MyForm';

const store = useEventStore();
const props = defineProps({
  eventId: String,
})
const userEvent = computed(() => {
  return store.currentEvent;
})
const router = useRouter();
const route = useRoute();


const onAccept = () => {
  router.push('/rsvp/accepted')
}

const onDecline = () => {
  router.push('/rsvp/declined')
}

await useAsyncData('rsvpEvent', () => store.getRSVPEvent(props.eventId));

onMounted(() => {
  store.user = {
    email: route.query.email,
  };
})
</script>

<template>
  <MyForm class="form-rsvp">
    <h2 class="form-rsvp__title">{{ userEvent.name }}</h2>
    <p class="form-rsvp__subtitle">{{ useDateFormat(userEvent.date) }}</p>
    <div class="form-rsvp__buttons">
      <button class="form-rsvp__button form-rsvp__button--decline" type="button" @click="onDecline">
        Regretfully <br />Decline
      </button>
      <button class="form-rsvp__button form-rsvp__button--accept" type="button" @click="onAccept">
        I’ll Be There!
      </button>
    </div>
  </MyForm>
</template>
