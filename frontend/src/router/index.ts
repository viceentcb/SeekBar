import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import SBhome from "../views/Home.vue";
import SBlogin from "../views/auth/Login.vue";
import SBregister from "../views/auth/Register.vue";
import SBbarsList from "../pages/barsList/barsList.vue";
import SBbar from "../pages/bar/bar.vue";
import SBprofile from "../pages/profile/profile.vue";

const noAuthGuard = (to: any, from: any, next: any) => {
  (localStorage.getItem("token")) ? next("/") : next()
}

const authGuard = (to: any, from: any, next: any) => {
  (!localStorage.getItem("token")) ? next("/login") : next()
}

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "SBhome",
    component: SBhome,
  },

  {
    path: "/login",
    name: "SBlogin",
    component: SBlogin,
    beforeEnter: noAuthGuard
  },

  {
    path: "/register",
    name: "SBregister",
    component: SBregister,
    beforeEnter: noAuthGuard
  },
  {
    path: "/bares",
    name: "SBbarsList",
    component: SBbarsList,
  },
  {
    path: "/bar",
    name: "SBbar",
    component: SBbar,
  },
  {
    path: "/profile",
    name: "SBprofile",
    component: SBprofile,
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/",
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
