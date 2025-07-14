<script setup>
import { useAuthStore } from "../stores/auth";
import { computed } from "vue";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

const isAuthenticated = computed(() => authStore.isAuthenticated);
const userRole = computed(() => authStore.user?.role);

function navigateToDashboard() {
  // Redirect based on user role
  switch (userRole.value) {
    case "admin":
      router.push({ name: "admin-dashboard" });
      break;
    case "vendor":
      router.push({ name: "vendor-dashboard" });
      break;
    default:
      router.push({ name: "customer-dashboard" });
  }
}

function navigateToLogin() {
  router.push({ name: "login" });
}
</script>

<template>
  <div class="home-container">
    <!-- Animated background -->
    <div class="bg-animation">
      <div class="floating-shapes">
        <div class="shape shape-1"></div>
        <div class="shape shape-2"></div>
        <div class="shape shape-3"></div>
        <div class="shape shape-4"></div>
      </div>
    </div>

    <header class="hero-section">
      <div class="hero-content">
        <div class="hero-badge">
          <span class="badge-text">✨ Next-Gen Platform</span>
        </div>

        <h1 class="hero-title">
          Welcome to the
          <span class="gradient-text">Future</span>
        </h1>

        <p class="hero-subtitle">
          Experience seamless role-based authentication with cutting-edge
          security
        </p>

        <div class="cta-section">
          <button
            v-if="isAuthenticated"
            @click="navigateToDashboard"
            class="cta-button primary-cta"
          >
            <span class="button-text">Launch Dashboard</span>
            <div class="button-glow"></div>
          </button>
          <button
            v-else
            @click="navigateToLogin"
            class="cta-button primary-cta"
          >
            <span class="button-text">Get Started</span>
            <div class="button-glow"></div>
          </button>
        </div>
      </div>
    </header>

    <section class="features-section">
      <div class="section-header">
        <h2 class="section-title">Powerful Features</h2>
        <p class="section-subtitle">Built for modern applications</p>
      </div>

      <div class="features-grid">
        <div class="feature-card">
          <div class="feature-icon-container">
            <div class="feature-icon">🔒</div>
            <div class="icon-glow"></div>
          </div>
          <h3>Fort Knox Security</h3>
          <p>
            Military-grade JWT authentication powered by Laravel Sanctum with
            zero-trust architecture
          </p>
          <div class="feature-highlight"></div>
        </div>

        <div class="feature-card">
          <div class="feature-icon-container">
            <div class="feature-icon">👥</div>
            <div class="icon-glow"></div>
          </div>
          <h3>Smart Role System</h3>
          <p>
            Dynamic role-based access control with personalized dashboards for
            every user type
          </p>
          <div class="feature-highlight"></div>
        </div>

        <div class="feature-card">
          <div class="feature-icon-container">
            <div class="feature-icon">🔄</div>
            <div class="icon-glow"></div>
          </div>
          <h3>Instant Recovery</h3>
          <p>
            Lightning-fast password recovery with secure email verification and
            biometric options
          </p>
          <div class="feature-highlight"></div>
        </div>
      </div>
    </section>

    <div v-if="isAuthenticated" class="user-status">
      <div class="status-content">
        <div class="status-avatar">
          <div class="avatar-ring"></div>
          <span class="avatar-text">{{
            userRole?.charAt(0).toUpperCase()
          }}</span>
        </div>
        <div class="status-info">
          <p class="status-label">Active Session</p>
          <p class="status-role">{{ userRole }}</p>
        </div>
        <div class="status-indicator">
          <div class="pulse-dot"></div>
        </div>
      </div>
    </div>

    <footer class="app-footer">
      <div class="footer-content">
        <p class="footer-text">
          © 2024 SecureAuth Platform. Engineered for tomorrow.
        </p>
        <div class="footer-links">
          <a href="#" class="footer-link">Privacy</a>
          <a href="#" class="footer-link">Terms</a>
          <a href="#" class="footer-link">Support</a>
        </div>
      </div>
    </footer>
  </div>
</template>


<style scoped>
.home-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
}

/* Animated Background */
.bg-animation {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.floating-shapes {
  position: absolute;
  width: 100%;
  height: 100%;
}

.shape {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  animation: float 20s infinite ease-in-out;
}

.shape-1 {
  width: 300px;
  height: 300px;
  top: 10%;
  left: 10%;
  animation-delay: 0s;
}

.shape-2 {
  width: 200px;
  height: 200px;
  top: 60%;
  right: 10%;
  animation-delay: 7s;
}

.shape-3 {
  width: 150px;
  height: 150px;
  bottom: 20%;
  left: 30%;
  animation-delay: 14s;
}

.shape-4 {
  width: 100px;
  height: 100px;
  top: 30%;
  right: 30%;
  animation-delay: 3s;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0) rotate(0deg);
  }
  25% {
    transform: translateY(-30px) rotate(90deg);
  }
  50% {
    transform: translateY(-60px) rotate(180deg);
  }
  75% {
    transform: translateY(-30px) rotate(270deg);
  }
}

