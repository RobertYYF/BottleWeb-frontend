<template>
  <div class="container">
      <h1>Message1</h1>
  </div>
</template>

<script>
export default {
  name: 'Message',
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