<script setup>
import { ref, onMounted } from "vue";
import { useAuthStore } from "../../stores/auth";
import { useRoute, useRouter } from "vue-router";

const authStore = useAuthStore();
const route = useRoute();
const router = useRouter();

const form = ref({
  token: "",
  email: "",
  password: "",
  password_confirmation: "",
});

const errors = ref({});
const loading = ref(false);
const success = ref(false);

onMounted(() => {
  form.value.token = route.query.token || "";
  form.value.email = route.query.email || "";
});

async function handleResetPassword() {
  loading.value = true;
  errors.value = {};

  try {
    await authStore.resetPassword(form.value);
    success.value = true;
    setTimeout(() => {
      router.push({ name: "login" });
    }, 2000);
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
    <h2>Reset Password</h2>

    <div v-if="success" class="alert alert-success">
      Password reset successfully! Redirecting to login...
    </div>

    <form v-else @submit.prevent="handleResetPassword">
      <input type="hidden" v-model="form.token" />

      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          v-model="form.email"
          :class="{ 'is-invalid': errors.email }"
          readonly
        />
        <div v-if="errors.email" class="invalid-feedback">
          {{ errors.email[0] }}
        </div>
      </div>

      <div class="form-group">
        <label for="password">New Password</label>
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
        <label for="password_confirmation">Confirm New Password</label>
        <input
          type="password"
          id="password_confirmation"
          v-model="form.password_confirmation"
        />
      </div>

      <div v-if="errors.general" class="alert alert-danger">
        {{ errors.general[0] }}
      </div>

      <button type="submit" :disabled="loading">
        {{ loading ? "Resetting..." : "Reset Password" }}
      </button>
    </form>
  </div>
</template>