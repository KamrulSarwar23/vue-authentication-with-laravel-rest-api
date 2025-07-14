<script setup>
import { useAuthStore } from "../../stores/auth";

const authStore = useAuthStore();
</script>

<template>
  <div class="dashboard vendor-dashboard">
    <h1>Vendor Dashboard</h1>
    <div class="user-info">
      <h2>Welcome, {{ authStore.user.name }}</h2>
      <p>Email: {{ authStore.user.email }}</p>
      <p>Role: {{ authStore.user.role }}</p>
    </div>

    <div class="vendor-features">
      <h3>Vendor Tools</h3>
      <ul>
        <li>Product Management</li>
        <li>Order Tracking</li>
        <li>Sales Reports</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.vendor-dashboard {
  background-color: #f8f9fa;
  border-left: 4px solid #fd7e14;
}
</style>