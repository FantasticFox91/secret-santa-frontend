import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', () => {
  const { $api } = useNuxtApp();

  const isAuth = ref(false);
  const accessToken = ref('');
  
  const registration = async (data) => {
    const response = await $api.auth.registration(data);
    if (response !== null) {
      navigateTo({path: '/login'})
    }
  }

  const login = async (data) => {
    const response = await $api.auth.login(data);
    if (response.accessToken) {
      isAuth.value = true;
      accessToken.value = response.accessToken;
      navigateTo({path: '/'})
    }
  }

  return { registration, login, isAuth, accessToken }
})
