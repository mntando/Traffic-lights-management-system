<template>
  <div id="app" class="text-center p-4">
    <img alt="Vue logo" src="./assets/logo.png" class="w-24 mx-auto mb-4" />
    <HelloWorld msg="Welcome to Your Vue.js App by MV" />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';

export default {
  name: 'App',
  components: {
    HelloWorld,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 20px;
}
</style>
