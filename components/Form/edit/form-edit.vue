<script setup>
import { format } from 'date-fns';
import MyForm from '../default/MyForm';
import './form-edit.scss';

const store = useEventStore();
const userEvent = computed(() => {
  return store.currentEvent;
})

const { name, date, sendReminder, id } = storeToRefs(userEvent.value);

const form = reactive({
  id,
  name,
  date,
  remind: sendReminder,
})

const onSubmit = () => {
  const date = form.date.split(' / ');
  const formattedDate = new Date(`${date[1]}.${date[0]}.${date[2]}`);
  store.updateEvent({
    id: form.id,
    name: form.name,
    date: formattedDate,
    remind: form.remind
  });
}

const onDeleteEventButtonClick = () => {
  store.deleteEvent(form.id);
}

watch(userEvent, (newUserEvent) => {
  if (newUserEvent) {
    form.id = newUserEvent.id || '';
    form.name = newUserEvent.name || '';
    form.date = format(newUserEvent.date, "dd / MM / yyyy") || '';
    form.remind = newUserEvent.sendReminder || false;
  }
}, { immediate: true });

</script>

<template>
  <MyForm class="form-edit" @submit.prevent="onSubmit" >
    <div class="form-edit__headings">
      <h2 class="form-edit__title title">EVENT DETAILS</h2>
      <p class="form-edit__subtitle">EDIT THE CURRENT EVENT</p>
    </div>
    <FormField id="Event name" label="Event name" v-model="form.name"/>
    <DatePicker v-model="form.date"/>
    <FormCheckbox label="SEND OUT A REMINDER BEFORE EVENT" v-model="form.remind" id="reminder" name="reminder" />
    <MainButton type="submit">Update</MainButton>
    <button class="form-edit__delete" type="button" @click="onDeleteEventButtonClick">
      <svg-icon name="bin" width="32" height="32" />
      Delete the Event
    </button>
  </MyForm>
</template>
