<template>

<div>
<h1>Chat Window</h1>
<h2>To be implemented</h2>
</div>
    
</template>

<script>
export default {
  name: "Chat",

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
    };
  },

  methods: {

  },
};
</script>

<style scoped>


</style>