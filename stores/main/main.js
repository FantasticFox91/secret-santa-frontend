import { defineStore } from 'pinia';

export const useMainStore = defineStore('main', () => {
  const { $api } = useNuxtApp();
  const count = ref(0);
  const deleteUserId = ref('');
  const burgerShown = ref(false);
  const users = ref([
      {
        id: 1,
        name: 'Dianne Russell',
        email: 'drussell@example.com',
        status: 'available',
        avatarSrc: '/_nuxt/assets/images/avatar-01.png'
      },
      {
        id: 2,
        name: 'Ralph Edwards',
        email: 'ralph.edwards@example.com',
        status: 'unknown',
        avatarSrc: '/_nuxt/assets/images/avatar-02.png'
      },
      {
        id: 3,
        name: 'Robert Fox',
        email: 'r.fox@example.com',
        status: 'unavailable',
        avatarSrc: '/_nuxt/assets/images/avatar-03.png'
      },
      {
        id: 4,
        name: 'Brooklyn Simmons',
        email: 'brooklyn.simmons@example.com',
        status: 'unavailable',
        avatarSrc: '/_nuxt/assets/images/avatar-04.png'
      },
      {
        id: 5,
        name: 'Darlene Robertson',
        email: 'darlene@example.com',
        status: 'unknown',
        avatarSrc: '/_nuxt/assets/images/avatar-06.png'
      },
  ]);

  const addUser = async (data) => {
    const authStore = useAuthStore();
    const token = authStore.accessToken;
    const response = await $api.user.inviteUser(data, token);
  }

  const getUserById = (id) => {
    return users.value.filter((a) => a.id === id)[0];
  }

  const showBurger = () => {
    burgerShown.value = true;
  }

  const hideBurger = () => {
    burgerShown.value = false;
  }

  const getUrlMeta = (url) => {
    return $api.link.getMetadata(url);
  }

  return { count, users, deleteUserId, burgerShown, addUser, getUserById, showBurger, hideBurger, getUrlMeta }
})
