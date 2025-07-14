<script setup>
import { useAuthStore } from "../stores/auth";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

const isAuthenticated = computed(() => authStore.isAuthenticated);
const mobileMenuOpen = ref(false);
const userRole = computed(() => authStore.user?.role);

function handleLogout() {
  authStore.logout();
  router.push({ name: "home" });
  mobileMenuOpen.value = false;
}

function toggleMobileMenu() {
  mobileMenuOpen.value = !mobileMenuOpen.value;
}
</script>

<template>
  <nav class="navbar">
    <div class="nav-container">
      <!-- Logo with modern gradient -->
      <router-link :to="{ name: 'home' }" class="logo">
        <div class="logo-icon">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="8" fill="url(#gradient)" />
            <path
              d="M8 12L16 8L24 12V20C24 21.1046 23.1046 22 22 22H10C8.89543 22 8 21.1046 8 20V12Z"
              fill="white"
              opacity="0.9"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color: #667eea" />
                <stop offset="100%" style="stop-color: #764ba2" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <span class="logo-text">My App</span>
      </router-link>

      <!-- Modern hamburger menu -->
      <button
        class="hamburger"
        @click="toggleMobileMenu"
        :class="{ active: mobileMenuOpen }"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <!-- Navigation links with backdrop blur -->
      <div class="nav-links" :class="{ open: mobileMenuOpen }">
        <div class="nav-backdrop" @click="mobileMenuOpen = false"></div>
        <div class="nav-menu">
          <template v-if="!isAuthenticated">
            <router-link
              :to="{ name: 'login' }"
              @click="mobileMenuOpen = false"
              class="nav-link"
            >
              <span class="link-text">Login</span>
            </router-link>
            <router-link
              :to="{ name: 'register' }"
              @click="mobileMenuOpen = false"
              class="nav-link primary-btn"
            >
              <span class="link-text">Get Started</span>
            </router-link>
          </template>

          <template v-else>
            <router-link
              v-if="userRole === 'admin'"
              :to="{ name: 'admin-dashboard' }"
              @click="mobileMenuOpen = false"
              class="nav-link user-link"
            >
              <div class="link-icon">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    d="M12 2L2 7v10c0 5.55 3.84 10 9 11 5.16-1 9-5.45 9-11V7l-10-5z"
                  />
                  <path d="M9 12l2 2 4-4" />
                </svg>
              </div>
              <span class="link-text user-name">{{ authStore.user.name }}</span>
            </router-link>

            <router-link
              v-if="userRole === 'vendor'"
              :to="{ name: 'vendor-dashboard' }"
              @click="mobileMenuOpen = false"
              class="nav-link user-link"
            >
              <div class="link-icon">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    d="M3 9L12 2L21 9V20A2 2 0 0 1 19 22H5A2 2 0 0 1 3 20V9Z"
                  />
                  <polyline points="9,22 9,12 15,12 15,22" />
                </svg>
              </div>
              <span class="link-text user-name">{{ authStore.user.name }}</span>
            </router-link>

            <router-link
              v-if="userRole === 'customer'"
              :to="{ name: 'customer-dashboard' }"
              @click="mobileMenuOpen = false"
              class="nav-link user-link"
            >
              <div class="link-icon">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path d="M20 21V19A4 4 0 0 0 16 15H8A4 4 0 0 0 4 19V21" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <span class="link-text user-name">{{ authStore.user.name }}</span>
            </router-link>

            <button @click="handleLogout" class="logout-btn">
              <div class="link-icon">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path d="M9 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H9" />
                  <polyline points="16,17 21,12 16,7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
              </div>
              <span class="link-text">Logout</span>
            </button>
          </template>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
/* Base Navbar Styles */
.navbar {
  background: rgba(15, 23, 42, 0.95);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 1000;
  transition: all 0.3s ease;
}

.nav-container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
}

/* Modern Logo */
.logo {
  color: white;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  transition: transform 0.2s ease;
}

.logo:hover {
  transform: translateY(-1px);
}

.logo-icon {
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
}