/* Hero Section */
.hero-section {
  text-align: center;
  padding: 6rem 0;
  margin-bottom: 4rem;
  position: relative;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
}

.hero-badge {
  display: inline-block;
  margin-bottom: 2rem;
  padding: 0.75rem 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-radius: 50px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  animation: fadeInUp 1s ease-out;
}

.badge-text {
  color: white;
  font-weight: 600;
  font-size: 0.9rem;
  letter-spacing: 0.5px;
}

.hero-title {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800;
  margin-bottom: 1.5rem;
  color: white;
  line-height: 1.2;
  animation: fadeInUp 1s ease-out 0.2s both;
}

.gradient-text {
  background: linear-gradient(45deg, #ffd700, #ffeb3b, #ff9800, #ff5722);
  background-size: 300% 300%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradientShift 3s ease infinite;
}

@keyframes gradientShift {
  0%,
  100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.hero-subtitle {
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 3rem;
  line-height: 1.6;
  animation: fadeInUp 1s ease-out 0.4s both;
}

.cta-section {
  animation: fadeInUp 1s ease-out 0.6s both;
}

.cta-button {
  position: relative;
  padding: 1rem 2.5rem;
  background: linear-gradient(45deg, #44500e, #6b2a13);
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(255, 107, 107, 0.3);
}

.cta-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 40px rgba(255, 107, 107, 0.4);
}

.cta-button:active {
  transform: translateY(-1px);
}

.button-text {
  position: relative;
  z-index: 2;
}

.button-glow {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.3),
    transparent
  );
  transition: left 0.5s ease;
}

.cta-button:hover .button-glow {
  left: 100%;
}

/* Features Section */
.features-section {
  margin: 5rem 0;
  position: relative;
}

.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: white;
  margin-bottom: 1rem;
}

.section-subtitle {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.7);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.feature-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 2.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.feature-card:hover {
  transform: translateY(-10px);
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

.feature-icon-container {
  position: relative;
  width: 80px;
  height: 80px;
  margin: 0 auto 1.5rem;
}

.feature-icon {
  font-size: 2.5rem;
  position: relative;
  z-index: 2;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  backdrop-filter: blur(10px);
}

.icon-glow {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.2), transparent);
  border-radius: 50%;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
    opacity: 0.7;
  }
  50% {
    transform: scale(1.1);
    opacity: 1;
  }
}

.feature-card h3 {
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: white;
  text-align: center;
}

.feature-card p {
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  text-align: center;
  font-size: 1rem;
}

.feature-highlight {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 3px;
  background: linear-gradient(45deg, #ff6b6b, #ffd700);
  transition: width 0.3s ease;
}

.feature-card:hover .feature-highlight {
  width: 60%;
}

/* User Status */
.user-status {
  margin: 3rem 0;
  display: flex;
  justify-content: center;
}

.status-content {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem 2rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.status-avatar {
  position: relative;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: linear-gradient(45deg, #ff6b6b, #ffd700);
}

.avatar-ring {
  position: absolute;
  width: 60px;
  height: 60px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  animation: rotate 3s linear infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.avatar-text {
  color: white;
  font-weight: 700;
  font-size: 1.2rem;
}

.status-info {
  flex-grow: 1;
}

.status-label {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  margin: 0;
}

.status-role {
  color: white;
  font-weight: 600;
  font-size: 1.1rem;
  margin: 0;
  text-transform: capitalize;
}

.status-indicator {
  position: relative;
}

.pulse-dot {
  width: 12px;
  height: 12px;
  background: #4caf50;
  border-radius: 50%;
  animation: pulse-dot 1.5s infinite;
}

@keyframes pulse-dot {
  0%,
  100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.3);
    opacity: 0.7;
  }
}

/* Footer */
.app-footer {
  margin-top: auto;
  padding: 3rem 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.footer-text {
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
}

.footer-links {
  display: flex;
  gap: 2rem;
}

.footer-link {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-link:hover {
  color: white;
}

/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .home-container {
    padding: 0 1rem;
  }

  .hero-section {
    padding: 4rem 0;
  }

  .features-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .feature-card {
    padding: 2rem;
  }

  .footer-content {
    flex-direction: column;
    text-align: center;
  }

  .status-content {
    flex-direction: column;
    text-align: center;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2rem;
  }

  .hero-subtitle {
    font-size: 1rem;
  }

  .cta-button {
    padding: 0.8rem 2rem;
    font-size: 1rem;
  }
}
</style>