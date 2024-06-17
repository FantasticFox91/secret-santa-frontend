<script setup>
definePageMeta({
  layout: 'auth'
})

const formData = reactive({
  email: '',
  password: '',
})

const onSubmit = async () => {

const { data, pending, error, refresh }  = await useFetch(
    '/api/registration',
    {
      method: 'POST',
      body: formData,
      onResponseError({ request, response, options }) {
        console.log('error', response._data.message)
      },
      onResponse({ request, response, options }) {
        if (response.ok) {
          console.log('ok',response._data.data[0])
        }
      },
    })
}
</script>

<template>
  <FormReset />
</template>
