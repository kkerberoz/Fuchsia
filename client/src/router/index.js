import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import store from "../store/index";
import DefaultLayout from "../Layouts/DefaultLayout";
import AdminLayout from "../Layouts/AdminLayout";
import axios from "axios";
const BASE_API_URL = "http://localhost:5000/api";
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

function guardMyadmin(to, from, next) {
  var isAuthenticated = false;
  const role = JSON.parse(localStorage.getItem("role"));
  if (store.state.auth.status.loggedIn === true && role === "ADMIN")
    isAuthenticated = true;
  else isAuthenticated = false;
  if (isAuthenticated) {
    next();
  } else {
    next("/login");
  }
}

function checkLogin(to, from, next) {
  var isAuthenticated = false;
  const jwt_token = JSON.parse(localStorage.getItem("jwt"));
  const params = { token: jwt_token };
  if (store.state.auth.status.loggedIn === true) isAuthenticated = true;
  else isAuthenticated = false;
  if (isAuthenticated) {
    if (!jwt_token) {
      next("/login");
    } else {
      axios
        .get(`${BASE_API_URL}/checklogin`, { params })
        .then((token) => {
          const exp = token.data.data.decode.exp;
          if (Date.now() >= exp * 1000) {
            next("/login");
          } else {
            next();
          }
        })
        .catch((err) => {
          next("/login");
          console.log("error", err);
        });
    }
  } else {
    next();
  }
}

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    beforeEnter: checkLogin,
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
    path: "/admin",
    name: "Admin",
    beforeEnter: guardMyadmin,
    component: () => import("../views/Admin/AdminIndex.vue"),
    meta: { layout: AdminLayout },
    children: [
      {
        path: "content",
        name: "ContentVio",
        component: () => import("../views/Admin/ContentVio.vue"),
        meta: { layout: AdminLayout },
      },
    ],
  },
  {
    path: "/adminreport",
    name: "AdminReport",
    component: () => import("../views/Admin/AdminReport.vue"),
    meta: { layout: AdminLayout },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
