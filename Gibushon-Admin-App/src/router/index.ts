import { createRouter, createWebHistory } from "vue-router";

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
      path: "/admin",
      name: "Admin",
      component: () => import("../views/admin/AdminHomeView.vue"),
    },
    {
      path: "/auditions",
      name: "Auditions",
      component: () => import("../views/auditions/AuditionsView.vue"),
    },
    {
      path: "/reviewer/audition",
      name: "ReviewerAudition",
      component: () => import("../views/auditions/reviewer/AuditionReviewerHomeView.vue"),
    },
    {
      path: "/manager/audition",
      name: "ManagerAudition",
      component: () => import("../views/auditions/manager/AuditionManagerHomeView.vue"),
    },
    {
      path: "/leader/audition",
      name: "LeaderAudition",
      component: () => import("../views/auditions/leader/AuditionLeaderHomeView.vue"),
    },
    {
      path: "/hr/audition",
      name: "HumanResourcesAudition",
      component: () => import("../views/auditions/hr/AuditionHRHomeView.vue"),
    },
  ],
});

export default router;
