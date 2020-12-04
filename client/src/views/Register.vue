<template>
  <div class="container" style="margin-top:-60px">
    <div class="columns is-centered vcentered">
      <div class="column is-5-tablet is-7-desktop is-7-widescreen ">
        <form class="box" id="login" @submit.prevent="registerSubmit">
          <div class="is-size-2 has-text-primary has-text-centered pt-5">
            Account Register
          </div>
          <hr class="has-background-primary" />

          <div class="columns">
            <div class="column">
              <div class="field">
                <label class="">Email</label>
                <input
                  type="email"
                  v-model="formInput.email"
                  placeholder="e.g. plutoz@gmail.com"
                  class="input"
                  required
                />
              </div>

              <div class="field">
                <label class="">Firstname</label>
                <input
                  type="type"
                  v-model="formInput.firstName"
                  placeholder="e.g. plutoz"
                  class="input"
                  required
                />
              </div>

              <div class="field">
                <label class="">Password</label>
                <input
                  type="password"
                  v-model="formInput.password"
                  placeholder="*******"
                  class="input"
                  required
                />
              </div>
              <div class="field">
                <label>Date of Birth </label>
                <b-datepicker
                  placeholder="Click to select..."
                  icon="calendar-today"
                  v-model="formInput.dob"
                  required
                >
                </b-datepicker>
              </div>
            </div>

            <div class="column">
              <div class="field">
                <label class="">Username</label>
                <input
                  type="text"
                  v-model="formInput.username"
                  placeholder="e.g. mannal"
                  class="input"
                  required
                />
              </div>
              <div class="field">
                <label class="">Lastname</label>
                <input
                  type="text"
                  v-model="formInput.lastName"
                  placeholder="e.g. night"
                  class="input"
                  required
                />
              </div>

              <div class="field">
                <label class="">Confirm Password</label>
                <input
                  type="password"
                  v-model="formInput.conPassword"
                  placeholder="*******"
                  class="input"
                  required
                />
              </div>
              <div class="field">
                <label class="">Telephone</label>
                <input
                  type="text"
                  v-model="formInput.tel"
                  placeholder="e.g. 0861609792"
                  class="input"
                  required
                />
              </div>
            </div>
          </div>

          <div class="field">
            <button
              class="button is-primary is-fullwidth is-medium my-5 has-text-white"
              v-show="!disable"
            >
              <strong> Sign up </strong>
            </button>
            <button
              class="button is-primary is-fullwidth is-medium my-5 has-text-white is-loading"
              disabled
              v-show="disable"
            >
              <strong> Loading.... </strong>
            </button>
          </div>
          <div></div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import moment from "moment";
  export default {
    data() {
      return {
        count: 0,
        LowerCheck: 0,
        UpperCheck: 0,
        NumberCheck: 0,
        formInput: {
          username: "",
          email: "",
          password: "",
          conPassword: "",
          firstName: "",
          lastName: "",
          dob: null,
        },
        dialog: false,
        errors: [],
        disable: false,
      };
    },
    watch: {
      dialog(val) {
        if (val) {
          this.formInput.username = "";
          this.formInput.email = "";
          this.formInput.password = "";
          this.formInput.conPassword = "";
          this.formInput.firstName = "";
          this.formInput.lastName = "";
          this.formInput.tel = "";
          this.formInput.dob = null;
          this.errMessage = "";
        }
      },
    },
    computed: {
      dateFormated() {
        return moment(this.formInput.dob).format("YYYY-MM-DD");
      },
    },

    methods: {
      registerSubmit() {
        this.disable = true;
        //Need to add validation !!!!!!!
        this.errors = [];
        if (this.formInput.password.length < 6) {
          this.errors.push("password length < 6");
          //console.log("password length < 6 ");
          this.$swal
            .fire({
              icon: "error",
              title: "Oops...",
              text: "Password length must be more than or equal 6 character.",
              confirmButtonColor: " #c6007e",
            })
            .then(() => {
              this.formInput.password = "";
              this.formInput.conPassword = "";
            });
        } else if (!isNaN(this.formInput.password)) {
          this.errors.push("password is a number only");
          //console.log("password is a number only");
          this.$swal
            .fire({
              icon: "error",
              title: "Oops...",
              text:
                "Password must be contain Capital letter , Number and small letter.",
              confirmButtonColor: " #c6007e",
            })
            .then(() => {
              this.formInput.password = "";
              this.formInput.conPassword = "";
            });
        } else if (
          this.formInput.password.toLowerCase() === this.formInput.password
        ) {
          this.errors.push("password is lowerCase");
          //console.log("password is lowerCase");
          this.$swal
            .fire({
              icon: "error",
              title: "Oops...",
              text:
                "Password must be contain Capital letter , Number and small letter.",
              confirmButtonColor: " #c6007e",
            })
            .then(() => {
              this.formInput.password = "";
              this.formInput.conPassword = "";
            });
        } else if (
          this.formInput.password.toUpperCase() === this.formInput.password
        ) {
          this.errors.push("password is UpperCase");
          //console.log("password is UpperCase");
          this.$swal
            .fire({
              icon: "error",
              title: "Oops...",
              text:
                "Password must be contain Capital letter , Number and small letter.",
              confirmButtonColor: " #c6007e",
            })
            .then(() => {
              this.formInput.password = "";
              this.formInput.conPassword = "";
            });
        } else if (this.formInput.password !== this.formInput.conPassword) {
          this.errors.push("password doesn't match");
          //console.log("password doesn't match");
          this.$swal
            .fire({
              icon: "error",
              title: "Oops...",
              text: "Password doesn't match.",
              confirmButtonColor: " #c6007e",
            })
            .then(() => {
              this.formInput.conPassword = "";
            });
        } else if (this.formInput.dob === null) {
          this.errors.push("please fill date of birth");
          //console.log("please fill date of birth");
          this.$swal
            .fire({
              icon: "error",
              title: "Oops...",
              text: "Please fill your date of birth.",
              confirmButtonColor: " #c6007e",
            })
            .then(() => {
              this.formInput.dob = null;
            });
        } else if (isNaN(this.formInput.tel)) {
          this.errors.push("tel must be a number");
          //console.log("tel must be a number");
          this.$swal
            .fire({
              icon: "error",
              title: "Oops...",
              text: "Telephone field must be a number.",
              confirmButtonColor: " #c6007e",
            })
            .then(() => {
              this.formInput.tel = "";
            });
        }
        this.count = 0;
        this.LowerCheck = 0;
        this.UpperCheck = 0;
        this.NumberCheck = 0;
        for (var i = 0; i < this.formInput.password.length; i++) {
          if (
            this.formInput.password.charAt(i) ===
              this.formInput.password.toLowerCase().charAt(i) &&
            this.LowerCheck == 0 &&
            isNaN(this.formInput.password.charAt(i))
          ) {
            //console.log(this.formInput.password.charAt(i));
            this.count++;
            this.LowerCheck = 1;
          }
          if (
            this.formInput.password.charAt(i) ===
              this.formInput.password.toUpperCase().charAt(i) &&
            this.UpperCheck == 0 &&
            isNaN(this.formInput.password.charAt(i))
          ) {
            //console.log(this.formInput.password.charAt(i));
            this.count++;
            this.UpperCheck = 1;
          }
          if (
            !isNaN(this.formInput.password.charAt(i)) &&
            this.NumberCheck == 0
          ) {
            //console.log(this.formInput.password.charAt(i));
            this.count++;
            this.NumberCheck = 1;
          }
        }

        // //console.log(this.count)
        // //console.log("All char")
        // //console.log(this.formInput.password)
        // //console.log("--------")
        if (this.errors.length === 0 && this.count === 3) {
          let data = {
            username: this.formInput.username,
            firstName: this.formInput.firstName,
            lastName: this.formInput.lastName,
            email: this.formInput.email,
            password: this.formInput.password,
            dob: this.dateFormated,
            tel: this.formInput.tel,
          };
          this.$store
            .dispatch("auth/register", data)
            .then(() => {
              this.disable = false;
              this.dialog = true;
              this.$swal
                .fire({
                  icon: "success",
                  title: "Welcome!",
                  text: "Registration is Complete.",
                  confirmButtonColor: " #c6007e",
                })
                .then(() => {
                  this.dialog = true;
                  this.$router.push({ name: "Home" });
                });
            })
            .catch((err) => {
              this.disable = false;
              this.errMessage = err.message;
              //console.log("Error", this.errMessage);
              this.$swal
                .fire({
                  icon: "error",
                  title: "Oops...",
                  text: this.errMessage,
                  confirmButtonColor: " #c6007e",
                })
                .then(() => {
                  this.dialog = true;
                });
            });
        }
      },
    },
  };
</script>

<style lang="scss" scoped></style>
