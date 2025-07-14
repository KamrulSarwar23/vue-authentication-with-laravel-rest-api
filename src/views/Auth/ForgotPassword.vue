<script setup>
import { ref } from "vue";
import { useAuthStore } from "../../stores/auth";

const authStore = useAuthStore();

const form = ref({
  email: "",
});

const errors = ref({});
const loading = ref(false);
const success = ref(false);

async function handleForgotPassword() {
  loading.value = true;
  errors.value = {};

  try {
    await authStore.forgotPassword({ email: form.value.email });
    success.value = true;
  } catch (error) {
    if (error.errors) {
      errors.value = error.errors;
    } else {
      errors.value = { general: [error.message || "Password reset failed"] };
    }
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="auth-container">
    <h2>Forgot Password</h2>

    <div v-if="success" class="alert alert-success">
      Password reset link has been sent to your email!
    </div>

    <form v-else @submit.prevent="handleForgotPassword">
      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          v-model="form.email"
          :class="{ 'is-invalid': errors.email }"
        />
        <div v-if="errors.email" class="invalid-feedback">
          {{ errors.email[0] }}
        </div>
      </div>

      <div v-if="errors.general" class="alert alert-danger">
        {{ errors.general[0] }}
      </div>

      <button type="submit" :disabled="loading">
        {{ loading ? "Sending..." : "Send Reset Link" }}
      </button>

      <div class="auth-links">
        <router-link :to="{ name: 'login' }">Back to Login</router-link>
      </div>
    </form>
  </div>
</template>