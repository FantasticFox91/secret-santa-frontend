<script setup>
import './form-wishlist.scss';

const userStore = useUserStore();
const eventStore = useEventStore();
const userEvent = computed(() => {
  return eventStore.currentEvent;
})

const items = ref([]);

const addNewItem2 = (data) => {
  items.value.push(data);
}

const onDeleteItem = (data) => {
  items.value = items.value.filter((item) => item.id !== data.id);
}

const onSubmit = () => {
  userStore.addItemsToWishlist(items.value, userEvent.value.id);
  navigateTo('/dashboard');
}

onMounted(() => {
  if (userStore.wishlist.length) {
    items.value = userStore.wishlist;
  }
})
</script>

<template>
  <form class="form-wishlist" @submit.prevent="onSubmit">
    <ul class="form-wishlist__list">
      <li class="form-wishlist__item" v-for="item in items">
        <FormFieldWishlist :data2="item" @deleteItem="onDeleteItem"/>
      </li>
      <li>
        <FormFieldWishlist isNew @addNewItem="addNewItem2"/>
      </li>
    </ul>
    <MainButton class="form-wishlist__submit" type="submit" :disabled="!items.length">Submit</MainButton>
  </form>
</template>
