import axios from 'axios';
import authHeader from './auth-header';

// change to corresponding backend URL
const API_URL = 'http://localhost:8080/';

class UserService {

  // Get public content from backend
  getPublicContent() {
    return axios.get(API_URL + 'test/public');
  }

  // Get private content from backend by appending token header
  getPrivateContent() {
    console.log(authHeader())
    return axios.get(API_URL + 'test/private', { headers: authHeader() });
  }

  // Implement more funcs here


}

export default new UserService();
