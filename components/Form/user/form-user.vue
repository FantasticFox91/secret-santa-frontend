<script setup>
import MyForm from '../default/MyForm';
import './form-edit.scss';

const authStore = useAuthStore();
const userStore = useUserStore();
const user = computed(() => {
  return authStore.user;
})

const { id, firstName, lastName, email } = storeToRefs(user.value);

const form = reactive({
  id,
  name: `${firstName} ${lastName}`,
  email,
  password: '',
  avatar: null,
})

const onAvatarUpdate = (file) => {
  form.avatar = file;
}

const onSubmit = async () => {
  const formData = new FormData();
  formData.append('user', JSON.stringify({
    id: form.id,
    name: form.name,
    email: form.email,
    password: form.password,
  }));
  
  if (form.avatar) {
    formData.append('file', form.avatar);
  }

  await userStore.updateUserInfo(formData);
}

watch(user, (newUser) => {
  if (newUser) {
    form.id = newUser.id || '';
    form.name = `${newUser.firstName} ${newUser.lastName}` || '';
    form.email = newUser.email || '';
    form.avatar = null;
  }
}, { immediate: true });

</script>

<template>
  <MyForm class="form-edit" @submit.prevent="onSubmit" >
    <div class="form-edit__headings">
      <h2 class="form-edit__title title">My account</h2>
    </div>
    <FormField id="User name" label="Name" v-model="form.name"/>
    <FormField id="User email" label="Email" type="email" v-model="form.email"/>
    <FormField id="User password" label="New password" type="password" v-model="form.password"/>
    <FormAvatar :avatarSrc="user.avatar" @update="onAvatarUpdate" />
    <MainButton type="submit">Update</MainButton>
  </MyForm>
</template>
