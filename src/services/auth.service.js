import axios from 'axios';

const API_URL = 'http://localhost:8080/';

class AuthService {
  login(user) {
    return axios
      .post(API_URL + 'login', {
        username: user.username,
        password: user.password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data));
          return Promise.resolve(response.data);
        }
        return Promise.reject(response.data);
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(user) {
    return axios.post(API_URL + 'register', {
      username: user.username,
      password: user.password,
      user_role: user.user_role
    });
  }

  changePwd(user) {
    return axios.post(API_URL + 'changepwd', {
      username: user.username,
      old_password: user.username,
      new_password: user.password
    });
  }
}

export default new AuthService();
