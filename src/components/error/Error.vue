<template>
  <div class="home">
    <el-container style="height: 100%; border: 1px solid #eee">
      <el-container>
        <el-header style="text-align: right; font-size: 12px">
            <span>Error</span>
        </el-header>

        <el-main>
            <span>Emmm something went wrong, please login again</span>
            <br>
            <button v-on:click="backToLogin">back to login</button>
        </el-main>

      </el-container>
    </el-container>
  </div>
</template>

<script>

export default {
  name: "Error",

  data() {
    return {
      
    };
  },

  // automatically logout when navigate to error page
  mounted() {
      this.logout();
  },

  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },

  methods: {
    logout() {
      this.$store.dispatch("auth/logout");
    },
    backToLogin() {
        this.$router.push("/welcome/login");
     }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

html,body,#home,.el-container{
        /*设置内部填充为0，几个布局元素之间没有间距*/
        padding: 0px;
         /*外部间距也是如此设置*/
        margin: 0px;
        /*统一设置高度为100%*/
        height: 100%;
    }

@import url("//unpkg.com/element-ui@2.0.11/lib/theme-chalk/index.css");
.el-header {
    background-color: #000000;
    color: rgb(0, 0, 0);
    line-height: 60px;
  }

</style>
