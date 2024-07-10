<template>
  <div class="form-field-dashboard" :class="getFilterClass()">
    <input
      class="form-field-dashboard__input visually-hidden"
      type="radio"
      name="statuses"
      :value="id"
      :id="id"
      @change="onChange"
    />
    <label class="form-field-dashboard__label" :for="id">
      <slot></slot>
    </label>
    <button v-if="isResetShown" class="form-field-dashboard__clear" @click="onResetStatusFilter">Clear filter</button>
    <p class="form-field-dashboard__number">{{ number }}</p>
  </div>
</template>

<script setup lang='ts'>
import './form-field-dashboard.scss';

const props = defineProps({
  modelValue: String,
  id: String,
  number: Number
})

const emits = defineEmits(['resetFilter', 'onChange']);

const getFilterClass = () => {
  return `form-field-dashboard--${props.id}`
}

const isResetShown = computed(() => {
  return props.modelValue === props.id;
})

const onChange = (e) => {
  emits('onChange', e.target.value);
}

const onResetStatusFilter = () => {
  emits('resetFilter');
}
</script>
