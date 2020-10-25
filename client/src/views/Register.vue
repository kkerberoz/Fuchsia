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
                  placeholder="e.g. plutoz"
                  class="input"
                  required
                />
              </div>

              <div class="field">
                <label class="">Password</label>
                <input
                  type="password"
                  placeholder="*******"
                  class="input"
                  required
                />
              </div>
            </div>

            <div class="column">
              <div class="field">
                <label class="">Last name</label>
                <input
                  type="text"
                  placeholder="e.g. night"
                  class="input"
                  required
                />
              </div>

              <div class="field">
                <label class="">Confirm Password</label>
                <input
                  type="password"
                  placeholder="*******"
                  class="input"
                  required
                />
              </div>
            </div>
          </div>
          <b-field label="Select a date">
            <b-datepicker placeholder="Click to select..." v-model="date">
            </b-datepicker>
          </b-field>
          <div class="field">
            <button
              class="button is-primary is-fullwidth is-medium my-5 has-text-white"
              type="submit"
            >
              <strong> Sign up </strong>
            </button>
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
        date: new Date(),
      };
    },
  };
</script>

<style lang="scss" scoped></style>
