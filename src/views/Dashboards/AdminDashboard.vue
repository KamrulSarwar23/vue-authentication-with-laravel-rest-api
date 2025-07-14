<script setup>
import { useAuthStore } from "../../stores/auth";

const authStore = useAuthStore();
</script>

<template>
  <div class="dashboard admin-dashboard">
    <h1>Admin Dashboard</h1>
    <div class="user-info">
      <h2>Welcome, {{ authStore.user.name }}</h2>
      <p>Email: {{ authStore.user.email }}</p>
      <p>Role: {{ authStore.user.role }}</p>
    </div>

    <div class="admin-features">
      <h3>Admin Privileges</h3>
      <ul>
        <li>User Management</li>
        <li>System Configuration</li>
        <li>Analytics Dashboard</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.admin-dashboard {
  background-color: #f8f9fa;
  border-left: 4px solid #dc3545;
}
</style>