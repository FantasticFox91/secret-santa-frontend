import { defineStore } from 'pinia';
import { useAuthStore } from '../auth/auth';
import { useEventStore } from '../event/event';

export const useUserStore = defineStore('user', () => {
  const { $api } = useNuxtApp();
  const authStore = useAuthStore();
  const eventStore = useEventStore();
  const myWishListShown = ref(false);
  const userEvents = ref(null);
  const userSlidePanel = ref('editEvent');
  const user = ref(null);
  const wishlist = ref([]);
  const pastEvents = ref([]);

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
    const response = await $api.user.getUserEvent();
    eventStore.setCurrentEvent(response.event[0]);
    userEvents.value = response.event;
  }

  const getRSVPEvent = async (eventId) => {
    const response = await $api.user.getEvent(eventId);
    eventStore.setCurrentEvent(response.event);
  }

  const addItemsToWishlist = async (items, eventId) => {
    const response = await $api.wishlist.addItems(items, eventId);
  }

  const showMyWishList = async () => {
    userSlidePanel.value = 'wishlist';
    user.value = {user: mainUser.value};
    const response = await $api.user.getUserWishlist(user.value.user.id, eventStore.currentEvent.id);
    wishlist.value = response.wishList;
    myWishListShown.value = true;
  }

  const showUserWishList = async (userId, eventId) => {
    const response = await $api.user.getUserWishlist(userId, eventId);
    wishlist.value = response.wishList;

    const userInfo = eventStore.currentEvent.value.userStatus.find((el) => el.userId === userId);

    user.value = userInfo;

    userSlidePanel.value = 'wishlist';
    myWishListShown.value = true;
  }

  const showUserEdit = () => {
    userSlidePanel.value = 'userEdit';
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

  const getUserWishlist = async () => {
    const response = await $api.user.getUserWishlist(user.value.user.id, eventStore.currentEvent.id);
    wishlist.value = response.wishList;
  }

  const matchUsers = async () => {
    const response = await $api.user.matchUsers(eventStore.currentEvent.id);
  }

  const getUserById = async (userId) => {
    const response = await $api.user.getUserById(userId);
    return response;
  }

  const sendThankyouMessage = async (santaId, eventId, message) => {
    const response = await $api.thankYou.sentThankYouMessage(santaId, eventId, message);
    return response;
  }

  const getPastEvents = async () => {
    const response = await $api.user.getUserPastEvents();
    pastEvents.value = response;
  }

  const updateUserInfo = async (user) => {
    const authStore = useAuthStore();
    const response = await $api.user.updateUserInfo(user);
    user.value = { user: response};
    authStore.user = response;
    myWishListShown.value = false;
  }
  
  return { 
    userSlidePanel,
    myWishListShown,
    user,
    wishlist,
    userEvents,
    pastEvents,
    createGroup,
    showMyWishList,
    hideMyWishList,
    getUserEvent,
    showEditEvent,
    updateEvent,
    getRSVPEvent,
    declineInvitation,
    acceptInvitation,
    showUserWishList,
    addItemsToWishlist,
    getUserWishlist,
    matchUsers,
    getUserById,
    sendThankyouMessage,
    getPastEvents,
    showUserEdit,
    updateUserInfo,
  }
})
