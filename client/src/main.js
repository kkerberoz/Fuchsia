import Vue from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import store from "./store/index.js";
import Buefy from "buefy";
import VueSweetalert2 from "vue-sweetalert2";
import vueDebounce from "vue-debounce";
import axios from "axios";

axios.defaults.baseURL = "https://fuchsia-server-skhuzjjwua-uc.a.run.app";
//axios.defaults.baseURL = "http://localhost:5000";

Vue.config.productionTip = false;

Vue.use(Buefy);
// Vue.use(vueDebounce);

Vue.use(VueSweetalert2);

Vue.use(vueDebounce, {
  listenTo: "input",
  defaultTime: "700ms",
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
