<template>
    <router-view class="view"></router-view>
</template>

<script>
export default {
  name: 'Home',
  
  props: {
    msg: String
  },

  data () {
    return {
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  margin: 40px 0 0;
}
</style>
