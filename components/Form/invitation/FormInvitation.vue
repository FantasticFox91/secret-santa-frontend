<script setup>
import './form-invitation.scss';
import { useMainStore } from '@/stores/main/main';

const props = defineProps({
  eventId: String,
})

const mainStore = useMainStore();
const form = ref(null);

const formData = reactive(
  {
    name: '',
    lastName: '',
    email: '',
    eventID: '',
  }
)

const onSubmit = () => {
  formData.eventID = props.eventId;
  const userName = formData.name.split(' ');
  formData.name = userName[0].charAt(0).toUpperCase() + userName[0].slice(1);
  formData.lastName = userName.length >= 2 ? userName[1].charAt(0).toUpperCase() + userName[1].slice(1) : '';
  mainStore.addUser(formData);
  form.value.reset();
}
</script>

<template>
  <form class="form-invitation" @submit.prevent="onSubmit" ref="form">
    <h2 class="form-invitation__heading">Invite a friend or family member</h2>
    <div class="form-invitation__content">
      <input type="hidden">
      <FormField id="username" label="name" v-model="formData.name" />
      <FormField id="email" label="email" v-model="formData.email" />
      <button class="form-invitation__button" type="submit">
        <span class="visually-hidden">Send invitation</span>
      </button>
    </div>
  </form>
</template>
