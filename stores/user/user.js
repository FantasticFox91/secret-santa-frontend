import { defineStore } from 'pinia';
import { useAuthStore } from '../auth/auth';

export const useUserStore = defineStore('user', () => {
  const { $api } = useNuxtApp();
  const myWishListShown = ref(false);
  const userEvent = ref(null);

  const createGroup = async (data) => {
    const authStore = useAuthStore();
    const token = authStore.accessToken;
    const response = await $api.user.createGroup(data, token);
    if (response.status.value === 'success') {
      navigateTo({path: '/dashboard'})
    }
  }

  const getUserEvent = async () => {
    const authStore = useAuthStore();
    const token = authStore.accessToken;
    const response = await $api.user.getUserEvent(token);
    userEvent.value = response.event[0];
  }

  const showMyWishList = () => {
    myWishListShown.value = true;
  }

  const hideMyWishList = () => {
    myWishListShown.value = false;
  }
  
  return { 
    createGroup,
    myWishListShown,
    showMyWishList,
    hideMyWishList,
    getUserEvent,
    userEvent
  }
})