.logo-text {
  font-size: 1.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Modern Hamburger Menu */
.hamburger {
  display: none;
  flex-direction: column;
  gap: 4px;
  cursor: pointer;
  background: none;
  border: none;
  padding: 0.5rem;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.hamburger:hover {
  background: rgba(255, 255, 255, 0.1);
}

.hamburger span {
  display: block;
  width: 24px;
  height: 2px;
  background: white;
  border-radius: 2px;
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.hamburger.active span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.hamburger.active span:nth-child(2) {
  opacity: 0;
  transform: scale(0);
}

.hamburger.active span:nth-child(3) {
  transform: rotate(-45deg) translate(6px, -6px);
}

/* Navigation Links */
.nav-links {
  display: flex;
  transition: all 0.3s ease;
}

.nav-menu {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

/* Enhanced navigation link styles with better alignment */
.nav-link {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  padding: 0.75rem 1rem;
  border-radius: 12px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
  position: relative;
  overflow: hidden;
  min-height: 44px; /* Consistent minimum height */
}

/* Specific styling for user links */
.user-link {
  padding: 0.75rem 1.25rem;
  gap: 0.75rem;
}

/* Icon container for consistent alignment */
.link-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

/* Text styling with proper alignment */
.link-text {
  display: flex;
  align-items: center;
  line-height: 1.5;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Specific styling for user names */
.user-name {
  font-weight: 600;
}

.nav-link::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    rgba(102, 126, 234, 0.2),
    rgba(118, 75, 162, 0.2)
  );
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: -1;
}

.nav-link:hover {
  color: white;
  transform: translateY(-2px);
}

.nav-link:hover::before {
  opacity: 1;
}

.nav-link.router-link-exact-active {
  color: white;
  background: linear-gradient(
    135deg,
    rgba(102, 126, 234, 0.3),
    rgba(118, 75, 162, 0.3)
  );
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.2);
}

.primary-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white !important;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.primary-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}

.logout-btn {
  color: rgba(255, 255, 255, 0.8);
  background: none;
  border: none;
  cursor: pointer;
  font: inherit;
  padding: 0.75rem 1.25rem;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 500;
  transition: all 0.3s ease;
  min-height: 44px;
}

.logout-btn:hover {
  color: #ef4444;
  background: rgba(239, 68, 68, 0.1);
  transform: translateY(-2px);
}

.nav-backdrop {
  display: none;
}

/* Responsive Design */
@media (max-width: 768px) {
  .hamburger {
    display: flex;
    z-index: 1001;
  }

  .nav-links {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    transform: translateX(-100%);
    opacity: 0;
    pointer-events: none;
    transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }

  .nav-backdrop {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  }

  .nav-menu {
    position: relative;
    z-index: 1002;
    background: rgba(15, 23, 42, 0.95);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    width: 320px;
    height: 100vh;
    padding: 6rem 2rem 2rem;
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
    border-right: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 0 50px rgba(0, 0, 0, 0.3);
  }

  .nav-links.open {
    transform: translateX(0);
    opacity: 1;
    pointer-events: all;
  }

  .nav-link,
  .logout-btn {
    font-size: 1.1rem;
    padding: 1rem 1.5rem;
    justify-content: flex-start;
    border-radius: 16px;
    gap: 1rem;
  }

  /* Better mobile alignment */
  .user-link {
    padding: 1rem 1.5rem;
  }

  .link-icon {
    width: 24px;
    height: 24px;
  }

  .user-name {
    max-width: 200px; /* More space on mobile */
  }

  .nav-link:hover,
  .logout-btn:hover {
    transform: translateX(8px);
  }
}

/* Animation keyframes */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.nav-link {
  animation: fadeInUp 0.3s ease forwards;
}

.nav-link:nth-child(1) {
  animation-delay: 0.1s;
}
.nav-link:nth-child(2) {
  animation-delay: 0.2s;
}
.nav-link:nth-child(3) {
  animation-delay: 0.3s;
}
.logout-btn {
  animation-delay: 0.4s;
}
</style>