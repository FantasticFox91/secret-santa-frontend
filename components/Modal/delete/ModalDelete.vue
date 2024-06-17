
<script setup>
import './modal-delete.scss';
import Modal from '../default/Modal';
import { useMainStore } from '@/stores/main/main';

const mainStore = useMainStore();
const user = ref(null);

const test = () => {
  user.value = mainStore.getUserById(mainStore.deleteUserId);
}
</script>

<template>
  <Modal class="modal-delete" name="delete" @onShow="test">
    <h2 class="modal__heading">Are you sure you want to remove this?</h2>
    <div class="invite-card modal-delete__card" v-if="user">
      <Avatar class="invite-card__avatar" :name="user.name" :status="user.status" :imageSrc="user.avatarSrc"/>
      <div class="invite-card__info">
        <p class="invite-card__name">{{ user.name }}</p>
        <p class="invite-card__email">{{ user.email }}</p>
      </div>
    </div>
    <div class="modal-delete__buttons">
      <button class="modal-delete__button" type="button">
        cancel
      </button>
      <button class="modal-delete__button modal-delete__button--accept" type="button">
        remove
      </button>
    </div>
  </Modal>
</template>
