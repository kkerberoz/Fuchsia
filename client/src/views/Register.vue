<template>
  <div class="container ">
    <div class="columns is-centered vcentered">
      <div class="column is-5-tablet is-7-desktop is-7-widescreen ">
        <form class="box" id="login" @submit.prevent="registerSubmit">
          <div class="is-size-2 has-text-primary has-text-centered pt-5">
            Account Register
          </div>
          <hr class="has-background-primary" />
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
          <div class="columns">
            <div class="column">
              <div class="field">
                <label class="">First name</label>
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
                <label>Data of Birth </label>
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
                <label class="">Last name</label>
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
              type="submit"
            >
              <strong> Sign up </strong>
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
        formInput: {
          email: "",
          password: "",
          conPassword: "",
          firstName: "",
          lastName: "",
          dob: null,
        },
        dialog: false,
      };
    },
    watch: {
      dialog(val) {
        if (!val) {
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
        //Need to add validation !!!!!!!
        if(this.formInput.password.length < 6 || this.formInput.password.toLowerCase() === this.formInput.password || this.formInput.password.toUpperCase() === this.formInput.password || this.formInput.password != this.formInput.conPassword )
        {
          if (this.formInput.password.length < 6 )
          {
            console.log ("password length < 6 ")
          }
          if (this.formInput.password.toLowerCase() === this.formInput.password )
          {
            console.log ("password is lowerCase")
          }
          if (this.formInput.password.toUpperCase() === this.formInput.password )
          {
            console.log ("password is UpperCase")
          }
          if (this.formInput.password != this.formInput.conPassword )
          {
            console.log ("password doesn't match")
          }
        }
        // if (this.formInput.password.length < 6 )
        // {
        //  console.log ("password length < 6 ")
        // }
        // if (this.formInput.password.toLowerCase() === this.formInput.password )
        // {
        //  console.log ("password is lowerCase")
        // }
        // if (this.formInput.password.toUpperCase() === this.formInput.password )
        // {
        //  console.log ("password is UpperCase")
        // }
        // if (this.formInput.password != this.formInput.conPassword )
        // {
        //  console.log ("password doesn't match")
        // }
        else if (this.formInput.password === this.formInput.conPassword ) {
          let data = {
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
              this.dialog = true;
              this.$router.push({name: "Home"});
            })
            .catch((err) => {
              this.errMessage = err.message;
              console.log("Error", this.errMessage);
            });
        }
      },
    },
    mounted() {
      console.log(this.$route.path);
    }
  };
</script>

<style lang="scss" scoped></style>
