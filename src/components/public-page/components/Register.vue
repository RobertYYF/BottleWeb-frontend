<template>
  <div class="register">
    <vue-particles color="#dedede"></vue-particles>
    <div class="return-home"><button class="home-btn" @click="toHome">Home</button></div>
    <div class="login-container">
      <h1>Register</h1>

      <form class="register-box">
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
        <p>
          Role:
          <select
            name="userRole"
            id="user_role"
            required="required"
            v-model="user.user_role"
          >
            <option value="ADMIN">Admin</option>
            <option value="USER">User</option>
          </select>
        </p>
      </form>
      <br />

      <div class="register-success" v-if="successful" style="color: green">Success</div>

      <button class="register-btn" type="submit" v-on:click="handleRegister">
        Sign Up
      </button>
      <br />
      <button class="return-btn" type="submit" v-on:click="returnFunc">
        Back
      </button>
    </div>
  </div>
</template>

<script>
import User from "../../../models/user";

export default {
  name: "Register",

  data() {
    return {
      user: new User("", "", ""),
      submitted: false,
      successful: false,
      message: "",
      content: "Register Page",
    };
  },

  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },

  mounted() {
    if (this.loggedIn) {
      this.$router.push("/home");
    }
  },

  methods: {
    handleRegister() {
      this.message = "";
      this.submitted = true;
      if (this.user.username && this.user.password && this.user.user_role) {
        this.$store.dispatch("auth/register", this.user).then(
          (data) => {
            this.message = data.message;
            this.successful = true;
          },
          (error) => {
            this.message =
              (error.response && error.response.data) ||
              error.message ||
              error.toString();
            this.successful = false;
          }
        );
      }
    },

    toHome() {
          this.$router.push("/home");
      },

    returnFunc() {
      this.$router.push("/welcome/login");
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
select {
  display: inline-block;
  width: 100px;
  height: 30px;
  position: relative;
  vertical-align: middle;
  padding: 0;
  overflow: hidden;
  background-color: #fff;
  color: #555;
  border: 1px solid #aaa;
  text-shadow: none;
  border-radius: 4px;
  transition: box-shadow 0.25s ease;
}

.return-btn {
  width: 100px;
  background-color: rgb(91, 182, 235);
}

.register {
  background-image: url("../../../assets/bg2.jpg");
  background-size: cover;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
}

.register-box {
  margin-bottom: -30px;
}

p {
  margin: 25px 0;
}
</style>
