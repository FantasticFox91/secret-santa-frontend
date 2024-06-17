import { storeToRefs } from "pinia";
import { useAuthStore } from "../stores/auth/auth.js";

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();
  const { isAuth } = storeToRefs(authStore);
  if (!isAuth.value) {
    return navigateTo("/login");
  }
});
