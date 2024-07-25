<script setup>
import MyForm from '../default/MyForm';
import './form-accept.scss';

const store = useUserStore();

const formData = reactive({
  password: '',
  email: '',
  avatar: null,
})

const onAvatarUpdate = (file) => {
  formData.avatar = file;
}

const isButtonDisabled = computed(() => {
  return formData.password.length === 0 || !formData.avatar;
})

const onSubmit = () => {
  formData.email = store.user.email;
  formData.eventId = store.user.eventId;
  const data = new FormData();
  data.append('user', JSON.stringify({
    email: formData.email,
    eventId: formData.eventId,
    password: formData.password,
  }));
  data.append('file', formData.avatar);

  store.acceptInvitation(data);
}
</script>

<template>
  <MyForm class="form-accept" @submit.prevent="onSubmit" >
    <FormField id="password" label="Password" type="password" v-model="formData.password" />
    <FormAvatar @update="onAvatarUpdate" />
    <MainButton type="submit" :disabled="isButtonDisabled">Submit</MainButton>
  </MyForm>
</template>
