<script setup>
import { ref } from "vue";
import { useAuthStore } from "../../stores/auth";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

const form = ref({
  email: "",
  password: "",
});

const errors = ref({});
const loading = ref(false);
const showPassword = ref(false);

async function handleLogin() {
  loading.value = true;
  errors.value = {};

  try {
    await authStore.login({ ...form.value });

    switch (authStore.user?.role) {
      case "admin":
        router.push({ name: "admin-dashboard" });
        break;
      case "vendor":
        router.push({ name: "vendor-dashboard" });
        break;
      default:
        router.push({ name: "customer-dashboard" });
    }
  } catch (error) {
    if (error?.data?.errors) {
      errors.value = error.data.errors;
    } else {
      errors.value = {
        general: [error?.data?.message || "Login failed. Please try again."],
      };
    }
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="auth-container">
    <div class="auth-header">
      <h2>Welcome Back</h2>
      <p>Please enter your credentials to login</p>
    </div>

    <form @submit.prevent="handleLogin" class="auth-form">
      <div class="form-group">
        <label for="email">Email Address</label>
        <div class="input-wrapper">
          <input
            type="email"
            id="email"
            v-model="form.email"
            placeholder="Enter your email"
            :class="{ 'input-error': errors.email }"
            autocomplete="username"
          />
        </div>
        <div v-if="errors.email" class="error-message">
          {{ errors.email[0] }}
        </div>
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <div class="input-wrapper">
          <input
            type="password"
            id="password"
            v-model="form.password"
            placeholder="Enter your password"
            :class="{ 'input-error': errors.password }"
            autocomplete="current-password"
          />
        </div>
        <div v-if="errors.password" class="error-message">
          {{ errors.password[0] }}
        </div>
      </div>

      <div class="form-options">
        <router-link :to="{ name: 'forgot-password' }" class="forgot-password">
          Forgot Password?
        </router-link>
      </div>

      <button
        type="submit"
        class="auth-button primary"
        :disabled="loading"
        :class="{ loading: loading }"
      >
        <span v-if="!loading">Login</span>
        <span v-else class="button-loader"></span>
      </button>

      <div v-if="errors.general" class="auth-error">
        <i class="fas fa-exclamation-circle"></i>
        {{ errors.general[0] }}
      </div>

      <div class="auth-footer">
        <p>
          Don't have an account?
          <router-link :to="{ name: 'register' }" class="auth-link">
            Sign up
          </router-link>
        </p>
      </div>
    </form>
  </div>
</template>

<style scoped>
.auth-container {
  max-width: 450px;
  margin: 2rem auto;
  padding: 2.5rem;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
}

.auth-header {
  text-align: center;
  margin-bottom: 2rem;
}

.auth-header h2 {
  font-size: 1.8rem;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.auth-header p {
  color: #7f8c8d;
  font-size: 0.95rem;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-size: 0.9rem;
  color: #2c3e50;
  font-weight: 500;
}

.input-wrapper {
  position: relative;
}

.input-wrapper .input-icon {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #95a5a6;
  font-size: 1rem;
}

input {
  width: 100%;
  padding: 0.8rem 1rem 0.8rem 2.5rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 0.95rem;
  transition: border-color 0.3s;
}

input:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
}

.input-error {
  border-color: #e74c3c !important;
}

.input-error:focus {
  box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.2) !important;
}

.password-toggle {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #95a5a6;
  cursor: pointer;
  font-size: 1rem;
}

.password-toggle:hover {
  color: #3498db;
}

.error-message {
  color: #e74c3c;
  font-size: 0.8rem;
  margin-top: 0.2rem;
}

.form-options {
  display: flex;
  justify-content: flex-end;
}

.forgot-password {
  color: #3498db;
  font-size: 0.85rem;
  text-decoration: none;
}

.forgot-password:hover {
  text-decoration: underline;
}

.auth-button {
  width: 100%;
  padding: 0.9rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  position: relative;
}

.auth-button.primary {
  background-color: #3498db;
  color: white;
}

.auth-button.primary:hover {
  background-color: #2980b9;
}

.auth-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.button-loader {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.auth-error {
  color: #e74c3c;
  background-color: #fdecea;
  padding: 0.8rem;
  border-radius: 8px;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.auth-footer {
  text-align: center;
  margin-top: 1rem;
  color: #7f8c8d;
  font-size: 0.9rem;
}

.auth-link {
  color: #3498db;
  text-decoration: none;
  font-weight: 500;
}

.auth-link:hover {
  text-decoration: underline;
}

@media (max-width: 480px) {
  .auth-container {
    padding: 1.5rem;
    margin: 1rem;
  }
}
</style>