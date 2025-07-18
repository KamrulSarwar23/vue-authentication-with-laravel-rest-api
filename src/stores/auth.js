import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useApi } from "../composables/useApi";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export const useAuthStore = defineStore("auth", () => {
  const { api } = useApi();
  const user = ref(null);
  const token = ref(localStorage.getItem("token"));

  const isAuthenticated = computed(() => {
    return !!token.value;
  });

  async function login(credentials) {
    try {
      const response = await api.post("/login", credentials);

      token.value = response.data.token;
      localStorage.setItem("token", token.value);
      await fetchUser();
      setTimeout(() => {
        toast("Login Successfully", { autoClose: 3000 });
      }, 300);
      return response;
    } catch (error) {
      throw error.response;
    }
  }

  async function register(userData) {
    try {
      const response = await api.post("/register", userData);
      setTimeout(() => {
        toast("Register Successfully", { autoClose: 3000 });
      }, 300);
      return response;
    } catch (error) {
      throw error.response.data;
    }
  }

  async function logout() {
    try {
      await api.post("/logout");
      toast("Logout Successfully", {
        autoClose: 3000,
      });
      resetAuth();
    } catch (error) {
      resetAuth();
    }
  }

  async function forgotPassword(emailData) {
    // Change parameter name to be more clear
    try {
      const response = await api.post("/forgot-password", emailData); // Send the whole object
      toast("Reset Email Sent Successfully", {
        autoClose: 3000,
      });
      return response;
    } catch (error) {
      throw error.response.data;
    }
  }

  async function resetPassword(resetData) {
    try {
      const response = await api.post("/reset-password", resetData);
      toast("Password Reset Successfully", {
        autoClose: 3000,
      });
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
        resetAuth();
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
