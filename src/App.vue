<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App",
  beforeMount() {
      var huoqutoken = window.localStorage.getItem("token");
      if ( huoqutoken == "" || huoqutoken == null || huoqutoken == "null" || huoqutoken == undefined)  
      {
        this.login();
      } 
  },
  methods: {
     login(){
        this.$router.push({'path':'/Login'})
    }
  }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #151515;
}
</style>
