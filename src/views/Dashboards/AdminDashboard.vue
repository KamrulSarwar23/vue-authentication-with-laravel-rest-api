<script setup>
import { useAuthStore } from "../../stores/auth";
import { RouterView } from "vue-router";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();
function handleLogout() {
  authStore.logout();
  router.push({ name: "home" });
}
</script>

<template>
  <div class="dashboard-layout">
    <!-- Sidebar -->
    <aside class="sidebar">
      <div class="sidebar-header">
        <h2>Admin Panel</h2>
      </div>

      <div class="user-info">
        <h3>{{ authStore.user.name }}</h3>
        <p>{{ authStore.user.email }}</p>
        <p class="role-badge">{{ authStore.user.role }}</p>
      </div>

      <nav class="sidebar-nav">
        <router-link :to="{ name: 'admin-dashboard' }" class="nav-link">
          <span class="icon">🏠</span>
          <span>Dashboard</span>
        </router-link>

        <router-link :to="{ name: 'DashboardHome' }" class="nav-link">
          <span class="icon">🏠</span>
          <span>Tasks</span>
        </router-link>
      </nav>

      <div class="sidebar-footer">
        <button class="logout-btn" @click="handleLogout()">Logout</button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="main-content">
      <header class="content-header">
        <h1>Admin Dashboard</h1>
        <div class="header-actions">
          <button class="notification-btn">🔔</button>
        </div>
      </header>

      <div class="content-wrapper">
        <RouterView />

        <!-- Dashboard Overview (shown on DashboardHome) -->
        <div
          v-if="$route.name === 'admin-dashboard'"
          class="dashboard-overview"
        >
          <div class="stats-cards">
            <div class="stat-card">
              <h3>Total Users</h3>
              <p class="stat-value">1,245</p>
              <p class="stat-change">↑ 12% from last month</p>
            </div>
            <div class="stat-card">
              <h3>Active Sessions</h3>
              <p class="stat-value">87</p>
              <p class="stat-change">↓ 3% from yesterday</p>
            </div>
            <div class="stat-card">
              <h3>System Health</h3>
              <p class="stat-value">98%</p>
              <p class="stat-change">Stable</p>
            </div>
          </div>

          <div class="recent-activity">
            <h2>Recent Activity</h2>
            <ul class="activity-list">
              <li>User "JohnDoe" updated profile</li>
              <li>New user registered</li>
              <li>System backup completed</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.dashboard-layout {
  display: flex;
  min-height: 90vh;
  background-color: #f5f7fa;
}

.sidebar {
  width: 280px;
  background-color: #2c3e50;
  color: white;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
}

.sidebar-header {
  padding: 0 20px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.sidebar-header h2 {
  margin: 0;
  font-size: 1.5rem;
}

.user-info {
  padding: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.user-info h3 {
  margin: 0 0 5px;
  font-size: 1.2rem;
}

.user-info p {
  margin: 5px 0;
  font-size: 0.9rem;
  color: #ecf0f1;
}

.role-badge {
  display: inline-block;
  background-color: #e74c3c;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 0.8rem;
  margin-top: 5px;
}

.sidebar-nav {
  flex: 1;
  padding: 20px 0;
  overflow-y: auto;
}

.nav-section {
  margin-top: 20px;
  padding: 0 20px;
}

.nav-section h4 {
  color: #bdc3c7;
  font-size: 0.9rem;
  text-transform: uppercase;
  margin: 15px 0 10px;
}

.nav-link {
  display: flex;
  align-items: center;
  padding: 12px 20px;
  color: #ecf0f1;
  text-decoration: none;
  transition: all 0.3s;
}

.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.nav-link.router-link-exact-active {
  background-color: #3498db;
}

.nav-link .icon {
  margin-right: 10px;
  font-size: 1.1rem;
}

.sidebar-footer {
  padding: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.logout-btn {
  width: 100%;
  padding: 10px;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.logout-btn:hover {
  background-color: #c0392b;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.content-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

.content-header h1 {
  margin: 0;
  font-size: 1.5rem;
  color: #2c3e50;
}

.header-actions {
  display: flex;
  gap: 15px;
}

.notification-btn {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
}

.content-wrapper {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}

.dashboard-overview {
  max-width: 1200px;
  margin: 0 auto;
}

.stats-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.stat-card {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.stat-card h3 {
  margin: 0 0 10px;
  font-size: 1rem;
  color: #7f8c8d;
}

.stat-value {
  font-size: 2rem;
  font-weight: bold;
  margin: 0 0 5px;
  color: #2c3e50;
}

.stat-change {
  margin: 0;
  font-size: 0.9rem;
  color: #95a5a6;
}

.recent-activity {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.recent-activity h2 {
  margin: 0 0 15px;
  font-size: 1.2rem;
  color: #2c3e50;
}

.activity-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.activity-list li {
  padding: 10px 0;
  border-bottom: 1px solid #ecf0f1;
}

.activity-list li:last-child {
  border-bottom: none;
}

@media (max-width: 768px) {
  .dashboard-layout {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
    height: auto;
  }

  .main-content {
    width: 100%;
  }
}
</style>