<template>
  <div>
    <nav class="navbar is-black" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a @click="Home" class="navbar-item">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="125"
            height="35"
            viewBox="0 0 202 64.684"
          >
            <text
              id="Fuchsia"
              transform="translate(65 45.686)"
              fill="#fff"
              font-size="40"
              font-family="Kanit-Regular, Kanit"
            >
              <tspan x="0" y="0">Fuchsia</tspan>
            </text>
            <g
              id="Group_5"
              data-name="Group 5"
              transform="translate(-44 -24.314)"
            >
              <path
                id="feather-alt-solid"
                d="M61.688,0C55.45.429,11.623,4.6,8.559,34.65c-.372,3.212-.583,6.438-.722,9.667l21.55-21.528a1.929,1.929,0,0,1,2.729,2.726L.853,56.748a2.893,2.893,0,0,0,4.094,4.089l6.883-6.876A136.183,136.183,0,0,0,27,53.075a28.74,28.74,0,0,0,15.973-6.812H30.815L48.5,40.374A47.8,47.8,0,0,0,52.168,34.7H42.393l12.836-6.411A98.333,98.333,0,0,0,61.688,0Z"
                transform="translate(50.995 27.314)"
                fill="#f4a6d7"
              />
              <path
                id="feather-alt-solid-2"
                data-name="feather-alt-solid"
                d="M61.688,0C55.45.429,11.623,4.6,8.559,34.65c-.372,3.212-.583,6.438-.722,9.667l21.55-21.528a1.929,1.929,0,0,1,2.729,2.726L.853,56.748a2.893,2.893,0,0,0,4.094,4.089l6.883-6.876A136.183,136.183,0,0,0,27,53.075a28.74,28.74,0,0,0,15.973-6.812H30.815L48.5,40.374A47.8,47.8,0,0,0,52.168,34.7H42.393l12.836-6.411A98.333,98.333,0,0,0,61.688,0Z"
                transform="translate(43.995 24.314)"
                fill="#c6007e"
              />
            </g>
          </svg>
        </a>

        <a
          role="button"
          class="navbar-burger burger mr-5 mt-2"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
          @click="showNav = !showNav"
        >
          <span></span>
          <span></span>
          <span></span>
        </a>
      </div>

      <div
        id="navbarBasicExample"
        class="navbar-menu"
        :class="{ 'is-active': showNav }"
      >
        <div class="navbar-start">
          <a @click="Home" class="navbar-item">
            Home
          </a>

          <!-- <router-link
            to="/About"
            class="navbar-item"
            @click="showNav = !showNav"
          >
            About
          </router-link> -->

          <!-- <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">
              More
            </a>
            <div class="navbar-dropdown">
              <a class="navbar-item">
                Jobs
              </a>
              <a class="navbar-item">
                Contact
              </a>
              <hr class="navbar-divider" />
              <a class="navbar-item">
                Report an issue
              </a>
            </div>
          </div> -->
        </div>

        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons" v-if="!loggedIn">
              <router-link
                to="/register"
                class="navbar-item button is-primary"
                @click="showNav = !showNav"
              >
                Register
              </router-link>
              <router-link
                to="/login"
                class="navbar-item button is-light"
                @click="showNav = !showNav"
              >
                Login
              </router-link>
            </div>
            <div class="buttons" v-if="loggedIn">
              <div v-show="this.role != 'ADMIN'">
                <a
                  class="navbar-item button is-primary"
                  @click="createReview"
                  style="border-radius:20px;
                padding-right:20px;padding-left:20px"
                  ><i class="fas fa-plus" style="margin-right:5px"></i>New post
                </a>
              </div>

              <div class="navbar-item">
                <div class="name-image">
                  <a class="button is-primary" id="userImage"></a>
                  <a class="button is-primary" id="userBanner">
                    {{ username }}
                  </a>
                </div>

                <a
                  class="button is-white has-text-primary"
                  id="logout"
                  @click="logout"
                >
                  Logout
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
  import axios from "axios";
  export default {
    data() {
      return {
        showNav: false,
        username: "",
        isRole: "",
      };
    },
    mounted() {
      const jwt_token = JSON.parse(localStorage.getItem("jwt"));
      if (!jwt_token) {
        return;
      }
      axios
        .get("/api/getuser", {
          headers: { Authorization: jwt_token },
        })
        .then((res) => {
          this.username = res.data.data.username;
        })
        .catch((err) => {
          throw new err();
        });
    },
    methods: {
      createReview() {
        this.$router.push({ name: "CreateReview" });
      },
      logout() {
        this.$store.dispatch("auth/logout").then(() => {
          this.$swal({
            title: "Logout Success!",
            text: "Click the button to continue.",
            icon: "success",
            confirmButtonColor: " #c6007e",
          }).then(() => {
            this.$router.push({ name: "Login" });
          });
        });
      },
      Home() {
        if (this.$route.name !== "Home") {
          if (this.role === "ADMIN") {
            this.$router.push({ name: "ContentVio" });
          } else {
            this.$router.push({ name: "Home" });
          }
        }
      },
    },
    computed: {
      routeChange() {
        return this.$route.name;
      },
      loggedIn() {
        return this.$store.state.auth.status.loggedIn;
      },
      role() {
        const role = JSON.parse(localStorage.getItem("role"));
        return role;
      },
    },
    watch: {
      routeChange() {
        const jwt_token = JSON.parse(localStorage.getItem("jwt"));
        if (!jwt_token) {
          return;
        }
        axios
          .get("/api/getuser", {
            headers: { Authorization: jwt_token },
          })
          .then((res) => {
            this.username = res.data.data.username;
          })
          .catch((err) => {
            throw new err();
            //console.log(err);
          });
      },
    },
  };
</script>

<style lang="scss" scoped>
  .navbar {
    height: 100px;
  }
  .name-image {
    z-index: 1;
  }
  #userImage {
    border-width: 5px;
    position: relative;
    z-index: 1;
    border-radius: 40px;
    background-image: url("https://i.pinimg.com/564x/d9/56/9b/d9569bbed4393e2ceb1af7ba64fdf86a.jpg");
    background-size: cover;
    width: 60px;
    height: 60px;
    margin-right: -20px;
    border-color: $primary;
  }
  #userBanner {
    margin-top: 10px;
    position: relative;
    z-index: 0;
    margin-right: -30px;
    border-radius: 20px;
    padding-left: 40px;
    padding-right: 40px;
  }
  #logout {
    padding-left: 40px;
    border-radius: 20px;
  }
</style>
