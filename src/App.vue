<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App",
  beforeMount() {
      var SimulatedLoginToken = this.getQueryString('SimulatedLoginToken');
      if(SimulatedLoginToken){
        window.localStorage.setItem('token',SimulatedLoginToken);
      }
      
      var url = window.location.href;
      if(url.indexOf("Download") != -1 || url.indexOf("download") != -1 || url.indexOf("Register") != -1 || url.indexOf("register") != -1){
        return false;
      }

      if(url.indexOf("yq_code") != -1){
        return false;
      }

      var huoqutoken = window.localStorage.getItem("token");
      if ( huoqutoken == "" || huoqutoken == null || huoqutoken == "null" || huoqutoken == undefined){
        this.login();
      }else{
        this.$router.push('Home')
      }
  },
  methods: {
    login(){
        this.$router.push({'path':'/Login'})
      },
    getQueryString(name) {
      let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
      let r = window.location.search.substr(1).match(reg);
      if (r != null) {
          return unescape(r[2]);
      };
      return null;
    },
  }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  width: 100vw;
  height: 100vh;
  color: #151515;
	background: linear-gradient(to bottom, #fdd287 0%,#eaa050 100%);
}
</style>
