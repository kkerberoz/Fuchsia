import LoginService from "../../services/login.service";
import RegisterService from "../../services/register.service";

// State
// If we have a jwt token we are logged in
const state = {
  status: { loggedIn: !!JSON.parse(localStorage.getItem("jwt")) },
  role: "",
};

// Actions
const actions = {
  async register({ commit }, formInput) {
    if (!formInput.username) {
      throw new Error("Username required");
    }
    if (!formInput.firstName) {
      throw new Error("First Name required");
    }
    if (!formInput.lastName) {
      throw new Error("Last Name required");
    }
    if (!formInput.email) {
      throw new Error("Email required");
    }
    if (!formInput.password) {
      throw new Error("Password ID required");
    }
    if (!formInput.dob) {
      throw new Error("Date of birth required");
    }
    if (!formInput.tel) {
      throw new Error("Telephone required");
    }
    try {
      await RegisterService.register(
        formInput.username,
        formInput.firstName,
        formInput.lastName,
        formInput.email,
        formInput.password,
        formInput.dob,
        formInput.tel
      );
      commit("SET_LOGGED_IN", true);
    } catch (err) {
      throw new Error(err.response ? err.response.data.message : err.message);
    }
  },
  async login({ commit }, formInput) {
    if (!formInput.email) {
      throw new Error("Email required");
    }
    if (!formInput.password) {
      throw new Error("Password ID required");
    }

    try {
      const response = await LoginService.login(
        formInput.email,
        formInput.password
      );
      commit("SET_LOGGED_IN", true);
      commit("SET_ROLE", response);
    } catch (err) {
      throw new Error(err.response ? err.response.data.message : err.message);
    }
  },
  logout({ commit }) {
    LoginService.logout();
    commit("SET_LOGGED_IN", false);
    commit("SET_ROLE", "");
  },
};

// Mutations
const mutations = {
  SET_LOGGED_IN(state, loggedIn) {
    state.status = { loggedIn };
  },
  SET_ROLE(state, data) {
    state.role = data;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
