import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', () => {
  const { $api, $asyncLocalStorage } = useNuxtApp();

  const isAuth = ref(false);
  const accessToken = ref('');
  const user = ref({});

  
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
      user.value = response.user;
      const tokenCookie = useCookie('authToken');
      tokenCookie.value = response.accessToken; 
      $asyncLocalStorage.setItem('token', response.accessToken);
      navigateTo({path: '/'})
    }
  }

  const loginByToken = async () => {
    const response = await $api.auth.loginByToken();
    user.value = response;
  }

  return { registration, login, loginByToken, isAuth, accessToken, user }
})
