<template>
  <div class="particles">
    <vue-particles color="#fff" linesColor="#fff"></vue-particles>
    <div class="login-container">
      <h1>Login</h1>
      <div class="login">
        <form class="login-box">
          <p>
            Username:
            <input
              id="username"
              type="text"
              required="required"
              placeholder="Enter your username"
              name="u"
              v-model="user.username"
            />
          </p>
          <p>
            Password:
            <input
              id="password"
              type="password"
              required="required"
              placeholder="Enter your password"
              name="u"
              v-model="user.password"
            />
          </p>
        </form>

        <div class="error-box" v-if="loading" style="color: red">Invalid Username or Password</div>

        <div class="login-box">
          <button class="login-btn" type="submit" v-on:click="handleLogin">
            login
          </button>
        </div>
        <br />
        <h4>OR</h4>
        <button v-on:click="moveToRegister">sign up</button>
      </div>
    </div>
  </div>
</template>

<script>
import User from "../../../models/user";
export default {
  name: "Login",

  data() {
    return {
      content: "Login Page",
      user: new User("", ""),
      loading: false,
      message: ''
    };
  },

  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },

  created() {
    if (this.loggedIn) {
      console.log("LoggedIn");
      this.$router.push("/home/profile");
    }
  },

  methods: {
    handleLogin() {
      if (this.user.username && this.user.password) {
        this.$store.dispatch("auth/login", this.user).then(

          () => {
              this.$router.push("/home/profile");
            },
            error => {
              this.loading = true;
              console.log("Login failed")
              this.message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
          }

          // (response) => {
          //   if (Object.keys(response).length != 0) {
          //     this.$router.push("/home/profile");
          //   } else {
          //     // login failed --> show error box
          //     console.log("Login failed")
          //     this.loading = true

          //   }
          // }
        );
      }
    },

    moveToRegister() {
      this.$router.push("/welcome/register");
    },
  },
};
</script>

<style scoped>
.particles {
  background-image: url("../../../assets/bg2.jpg");
  background-size: cover;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
}

p {
  margin: 25px 0;
}
</style>

<style>
h1 {
  margin-bottom: 30px;
}

input {
  width: 270px;
  height: 42px;
  padding: 0 15px;
  background: #2d2d2d; /* browsers that don't support rgba */
  background: rgba(45, 45, 45, 0.15);
  -moz-border-radius: 6px;
  -webkit-border-radius: 6px;
  border-radius: 6px;
  border: 1px solid #3d3d3d; /* browsers that don't support rgba */
  border: 1px solid rgba(255, 255, 255, 0.15);
  -moz-box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.1) inset;
  -webkit-box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.1) inset;
  box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.1) inset;
  font-family: "PT Sans", Helvetica, Arial, sans-serif;
  font-size: 14px;
  color: rgb(26, 24, 24);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  -o-transition: all 0.2s;
  -moz-transition: all 0.2s;
  -webkit-transition: all 0.2s;
  -ms-transition: all 0.2s;
}

input:-moz-placeholder {
  color: rgb(119, 111, 111);
}
input:-ms-input-placeholder {
  color: rgb(119, 111, 111);
}
input::-webkit-input-placeholder {
  color: rgb(119, 111, 111);
}

input:focus {
  outline: none;
  -moz-box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.1) inset,
    0 2px 7px 0 rgba(0, 0, 0, 0.2);
  -webkit-box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.1) inset,
    0 2px 7px 0 rgba(0, 0, 0, 0.2);
  box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.1) inset,
    0 2px 7px 0 rgba(0, 0, 0, 0.2);
}

button {
  cursor: pointer;
  width: 300px;
  height: 44px;
  margin-top: 25px;
  padding: 0;
  background: #1f76bde5;
  -moz-border-radius: 6px;
  -webkit-border-radius: 6px;
  border-radius: 6px;
  border: 1px solid #267cc2;
  -moz-box-shadow: 0 15px 30px 0 rgba(255, 255, 255, 0.25) inset,
    0 2px 7px 0 rgba(0, 0, 0, 0.2);
  -webkit-box-shadow: 0 15px 30px 0 rgba(255, 255, 255, 0.25) inset,
    0 2px 7px 0 rgba(0, 0, 0, 0.2);
  box-shadow: 0 15px 30px 0 rgba(255, 255, 255, 0.25) inset,
    0 2px 7px 0 rgba(0, 0, 0, 0.2);
  font-family: "PT Sans", Helvetica, Arial, sans-serif;
  font-size: 14px;
  font-weight: 700;
  color: #fff;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  -o-transition: all 0.2s;
  -moz-transition: all 0.2s;
  -webkit-transition: all 0.2s;
  -ms-transition: all 0.2s;
}

button:hover {
  -moz-box-shadow: 0 15px 30px 0 rgba(255, 255, 255, 0.15) inset,
    0 2px 7px 0 rgba(0, 0, 0, 0.2);
  -webkit-box-shadow: 0 15px 30px 0 rgba(255, 255, 255, 0.15) inset,
    0 2px 7px 0 rgba(0, 0, 0, 0.2);
  box-shadow: 0 15px 30px 0 rgba(255, 255, 255, 0.15) inset,
    0 2px 7px 0 rgba(0, 0, 0, 0.2);
}

button:active {
  -moz-box-shadow: 0 15px 30px 0 rgba(255, 255, 255, 0.15) inset,
    0 2px 7px 0 rgba(0, 0, 0, 0.2);
  -webkit-box-shadow: 0 15px 30px 0 rgba(255, 255, 255, 0.15) inset,
    0 2px 7px 0 rgba(0, 0, 0, 0.2);
  box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.1) inset,
    0 1px 4px 0 rgba(0, 0, 0, 0.1);

  border: 0px solid #ef4300;
}

.login-container {
  -moz-border-radius: 6px;
  -webkit-border-radius: 6px;
  border-radius: 5% !important;
  background: #fff;
  box-shadow: 0 10px 100px rgba(0, 0, 0, 0.27);
  border-radius: 2px;
  width: 100%;
  max-width: 500px;
  display: inline-block;
  vertical-align: middle;
  position: relative;
  padding: 80px 55px 50px;
  min-height: 500px;
  position: absolute;
  top: 40%;
  left: 0;
  right: 0;
  margin: 0 auto;
  margin-top: -160px;
}
</style>
