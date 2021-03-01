<template>
  <div class="container">
      <h1>Admin Page</h1>
  </div>
</template>

<script>
export default {
  name: 'Admin',
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