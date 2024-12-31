<template>
  <div id="app" class="flex flex-col text-center h-screen bg-gray-min text-gray-700 select-none">
    <TitleBar @minimize="minimizeWindow" @maximize="maximizeWindow" @close="closeWindow" :connection=false />
    <div id="main" class="flex w-full h-full overflow-hidden">
      <NavBar />
      <MainPage />
    </div>
  </div>
</template>

<script>
import TitleBar from './components/TitleBar.vue';
import NavBar from './components/NavBar.vue';
import MainPage from './components/MainPage.vue';

export default {
  name: 'App',
  components: {
    TitleBar,
    NavBar,
    MainPage,
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
