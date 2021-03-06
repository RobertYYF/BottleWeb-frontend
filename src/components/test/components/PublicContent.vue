<template>
    <div>
        <!-- Private content retrieve test -->
        <p>{{content}}</p>
    </div>
</template>

<script>
import UserService from '../../../services/user.service';

export default {
  name: 'PublicContent',
  
  props: {
  },

  data () {
    return {
        content: ''
    }
  },

  mounted() {
    UserService.getPublicContent().then(
      response => {
        this.content = response.data;
      },
      error => {
        this.content =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  margin: 40px 0 0;
}
</style>