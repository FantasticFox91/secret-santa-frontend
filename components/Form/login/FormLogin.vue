<script setup>
import MyForm from '../default/MyForm';

const store = useAuthStore();

const formData = reactive({
  email: '',
  password: '',
})

const onSubmit = () => {
  store.login(formData);
}

</script>

<template>
  <MyForm @submit.prevent="onSubmit" title="Login">
    <FormField id="email" label="email" v-model="formData.email" />
    <FormField id="password" label="Password" type="password" v-model="formData.password" />
    <MainButton type="submit">Submit</MainButton>
    <NuxtLink class="form__link" to="/registration">Need an Account?</NuxtLink>
  </MyForm>
</template>
