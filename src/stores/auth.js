import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useApi } from "../composables/useApi";

export const useAuthStore = defineStore("auth", () => {
  const router = useRouter();
  const { api } = useApi();
  const user = ref(null);
  const token = ref(localStorage.getItem("token"));
  const isAuthenticated = computed(() => !!token.value);

  async function login(credentials) {
    try {
      const response = await api.post("/login", credentials);

      token.value = response.data.token;
      localStorage.setItem("token", token.value);

      await fetchUser(); // Populate user

      return response;
    } catch (error) {
      throw error.response;
    }
  }

  async function register(userData) {
    try {
      const response = await api.post("/register", userData);
      return response;
    } catch (error) {
      throw error.response.data;
    }
  }

  async function logout() {
    try {
      await api.post("/logout");
      resetAuth();
      router.push({ name: "home" });
    } catch (error) {
      resetAuth();
      router.push({ name: "home" });
    }
  }

  async function forgotPassword(emailData) {
    // Change parameter name to be more clear
    try {
      const response = await api.post("/forgot-password", emailData); // Send the whole object
      return response;
    } catch (error) {
      throw error.response.data;
    }
  }

  async function resetPassword(resetData) {
    try {
      const response = await api.post("/reset-password", resetData);
      return response;
    } catch (error) {
      throw error.response.data;
    }
  }

  async function fetchUser() {
    try {
      const response = await api.get("/profile");
      user.value = response.data.user;
      return response;
    } catch (error) {
      throw error.response.data;
    }
  }

  function resetAuth() {
    user.value = null;
    token.value = null;
    localStorage.removeItem("token");
  }

  async function initialize() {
    if (token.value && !user.value) {
      try {
        await fetchUser();
      } catch (e) {
        resetAuth(); // Invalid token
      }
    }
  }

  return {
    user,
    token,
    isAuthenticated,
    login,
    register,
    logout,
    forgotPassword,
    resetPassword,
    fetchUser,
    resetAuth,
    initialize,
  };
});
