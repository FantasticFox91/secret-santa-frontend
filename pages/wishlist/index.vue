<script setup>
import './wishlist.scss';

definePageMeta({
  middleware: ['check-auth']
})

</script>

<template>
  <section class="wishlist">
    <h1 class="wishlist__title title">wish list</h1>
    <p class="title-2">Make your list and check it twice</p>
    <p class="title-2">We currently support only Ozon Marketplace links.</p>
    <FormWishlist />
  </section>
</template>
