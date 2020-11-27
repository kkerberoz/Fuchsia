import Vue from "vue";
import Vuex from "vuex";
import auth from "./modules/auth-store";
import review from "./modules/review-store";
import report from "./modules/report-store";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: { 
    auth,
    review,
    report
  },
});
