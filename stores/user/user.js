import { defineStore } from 'pinia';
import { useAuthStore } from '../auth/auth';

export const useUserStore = defineStore('user', () => {
  const { $api } = useNuxtApp();
  const myWishListShown = ref(false);
  const userEvent = ref(null);
  const userSlidePanel = ref('editEvent');

  const createGroup = async (data) => {
    const authStore = useAuthStore();
    const token = authStore.accessToken;
    const response = await $api.user.createGroup(data, token);
    if (response.status.value === 'success') {
      navigateTo({path: '/dashboard'})
    }
  }

  const updateEvent = async (data) => {
    const authStore = useAuthStore();
    const token = authStore.accessToken;
    const response = await $api.user.updateEvent(data, token);
    getUserEvent();
    hideMyWishList();
  }

  const getUserEvent = async () => {
    const authStore = useAuthStore();
    const token = authStore.accessToken;
    const response = await $api.user.getUserEvent(token);
    userEvent.value = response.event[0];
  }

  const showMyWishList = () => {
    userSlidePanel.value = 'wishlist';
    myWishListShown.value = true;
  }

  const hideMyWishList = () => {
    myWishListShown.value = false;
  }

  const showEditEvent = () => {
    userSlidePanel.value = 'editevent';
    myWishListShown.value = true;
  }
  
  return { 
    userEvent,
    userSlidePanel,
    myWishListShown,
    createGroup,
    showMyWishList,
    hideMyWishList,
    getUserEvent,
    showEditEvent,
    updateEvent
  }
})
