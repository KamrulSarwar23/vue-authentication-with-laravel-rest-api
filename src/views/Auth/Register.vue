<script setup>
import { ref } from "vue";
import { useAuthStore } from "../../stores/auth";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

const form = ref({
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
  role: "customer",
});

const errors = ref({});
const loading = ref(false);

async function handleRegister() {
  loading.value = true;
  errors.value = {};

  try {
    await authStore.register(form.value);
    router.push({ name: "login" });
  } catch (error) {
    if (error.errors) {
      errors.value = error.errors;
    } else {
      errors.value = { general: [error.message || "Registration failed"] };
    }
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="auth-container">
    <h2>Register</h2>

    <form @submit.prevent="handleRegister">
      <div class="form-group">
        <label for="name">Name</label>
        <input
          type="text"
          id="name"
          v-model="form.name"
          :class="{ 'is-invalid': errors.name }"
        />
        <div v-if="errors.name" class="invalid-feedback">
          {{ errors.name[0] }}
        </div>
      </div>

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

      <div class="form-group">
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          v-model="form.password"
          :class="{ 'is-invalid': errors.password }"
        />
        <div v-if="errors.password" class="invalid-feedback">
          {{ errors.password[0] }}
        </div>
      </div>

      <div class="form-group">
        <label for="password_confirmation">Confirm Password</label>
        <input
          type="password"
          id="password_confirmation"
          v-model="form.password_confirmation"
        />
      </div>

      <div class="form-group">
        <label for="role">Role</label>
        <select id="role" v-model="form.role">
          <option value="customer">Customer</option>
          <option value="vendor">Vendor</option>
        </select>
      </div>

      <div v-if="errors.general" class="alert alert-danger">
        {{ errors.general[0] }}
      </div>

      <button type="submit" :disabled="loading">
        {{ loading ? "Registering..." : "Register" }}
      </button>

      <div class="auth-links">
        <router-link :to="{ name: 'login' }"
          >Already have an account? Login</router-link
        >
      </div>
    </form>
  </div>
</template>