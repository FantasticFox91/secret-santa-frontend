<script setup>
import MyForm from '../default/MyForm';

const onSubmit = () => {
  console.log('submit');
}
</script>

<template>
  <MyForm @submit.prevent="onSubmit" title="Reset password">
    <FormField id="password" label="New password" type="password" />
    <FormField id="password" label="Confirm password" type="password" />
    <MainButton type="submit">Submit</MainButton>
    <NuxtLink class="form__link" to="/">Need an Account?</NuxtLink>
  </MyForm>
</template>

