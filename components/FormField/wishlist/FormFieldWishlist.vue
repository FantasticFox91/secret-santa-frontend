<script setup>
import './form-field-wishlist.scss';

const emits = defineEmits(['addNewItem', 'deleteItem']);

const props = defineProps({
  isNew: {
    type: Boolean,
    default: false,
  },
  data2: {
    type: Object,
    required: false
  }
})

const data = reactive({
  name: '',
  url: '',
});

const onButtonClick = () => {
  if (props.isNew) {
    const item = {
      name: data.name,
      url: data.url,
    }
    emits('addNewItem', item);
    data.name = '';
    data.url = '';
  } else {
    emits('deleteItem', props.data2);
  }
}

onMounted(() => {
  if (props.data2) {
    data.name = props.data2.name
    data.url = props.data2.url
  }
})
</script>

<template>
  <div class="form-field form-field-wishlist">
    <div class="form-field-wishlist__name">
      <input class="form-field__input form-field-wishlist__input" v-model="data.name" type="text" :disabled="!isNew"/>
    </div>
    <div class="form-field-wishlist__link">
      <input class="form-field__input form-field-wishlist__input" v-model="data.url" type="url" :disabled="!isNew"/>
    </div>
    <button
      class="form-field-wishlist__button"
      :class="{
        'form-field-wishlist__button--add': isNew,
        'form-field-wishlist__button--remove': !isNew,
      }"
      type="button"
      @click="onButtonClick"
    >
      <span class="visually-hidden">Add item to wishlist</span>
    </button>
  </div>
</template>
