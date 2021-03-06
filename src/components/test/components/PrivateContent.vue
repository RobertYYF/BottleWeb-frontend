<template>
    <div>
        <p>{{content}}</p>
    </div>
</template>

<script>
import UserService from '../../../services/user.service';

export default {
  name: 'PrivateContent',
  
  props: {
  },

  data () {
    return {
        content: ''
    }
  },

  mounted() {
    UserService.getPrivateContent().then(
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