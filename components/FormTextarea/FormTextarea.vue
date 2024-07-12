<template>
  <div class="form-textarea">
    <textarea class="form-textarea__textarea" :id="id" :value="modelValue" placeholder="" @input="onInput"></textarea>
    <label class="form-textarea__label" :for="id">{{ label }}</label>
  </div>
</template>

<script setup lang='ts'>
import './form-textarea.scss';

defineProps({
  id: {
    type: String,
    required: true
  },
  label: {
    type: String,
    default: '',
  },
  modelValue: {
    type: String,
  },
})
const emits = defineEmits(['onTypeMessage']);

const onInput = (e) => {
  emits('onTypeMessage', e.target.value);
}
</script>
