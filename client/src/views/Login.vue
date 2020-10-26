<template>
  <div class="container ">
    <div class="columns is-centered vcentered">
      <div class="column is-4-tablet is-5-desktop is-5-widescreen">
        <form class="box" id="login" @submit.prevent="loginSubmit">
          <div class="is-size-2 has-text-primary has-text-centered mb-5 pt-5">
            Account Login
          </div>
          <hr class="has-background-primary" />

          <div class="field">
            <label class="">Email</label>
            <input
              type="email"
              placeholder="e.g. plutoz@gmail.com"
              class="input"
              v-model="formInput.email"
              required
            />
          </div>

          <div class="field">
            <label class="">Password</label>
            <input
              type="password"
              placeholder="*********"
              class="input"
              v-model="formInput.password"
              required
            />
          </div>
          <div class="field">
            <button
              class="button is-primary is-fullwidth is-medium my-5 has-text-white"
              type="submit"
            >
              <strong> Sign in </strong>
            </button>
          </div>
          <div class="field has-text-centered">
            <span>Not a member Fuchsia ? </span>
            <router-link to="/register" class="has-text-primary"
              >Signup now
            </router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        formInput: {
          email: "",
          password: "",
        },
        errMessage: "",
        dialog: false,
      };
    },
    watch: {
      dialog(val) {
        if (!val) {
          this.formInput.email = "";
          this.formInput.password = "";
          this.errMessage = "";
        }
      },
    },
    methods: {
      //Need to add validation !!!!!!!
      loginSubmit() {
        if (this.formInput.email && this.formInput.password) {
          const { email, password } = this.formInput;
          this.$store
            .dispatch("auth/login", { email, password })
            .then(() => {
              this.dialog = true;
            })
            .catch((err) => {
              this.errMessage = err.message;
              console.log("Error", this.errMessage);
            });
        }
      },
    },
  };
</script>

<style lang="scss" scoped></style>
