<template>
  <div id="app" class="text-center">
    <TitleBar @minimize="minimizeWindow" @maximize="maximizeWindow" @close="closeWindow" :connection=false />
    <img alt="Vue logo" src="./assets/logo-vue.png" class="w-24 mx-auto mb-4" />
    <HelloWorld msg="Welcome to Your Vue.js App by MV" />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';
import TitleBar from './components/TitleBar.vue';

export default {
  name: 'App',
  components: {
    HelloWorld,
    TitleBar,
  },
  methods: {
    minimizeWindow() {
      window.winAPI.minimize();
    },
    maximizeWindow() {
      window.winAPI.maximize();
    },
    closeWindow() {
      window.winAPI.close();
    },
  },
};

</script>

<style scoped>

</style>
