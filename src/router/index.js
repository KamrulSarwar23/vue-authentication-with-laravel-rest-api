import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../stores/auth";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Auth/Login.vue"),
    meta: { guestOnly: true },
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/Auth/Register.vue"),
    meta: { guestOnly: true },
  },
  {
    path: "/forgot-password",
    name: "forgot-password",
    component: () => import("../views/Auth/ForgotPassword.vue"),
    meta: { guestOnly: true },
  },
  {
    path: "/reset-password",
    name: "reset-password",
    component: () => import("../views/Auth/ResetPassword.vue"),
    meta: { guestOnly: true },
  },
  {
    path: "/admin/dashboard",
    name: "admin-dashboard",
    component: () => import("../views/Dashboards/AdminDashboard.vue"),
    meta: { requiresAuth: true, role: "admin" },
    children: [
      {
        path: "home",
        name: "DashboardHome",
        component: () => import("../views/Dashboards/Adminhome.vue"),
        meta: { requiresAuth: true, role: "admin" },
      },
      {
        path: "setting",
        name: "DashboardSetting",
        component: () => import("../views/Dashboards/AdminSetting.vue"),
        meta: { requiresAuth: true, role: "admin" },
      },
    ],
  },
  {
    path: "/vendor/dashboard",
    name: "vendor-dashboard",
    component: () => import("../views/Dashboards/VendorDashboard.vue"),
    meta: { requiresAuth: true, role: "vendor" },
  },
  {
    path: "/customer/dashboard",
    name: "customer-dashboard",
    component: () => import("../views/Dashboards/CustomerDashboard.vue"),
    meta: { requiresAuth: true, role: "customer" },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: "login" });
  } else if (to.meta.requiresAuth && authStore.isAuthenticated) {
    // Check if user has the required role
    if (to.meta.role && authStore.user?.role !== to.meta.role) {
      // Redirect to their role-appropriate dashboard
      switch (authStore.user?.role) {
        case "admin":
          next({ name: "admin-dashboard" });
          break;
        case "vendor":
          next({ name: "vendor-dashboard" });
          break;
        default:
          next({ name: "customer-dashboard" });
      }
    } else {
      next();
    }
  } else if (to.meta.guestOnly && authStore.isAuthenticated) {
    // Redirect authenticated users away from guest-only pages
    switch (authStore.user.role) {
      case "admin":
        next({ name: "admin-dashboard" });
        break;
      case "vendor":
        next({ name: "vendor-dashboard" });
        break;
      default:
        next({ name: "customer-dashboard" });
    }
  } else {
    next();
  }
});

export default router;
