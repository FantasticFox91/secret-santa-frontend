<script setup>
import './date-picker.scss';

defineProps({
  modelValue: {
    type: String,
  }
})

const emits = defineEmits(['update:modelValue'])

const onDateChange = (e) => {
  const dateValue = e.target.value.split('-');
  if (e.target.value) {
    emits('update:modelValue', `${dateValue[2]} / ${dateValue[1]} / ${dateValue[0]}`);
  } else {
    emits('update:modelValue', '');
  }
}


</script>

<template>
  <div class="date-picker">
    <input class="date-picker__input" id="date" type="date" @change="onDateChange"/>
    <input class="date-picker__date" type="text" :value="modelValue" placeholder="" readonly required/>
    <button class="date-picker__button" type="button">
      <span class="visually-hidden">Show calendar</span>
    </button>
    <label class="date-picker__label" for="date">Event date</label>
  </div>

</template>
