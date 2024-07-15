<template>
  <form class="form-thank-you" @submit.prevent="onSubmit">
    <h1 class="title">Thank you</h1>
    <InviteCard :user="{user: data}" type="thank-you"/>
    <FormTextarea v-model="message" label="message"id="message" @onTypeMessage="onChange"/>
    <MainButton type="submit" :disabled="isSubmitDisabled">Send</MainButton>
  </form>
</template>

<script setup lang='ts'>
import { useEventStore } from '~/stores/event/event';
import './form-thank-you.scss';

const props = defineProps({
  data: {
    type: Object
  }
});

const message = ref('');
const eventStore = useEventStore();
const userStore = useUserStore()
const { currentEvent } = storeToRefs(eventStore);

const onChange = (value: string) => {
  message.value = value;
}

const isSubmitDisabled = computed(() => {
  return message.value.length < 6;
})

const onSubmit = () => {
  userStore.sendThankyouMessage(props.data?.id, currentEvent.value?.id, message.value);
}
</script>
