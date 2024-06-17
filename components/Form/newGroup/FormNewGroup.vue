<script setup>
import MyForm from '../default/MyForm';

const store = useUserStore();

const formData = reactive({
  groupName: '',
  date: '',
  remind: false,
})

const onSubmit = () => {
  const date = formData.date.split(' / ');
  const formattedDate = new Date(`${date[1]}.${date[0]}.${date[2]}`);
  store.createGroup({
    groupName: formData.groupName,
    date: formattedDate,
    remind: formData.remind,
  })
}

const isButtonDisabled = computed(() => {
  return formData.groupName.length === 0 || formData.date.length === 0;
})

</script>

<template>
  <MyForm @submit.prevent="onSubmit" title="SET UP YOUR GROUP">
    <FormField id="email" label="GROUP NAME" v-model="formData.groupName" />
    <DatePicker v-model="formData.date"/>
    <FormCheckbox label="SEND OUT A REMINDER BEFORE EVENT" id="reminder" name="reminder" v-model="formData.remind" />
    <MainButton type="submit" :disabled="isButtonDisabled">Submit</MainButton>
  </MyForm>
</template>
