<script setup>
import '../group/invite/invitation.scss';
const store = useUserStore();

const userEvent = computed(() => {
  return store.userEvent;
})

const onEditButtonClick = () => {
  store.showEditEvent();
}

await useAsyncData('users', () => store.getUserEvent());
</script>

<template>
  <section class="invitation">
    <div class="invitation__headings">
      <div v-if="userEvent">
        <p class="invitation__date">{{ useDateUntil(userEvent.date) }}</p>
        <p class="invitation__name">{{ userEvent.name }}</p>
      </div>
      <MainButton class="edit-button" type="button" @click="onEditButtonClick">Edit</MainButton>
    </div>
  </section>
</template>

<style lang="scss">
.invitation__headings {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.edit-button {
  font-size: 14px;
  line-height: 30px;
  padding: 2px 40px;
}
</style>
