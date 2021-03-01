<template>
  <div class="container">
      <h1>Profile</h1>
      <div class="user-info">
          <p>{{currentUser.username}}</p>
          <p>Token: {{currentUser.accessToken.substring(0, 20)}} ... {{currentUser.accessToken.substr(currentUser.accessToken.length - 20)}} </p>
          <p>Role: {{currentUser.user_role}}</p>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Profile',
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
  }
};
</script>