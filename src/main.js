import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "./assets/styles/common.less";

import ViewUI from "view-design";
import "./assets/styles/iview.less";
Vue.use(ViewUI);

import "@components/global/index.js"; //全局组件

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
