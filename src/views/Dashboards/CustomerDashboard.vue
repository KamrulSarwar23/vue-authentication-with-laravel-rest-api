<script setup>
import { useAuthStore } from "../../stores/auth";

const authStore = useAuthStore();
</script>

<template>
  <div class="dashboard customer-dashboard">
    <h1>Customer Dashboard</h1>
    <div class="user-info">
      <h2>Welcome, {{ authStore.user.name }}</h2>
      <p>Email: {{ authStore.user.email }}</p>
      <p>Role: {{ authStore.user.role }}</p>
    </div>

    <div class="customer-features">
      <h3>Your Account</h3>
      <ul>
        <li>Order History</li>
        <li>Wishlist</li>
        <li>Account Settings</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.customer-dashboard {
  background-color: #f8f9fa;
  border-left: 4px solid #28a745;
}
</style>