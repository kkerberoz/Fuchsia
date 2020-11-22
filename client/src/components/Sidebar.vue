<template>
  <div class="sidebar">
    <div class="sidebar-item">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="125"
        height="35"
        viewBox="0 0 202 64.684"
      >
        <g id="Group_5" data-name="Group 5" transform="translate(-44 -24.314)">
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
    </div>

    <div class="sidebar-item">
      <router-link :to="{ name: 'ContentVio' }">
        <i class="fa fa-fw fa-home"></i>
      </router-link>
    </div>
    <div class="sidebar-item">
      <router-link :to="{ name: 'AdminReport' }">
        <i class="fa fa-fw fa-wrench"></i>
      </router-link>
    </div>
    <div class="sidebar-item" style="margin-top:550px">
      <a @click="logout"> <i class="fas fa-sign-out-alt"></i></a>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
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
    },
  };
</script>

<style lang="scss" scoped>
  i {
    color: #818181;
  }
  .sidebar {
    height: 100%;
    width: 80px;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    background-color: #ffffff;
    overflow-x: hidden;
    padding-top: 16px;
    box-shadow: 1px solid#818181;
    border-right: 1px solid rgba(28, 110, 164, 0.14);
  }

  .sidebar .sidebar-item {
    margin-top: 20px;
    padding: 6px 8px 6px 16px;
    text-decoration: none;
    text-align: center;
    font-size: 20px;
    color: #818181;
    display: block;
  }

  .sidebar i:hover {
    color: #322a7d;
  }
  @media screen and (max-height: 450px) {
    .sidebar {
      padding-top: 15px;
    }
    .sidebar .sidebar-item {
      font-size: 18px;
    }
  }
</style>
