import { defineStore } from 'pinia';
import { useAuthStore } from '../auth/auth';

export const useUserStore = defineStore('user', () => {
  const { $api } = useNuxtApp();
  const myWishListShown = ref(false);
  const userEvent = ref(null);
  const userSlidePanel = ref('editEvent');
  const user = ref(null);

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

  const getRSVPEvent = async (eventId) => {
    const response = await $api.user.getEvent(eventId);
    userEvent.value = response.event;
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

  const declineInvitation = async (email) => {
    await $api.user.declineInvitation(email)
  }
  
  return { 
    userEvent,
    userSlidePanel,
    myWishListShown,
    user,
    createGroup,
    showMyWishList,
    hideMyWishList,
    getUserEvent,
    showEditEvent,
    updateEvent,
    getRSVPEvent,
    declineInvitation
  }
})
