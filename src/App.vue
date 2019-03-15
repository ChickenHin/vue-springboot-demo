<template>
  <div id="app">
    <headerbar></headerbar>
    <sidebar></sidebar>
    <router-view/>
  </div>
</template>

<script>

import headerbar from './components/Headerbar.vue'
import sidebar from './components/Sidebar.vue'

export default{
  components: {
    headerbar: headerbar,
    sidebar: sidebar
  },
  beforeCreate: function () {
    document.getElementsByTagName('body')[0].className = 'app_body'
    document.getElementsByTagName('html')[0].className = 'app_html'
  }
}

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
  position: relative;
}
.app_body, .app_html {
  margin: 0;
  height: 100%;
}
</style>
