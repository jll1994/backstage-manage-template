import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "@components/layout/index";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Layout,
    children: [
      {
        path: "/",
        component: () => import("../views/Home.vue"),
      },
      {
        path: "/description",
        component: () => import("../views/description.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
