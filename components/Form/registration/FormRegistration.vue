<script setup>
import MyForm from '../default/MyForm';

const store = useAuthStore()

const formData = reactive({
  username: '',
  email: '',
  password: '',
})

const onSubmit = () => {
  store.registration(formData);
}

</script>

<template>
  <MyForm @submit.prevent="onSubmit" title="Sign up">
    <FormField id="username" label="Username" />
    <FormField id="email" label="Email" type="email" v-model="formData.email" />
    <FormField id="password" label="Password" type="password" v-model="formData.password" />
    <MainButton type="submit">Submit</MainButton>
    <NuxtLink class="form__link" to="/login">Ready to Login?</NuxtLink>
  </MyForm>
</template>

