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
  store.acceptInvitation(formData);
}
</script>

<template>
  <MyForm class="form-accept" @submit.prevent="onSubmit" >
    <FormField id="password" label="Password" type="password" v-model="formData.password" />
    <FormAvatar @update="onAvatarUpdate" />
    <MainButton type="submit" :disabled="isButtonDisabled">Submit</MainButton>
  </MyForm>
</template>
