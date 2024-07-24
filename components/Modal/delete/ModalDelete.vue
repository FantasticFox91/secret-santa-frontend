
<script setup>
import './modal-delete.scss';
import Modal from '../default/Modal';
import { useMainStore } from '@/stores/main/main';

const { $modals } = useNuxtApp();
const mainStore = useMainStore();
const userStore = useUserStore();
const { deleteUser } = storeToRefs(mainStore);

const onConfirmButtonClick = () => {
  userStore.deleteInvitation(deleteUser.value.user.id, deleteUser.value.id);
  $modals.close();
}

</script>

<template>
  <Modal class="modal-delete" name="delete">
    <h2 class="modal__heading">Are you sure you want to remove this?</h2>
    <div class="invite-card modal-delete__card" v-if="deleteUser">
      <Avatar class="invite-card__avatar" :name="deleteUser.user.firstName" status="" :imageSrc="deleteUser.avatar"/>
      <div class="invite-card__info">
        <p class="invite-card__name">{{ `${deleteUser.user.firstName} ${deleteUser.user.lastName}` }}</p>
        <p class="invite-card__email">{{ deleteUser.user.email }}</p>
      </div>
    </div>
    <div class="modal-delete__buttons">
      <button class="modal-delete__button" type="button" @click="$modals.close()">
        cancel
      </button>
      <button class="modal-delete__button modal-delete__button--accept" type="button" @click="onConfirmButtonClick">
        remove
      </button>
    </div>
  </Modal>
</template>
