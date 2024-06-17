<script setup>
import './checkbox.scss';
defineProps({
  label: {
    type: String,
    default: '',
  },
  id: {
    type: String,
    default: 'a'
  },
  name: {
    type: String,
    default: 'checkbox'
  },
  modelValue: {
    type: Boolean,
    default: false,
  }
})

const emit = defineEmits(['update:modelValue']);

function handleChange(event) {
  emit('update:modelValue', event.target.checked);
}
</script>

<template>
  <div class="checkbox">
    <input class="checkbox__input visually-hidden" @change="handleChange" :id="id" :name="name" type="checkbox" :checked="modelValue"/>
    <label class="checkbox__label" :for="id">{{ label }}</label>
  </div>
</template>
