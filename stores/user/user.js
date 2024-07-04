import { defineStore } from 'pinia';
import { useAuthStore } from '../auth/auth';

export const useUserStore = defineStore('user', () => {
  const { $api } = useNuxtApp();
  const authStore = useAuthStore();
  const myWishListShown = ref(false);
  const userEvent = ref(null);
  const userSlidePanel = ref('editEvent');
  const user = ref(null);
  const wishlist = ref([
    {
      site: 'test.com',
      title: 'test',
      description: 'Test',
      image: 'https://placehold.co/600x400',
    }
  ]);

  const mainUser = computed(() => authStore.user);

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
    user.value = {user: mainUser.value};
    myWishListShown.value = true;
  }

  const showUserWishList = async (userId, eventId) => {
    const response = await $api.user.getUserWishlist(userId, eventId);
    wishlist.value = response.wishList;

    const userInfo = userEvent.value.userStatus.find((el) => el.userId === userId);

    user.value = userInfo;

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

  const acceptInvitation = async (data) => {
    const response = await $api.user.acceptInvitation(data);
    navigateTo({path: '/login'});
  }
  
  return { 
    userEvent,
    userSlidePanel,
    myWishListShown,
    user,
    wishlist,
    createGroup,
    showMyWishList,
    hideMyWishList,
    getUserEvent,
    showEditEvent,
    updateEvent,
    getRSVPEvent,
    declineInvitation,
    acceptInvitation,
    showUserWishList
  }
})
