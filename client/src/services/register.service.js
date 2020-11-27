import axios from "axios";

class RegisterService {
  // Creates the user, gets token and stores it in local storage
  static async register(
    username,
    firstName,
    lastName,
    email,
    password,
    dob,
    tel
  ) {
    const res = await axios.post(`${process.env.BASE_API}/register`, {
      username,
      firstName,
      lastName,
      email,
      password,
      dob,
      tel,
    });
    const token = res.data.data.token;
    localStorage.setItem("jwt", JSON.stringify(token));
  }
}

export default RegisterService;
