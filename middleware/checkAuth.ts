import { storeToRefs } from "pinia";
import { useAuthStore } from "../stores/auth/auth.js";
import { useUserStore } from "../stores/user/user.js";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const { $api } = useNuxtApp();
  const authStore = useAuthStore();
  const userStore = useUserStore();
  const { isAuth } = storeToRefs(authStore);

  if (!isAuth.value) {
    const tokenCookie = useCookie('authToken');
    const authToken = tokenCookie.value;
    
    if (authToken) {
      const authenticateAndFetchData = async () => {
        $api.setToken(authToken);
        const response = await $api.auth.loginByToken();
        authStore.user = response;
        await userStore.getUserEvent();
        
        if (to.name === 'wishlist') {
          userStore.user = { user: response };
          await userStore.getUserWishlist();
        }
      };

      await authenticateAndFetchData();
      return;
    } else {
      return navigateTo("/login");
    }
  }
});
