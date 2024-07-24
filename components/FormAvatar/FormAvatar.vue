<script setup>
import './form-avatar.scss';
import { ref } from 'vue';

const props = defineProps({
  avatarSrc: {
    type: String
  }
})

const userAvatar = ref('');

const emits = defineEmits(['update']);

const onAvatarChange = (e) => {
  const bytesInMb = 1048576;
  if (e.target.files[0].size / bytesInMb > 5) {
    alert("Фото слишком большое, размер фотографии не должен превышать 5Mb");
    e.target.value = '';
  } else {
    const tempUrl = URL.createObjectURL(e.target.files[0]);
    userAvatar.value = tempUrl
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
      const tempUrl = URL.createObjectURL(file);
      userAvatar.value = tempUrl
      emits('update', file);
    }
  }
};

const onDragOver = (e) => {
  e.preventDefault();
};

const onRemoveAvatarButtonClick = () => {
  emits('update', null);
  userAvatar.value = null;
}

onMounted(() => {
 userAvatar.value = props.avatarSrc;
})
</script>

<template>
  <div class="form-avatar" @drop.prevent="onDrop" @dragover.prevent="onDragOver">
    <input class="visually-hidden" id="avatar" type="file" accept="image/png, image/jpeg, image/jpg" @change="onAvatarChange" />
    <div class="form-avatar__dropbox" v-if="!userAvatar">
      <div class="form-avatar__labels" v-if="!userAvatar">
        <label class="form-avatar__label form-avatar__label--big" for="avatar">Avatar</label>
        <label class="form-avatar__label" for="avatar">Drag and Drop an Image</label>
        <label class="form-avatar__label" for="avatar">
          <svg-icon name="download" width="32" height="32" />
        </label>
      </div>
      <p v-else class="form-avatar__label form-avatar__label--big">{{ userAvatar }}</p>
    </div>
    <div class="form-avatar__exist-avatar" v-else>
      <img class="form-avatar__avatar" :src="userAvatar" width="100" height="100" />
      <button class="form-avatar__remove-button" type="button" @click="onRemoveAvatarButtonClick">remove avatar</button>
    </div>
  </div>
</template>
