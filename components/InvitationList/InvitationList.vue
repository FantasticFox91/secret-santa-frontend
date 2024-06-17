
import type login from '~/server/api/login';

import type login from '~/server/api/login';
<script setup>
import './invitation-list.scss';
import { useMainStore } from '../../stores/main/main';

const mainStore = useMainStore();

</script>

<template>
  <ul class="invitation-list">
    <InviteCard v-for="user in mainStore.users" :user="user" :key="user.id" />
  </ul>
</template>
