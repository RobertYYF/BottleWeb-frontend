<template>
  <div class="home">
    <div class="top">
      <div class="top-nav"><topnav></topnav></div>
      <div class="top-info">
        <div class="admin-option" v-if="isadmin">
          <h2 style="margin-right: 25px; color:white">Welcome back ADMIN</h2>
          <button @click="moveToAdmin">Manage users</button>
        </div>
      </div>
    </div>
    <div class="main-nav">
      <div class="btn">
        <img src="../../assets/overview.png">
      </div>
      <div class="btn">
        <img src="../../assets/backend.png">
      </div>
      <div class="btn">
        <img src="../../assets/frontend.png">
      </div>
      <div class="btn">
        <img src="../../assets/practice.png">
      </div>
    </div>
    <div class="bottom-info">
      <h2 style="color: white; padding-top:60px">
        Share your thoughts with other learners
      </h2>
      <h2 style="color: white; padding-top:40px" v-if="!loggedIn">
        Login to start chatting
      </h2>
      <h2 style="color: white; padding-top:40px" v-if="loggedIn">
        Click ⇩ to chat
      </h2>
    </div>

    <div class="chat" v-if="loggedIn">
        <div class="chat-btn">
            <div class="up-btn" @click="handler" v-if="!show">
                <svg class="icon icon-circle-up"><use xlink:href="#icon-circle-up"></use></svg>
                <symbol id="icon-circle-up" viewBox="0 0 32 32">
                <path d="M0 16c0 8.837 7.163 16 16 16s16-7.163 16-16-7.163-16-16-16-16 7.163-16 16zM29 16c0 7.18-5.82 13-13 13s-13-5.82-13-13 5.82-13 13-13 13 5.82 13 13z"></path>
                <path d="M22.086 20.914l2.829-2.829-8.914-8.914-8.914 8.914 2.828 2.828 6.086-6.086z"></path>
                </symbol>
            </div>

            <div class="down-btn" @click="handler" v-if="show">
                <svg class="icon icon-circle-down"><use xlink:href="#icon-circle-down"></use></svg>
                <symbol id="icon-circle-down" viewBox="0 0 32 32">
                <path d="M32 16c0-8.837-7.163-16-16-16s-16 7.163-16 16 7.163 16 16 16 16-7.163 16-16zM3 16c0-7.18 5.82-13 13-13s13 5.82 13 13-5.82 13-13 13-13-5.82-13-13z"></path>
                <path d="M9.914 11.086l-2.829 2.829 8.914 8.914 8.914-8.914-2.828-2.828-6.086 6.086z"></path>
                </symbol>
            </div> 
        </div>
        <div class="chat-window" v-if="show">
          <chat></chat>
        </div>
    </div>

  </div>
</template>

<script>
import TopNav from "./components/TopNav.vue";
import Chat from './components/Chat.vue';

export default {
  name: "Home",

  components: {
    topnav: TopNav,
    chat: Chat,
  },

  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
    currentUser() {
      return this.$store.state.auth.user;
    },
    isadmin() {
      if (this.loggedIn) {
        return  this.$store.state.auth.user.user_role == "ADMIN";
      }
      return false;
    }
  },

  data() {
    return {
      show: false,
      direction: "rtl",
    };
  },

  methods: {
    handler() {
        this.show = !this.show;
    },
    moveToAdmin() {
      this.$router.push("/admin");
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main-nav .bottom-info {
  display: block;
  width: 100%;
  text-align: center;
}

.top-nav {
  height: 65px;
  background-color: rgb(237, 246, 246);
  opacity: 0.9;
}

.top-info {
  height: 450px;
}

.top {
  background-color: #004aad;
  background-image: url("../../assets/title.png");
  background-repeat: no-repeat;
  background-size: auto;
}

.main-nav {
  height: 500px;
  background-color: #004aad;
  padding-left: 10px;
  padding-right: 10px;
  display: flex;
}

.bottom-info {
  height: 200px;
  background-color: #004aad;
}

.btn {
  flex: 1;
  height: 100%;
}

.btn + .btn {
  margin-left: 10px;
}

.chat {
    z-index: 999;
    position: fixed;
    bottom: 0;
    width: 100%;
    display:relative;
    background-color:rgb(238, 242, 246);
    opacity: 0.9;
    border-radius: 4% !important;
}

.chat-btn .chat-window {
    display: block;
}

.chat-btn {
    width: 100%;
    padding: 5px;
}

.chat-btn:hover {
    transform: scale(1.16);
}

.chat-window {
    height: 600px;
}

.icon {
  display: inline-block;
  width: 1em;
  height: 1em;
  stroke-width: 0;
  stroke: currentColor;
  fill: currentColor;
}

.btn > img {
width: 100%;
height: 100%;
cursor: pointer;
transition: all 1s linear;
transition-duration: 500ms;
}

.btn:hover img {
transform: scale(1.035);
}

img {
    width: auto;
    height: auto;
}

.top-info {
  text-align: right;
}

.admin-option {
  margin-right: 140px;
  margin-top: 140px;
  padding: 20px;
}

</style>
