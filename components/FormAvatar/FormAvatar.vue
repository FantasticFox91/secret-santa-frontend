<script setup>
import './form-avatar.scss';
import { ref } from 'vue';

const userAvatar = ref('');

const emits = defineEmits(['update']);

const onAvatarChange = (e) => {
  const bytesInMb = 1048576;
  if (e.target.files[0].size / bytesInMb > 5) {
    alert("Фото слишком большое, размер фотографии не должен превышать 5Mb");
    e.target.value = '';
  } else {
    userAvatar.value = e.target.files[0].name;
    emits('update', e.target.files[0]);
  }
};

const onDrop = (e) => {
  e.preventDefault();
  const file = e.dataTransfer.files[0];
  if (file) {
    const bytesInMb = 1048576;
    if (file.size / bytesInMb > 5) {
      alert("Фото слишком большое, размер фотографии не должен превышать 5Mb");
    } else {
      userAvatar.value = file.name;
      emits('update', file);
    }
  }
};

const onDragOver = (e) => {
  e.preventDefault();
};
</script>

<template>
  <div class="form-avatar" @drop.prevent="onDrop" @dragover.prevent="onDragOver">
    <input class="visually-hidden" id="avatar" type="file" accept="image/png, image/jpeg, image/jpg" @change="onAvatarChange" />
    <div class="form-avatar__dropbox">
      <div class="form-avatar__labels" v-if="!userAvatar">
        <label class="form-avatar__label form-avatar__label--big" for="avatar">Avatar</label>
        <label class="form-avatar__label" for="avatar">Drag and Drop an Image</label>
        <label class="form-avatar__label" for="avatar">
          <svg-icon name="download" width="32" height="32" />
        </label>
      </div>
      <p v-else class="form-avatar__label form-avatar__label--big">{{ userAvatar }}</p>
    </div>
  </div>
</template>
