import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "@components/layout/index";
import configRouters from "./routers";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Layout,
    children: configRouters,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
