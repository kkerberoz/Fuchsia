import axios from "axios";

class LoginService {
  // Gets token, stores in local storage

  static async login(email, password) {
    const res = await axios.post("/api/login", {
      email,
      password,
    });
    const token = res.data.data.token;
    const role = res.data.data.role;
    localStorage.setItem("jwt", JSON.stringify(token));
    localStorage.setItem("role", JSON.stringify(role));
    return role;
  }

  // Removes JWT from local storage
  static logout() {
    localStorage.removeItem("jwt");
    localStorage.removeItem("role");
  }
}

export default LoginService;
