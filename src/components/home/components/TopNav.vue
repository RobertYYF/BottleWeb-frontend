<template>

<div>
    <button class="login-btn" @click="toLogin" v-if="!loggedIn">login</button>
    <div class="after-login" v-if="loggedIn">
      <div style="display:inline;">
      <el-dropdown>
      <i class="el-icon-setting" style="margin-right: 0px; color:black"></i>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.native="logout">sign out</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    </div>
    <span class="name">{{currentUser.username}}</span>
    </div>
  
</div>
    
</template>

<script>
export default {
  name: "TopNav",

  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
    currentUser() {
      return this.$store.state.auth.user;
    },
  },

  data() {
    return {
      username: null,
      show: false,
    };
  },

  methods: {
    toLogin() {
        this.$router.push("/welcome/login");
    },
    logout() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/welcome/login");
    },
  },
};
</script>

<style scoped>
.login-btn {
    float: right;
    padding: 5px;
    margin: 15px;
}

.name {
  padding: 20px;
}

.after-login {
  text-align: right;
  padding: 20px;
}

</style>