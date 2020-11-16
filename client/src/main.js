import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Buefy from "buefy";
import vueDebounce from "vue-debounce";

Vue.config.productionTip = false;

Vue.use(Buefy);
// Vue.use(vueDebounce);

Vue.use(vueDebounce, {
  listenTo: "input",
  defaultTime: "700ms"
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
