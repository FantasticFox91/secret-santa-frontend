<script setup>
import './form-field-wishlist.scss';

const emits = defineEmits(['addNewItem', 'removeItem']);

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
  text: '',
  url: '',
});

const onButtonClick = () => {
  if (props.isNew) {
    const item = {
      text: data.text,
      link: data.url,
    }
    emits('addNewItem', item);
    data.text = '';
    data.url = '';
  } else {
    emits('deleteItem', data);
  }
}

onMounted(() => {
  if (props.data2) {
    data.text = props.data2.text
    data.url = props.data2.link
  }
})
</script>

<template>
  <div class="form-field form-field-wishlist">
    <div class="form-field-wishlist__name">
      <input class="form-field__input form-field-wishlist__input" v-model="data.text" type="text" :disabled="!isNew"/>
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
