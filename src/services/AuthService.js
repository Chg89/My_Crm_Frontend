import axios from "axios";

const API_URL = "http://localhost:8080/api/auth";

const register = (username, email, password, confirmPassword) =>
  axios.post(`${API_URL}/register`, {
    username,
    email,
    password,
    confirmPassword,
  });

const login = async (usernameOrEmail, password) => {
  const response = await axios.post(`${API_URL}/login`, {
    usernameOrEmail,
    password,
  });
  if (response.data.token) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

const isUserLoggedIn = () => {
  return !!getCurrentUser();
};

const AuthService = { register, login, logout, getCurrentUser, isUserLoggedIn };

export default AuthService;
