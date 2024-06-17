<script setup>
import './form-wishlist.scss';

const items = []
</script>

<template>
  <form class="form-wishlist">
    <ul class="form-wishlist__list">
      <li class="form-wishlist__item" v-for="item in items">
        <FormFieldWishlist />
      </li>
      <li>
        <FormFieldWishlist isNew />
      </li>
    </ul>
    <MainButton class="form-wishlist__submit" type="submit">Submit</MainButton>
  </form>
</template>
