export default function authHeader() {
  let user = JSON.parse(localStorage.getItem('user'));
  console.log(user)
  if (user && user.accessToken) {
    console.log("here here")
    return {'Authorization': user.accessToken};
  } else {
    return {};
  }
}
