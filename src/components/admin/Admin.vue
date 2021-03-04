<template>
  <div class="admin">
    <el-container style="height: 100%; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <img src="../../assets/chess.png" alt="Chess">
        <el-menu :default-openeds="['1', '3']">
          <el-submenu index="1">
            <template slot="title"
              ><i class="el-icon-message"></i>Message</template
            >
            <el-menu-item-group>
              <el-menu-item index="1-1" @click.native="moveToMessage">Message Option1</el-menu-item>
              <el-menu-item index="1-2">Option2</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2" v-if="isAdmin">
            <template slot="title"
              ><i class="el-icon-setting"></i>Admin</template
            >
            <el-menu-item-group>
              <el-menu-item index="3-1" @click.native="moveToAdmin">Admin Option</el-menu-item>
              <el-menu-item index="3-2">Option2</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"
              ><i class="el-icon-info"></i>User</template
            >
            <el-menu-item-group>
              <el-menu-item index="3-1" @click.native="moveToProfile">Profile</el-menu-item>
              <el-menu-item index="3-2">Option2</el-menu-item>
            </el-menu-item-group>
            
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px; color:white"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="logout">sign out</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span style="color:white">{{currentUser.username}}</span>
        </el-header>

        <el-main>
          <router-view class="home-view"></router-view>
        </el-main>

      </el-container>
    </el-container>
  </div>
</template>

<script>

export default {
  name: "Admin",

  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    isAdmin() {
      return this.$store.state.auth.user.user_role == "ADMIN";
    }
  },

  data() {
    return {
    };
  },

  methods: {
    logout() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/welcome/login");
    },
    changePwd() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/welcome/login");
    },
    moveToProfile() {
      this.$router.push("/admin/profile");
    },
    moveToMessage() {
      this.$router.push("/admin/message");
    },
    moveToAdmin() {
      this.$router.push("/admin/adminoption");
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
  
  .el-aside {
    color: #333;
  }

.el-aside {
height:100vh;
}

</style>
