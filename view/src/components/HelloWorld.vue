<template>
  <div class="space-y-6 p-6">
    <h1 class="text-3xl font-bold mb-6">{{ msg }}</h1>
    <p class="text-base mb-6">
      For a guide and recipes on how to configure / customize this project,<br />
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener" class="text-green-500 hover:underline">vue-cli documentation</a>.
    </p>

    <h3 class="text-2xl font-semibold mb-4">Installed CLI Plugins</h3>
    <ul class="list-none p-0 space-x-6 flex justify-center">
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel" target="_blank" rel="noopener" class="text-green-500 hover:underline">babel</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint" target="_blank" rel="noopener" class="text-green-500 hover:underline">eslint</a></li>
    </ul>

    <h3 class="text-2xl font-semibold mb-4">Essential Links</h3>
    <ul class="list-none p-0 space-x-6 flex justify-center">
      <li><a href="https://vuejs.org" target="_blank" rel="noopener" class="text-green-500 hover:underline">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank" rel="noopener" class="text-green-500 hover:underline">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank" rel="noopener" class="text-green-500 hover:underline">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank" rel="noopener" class="text-green-500 hover:underline">Twitter</a></li>
      <li><a href="https://news.vuejs.org" target="_blank" rel="noopener" class="text-green-500 hover:underline">News</a></li>
    </ul>

    <h3 class="text-2xl font-semibold mb-4">Ecosystem</h3>
    <ul class="list-none p-0 space-x-6 flex justify-center">
      <li><a href="https://router.vuejs.org" target="_blank" rel="noopener" class="text-green-500 hover:underline">vue-router</a></li>
      <li><a href="https://vuex.vuejs.org" target="_blank" rel="noopener" class="text-green-500 hover:underline">vuex</a></li>
      <li><a href="https://github.com/vuejs/vue-devtools#vue-devtools" target="_blank" rel="noopener" class="text-green-500 hover:underline">vue-devtools</a></li>
      <li><a href="https://vue-loader.vuejs.org" target="_blank" rel="noopener" class="text-green-500 hover:underline">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener" class="text-green-500 hover:underline">awesome-vue</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },
};
</script>

<style scoped>
/* Custom scoped styles for any specific tweaks */
</style>
