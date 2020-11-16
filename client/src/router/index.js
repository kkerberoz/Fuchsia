import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import store from "../store/index";
import DefaultLayout from "../Layouts/DefaultLayout";
import AdminLayout from "../Layouts/AdminLayout";
Vue.use(VueRouter);

//guard router
function guardMyroute(to, from, next) {
  var isAuthenticated = false;
  if (store.state.auth.status.loggedIn === true) isAuthenticated = true;
  else isAuthenticated = false;
  if (isAuthenticated) {
    next();
  } else {
    next("/login");
  }
}

const routes = [
  {
    path: "/",
    name: "Home",
    beforeEnter: guardMyroute,
    component: Home,
    meta: { layout: DefaultLayout },
  },
  {
    path: "/login",
    name: "Login",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/Login.vue"),
    meta: { layout: DefaultLayout },
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/Register.vue"),
    meta: { layout: DefaultLayout },
  },
  {
    path: "/review/:reviewId",
    name: "Review",
    props: true,
    component: () => import("../views/Review.vue"),
    meta: { layout: DefaultLayout },
  },
  {
    path: "/createreview",
    name: "CreateReview",
    beforeEnter: guardMyroute,
    component: () => import("../views/CreateReview.vue"),
    meta: { layout: DefaultLayout },
  },
  {
    path: "*",
    component: () => import("../views/Error.vue"),
    meta: { layout: DefaultLayout },
  },
  {
    path: "/Admin",
    name: "Admin",
    component: () => import("../views/Admin/AdminIndex.vue"),
    meta: { layout: AdminLayout },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
