import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/Home.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/Home.vue"),
    },
    {
      path: "/sign-in",
      name: "Sign In",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/SignIn.vue"),
    },
    {
      path: "/register",
      name: "Register",
      component: () => import("../views/Register.vue"),
    },
    {
      path: "/reviewerapp",
      name: "ReviewerApp",
      component: () => import("../views/reviewer/ReviewerApp.vue"),
    },
    {
      path: "/adminapp",
      name: "AdminApp",
      component: () => import("../views/admin/AdminApp.vue"),
    },
    {
      path: "/managerapp",
      name: "ManagerApp",
      component: () => import("../views/manager/ManagerApp.vue"),
    },
    {
      path: "/hrapp",
      name: "HumanResourcesApp",
      component: () => import("../views/hr/HumanResourcesApp.vue"),
    },
  ],
});

export default router;
