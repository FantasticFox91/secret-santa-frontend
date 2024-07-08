<script setup>
import './form-wishlist.scss';

const userStore = useUserStore();

const items = ref([]);

const addNewItem2 = (data) => {
  items.value.push(data);
}

const onSubmit = () => {
  userStore.addItemsToWishlist(items.value, userStore.userEvent.id)
}
</script>

<template>
  <form class="form-wishlist" @submit.prevent="onSubmit">
    <ul class="form-wishlist__list">
      <li class="form-wishlist__item" v-for="item in items">
        <FormFieldWishlist :data2="item"/>
      </li>
      <li>
        <FormFieldWishlist isNew @addNewItem="addNewItem2"/>
      </li>
    </ul>
    <MainButton class="form-wishlist__submit" type="submit" :disabled="!items.length">Submit</MainButton>
  </form>
</template>
