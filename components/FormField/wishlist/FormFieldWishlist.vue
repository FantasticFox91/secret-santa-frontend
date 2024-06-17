<script setup>
import './form-field-wishlist.scss';

defineProps({
  isNew: {
    type: Boolean,
    default: false,
  }
})
</script>

<template>
  <div class="form-field form-field-wishlist">
    <div class="form-field-wishlist__name">
      <input class="form-field__input form-field-wishlist__input" type="text" />
    </div>
    <div class="form-field-wishlist__link">
      <input class="form-field__input form-field-wishlist__input" type="url" />
    </div>
    <button
      class="form-field-wishlist__button"
      :class="{
        'form-field-wishlist__button--add': isNew,
        'form-field-wishlist__button--remove': !isNew,
      }"
      type="button"
    >
      <span class="visually-hidden">Add item to wishlist</span>
    </button>
  </div>
</template>
