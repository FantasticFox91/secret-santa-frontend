<template>
    <InviteCardPast :user="pair.santa" santa />
    <div class="pairing-list__line"></div>
    <InviteCardSecret 
      :class="{'invite-card--active': isActive}" 
      v-if="isHide && secret" 
      @click="onSecretClick"
    />
    <InviteCardPast v-else :user="pair.person" />
</template>

<script setup lang='ts'>
import './pairing-item.scss';

interface PairingProps {
  pair: {
    santa: {},
    person: {},
  },
  secret?: boolean
}

const props = defineProps<PairingProps>();

const authStore = useAuthStore();

const isHide = ref(true);

const isActive = computed(() => authStore.user.id === props.pair.santa.id || authStore.isAdmin());

const onSecretClick = () => {
  if (authStore.isAdmin()) {
    isHide.value = !isHide.value
    return
  } else if (isActive.value){
    isHide.value = !isHide.value;
    return;
  }
}
</script>
