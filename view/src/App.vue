<template>
	<div id="app" class="flex flex-col text-center w-screen h-screen bg-gray-50 text-gray-700 select-none">
		<TitleBar @minimize="minimizeWindow" @maximize="maximizeWindow" @close="closeWindow" :connection=false />
		<div id="main" class="flex w-full flex-grow overflow-hidden">
			<NavBar v-model:activeAction="activeAction" @action="action($event)"/>
			<MainPage v-model:activeAction="activeAction"/>
		</div>
	</div>
</template>

<script>
import TitleBar from './components/TitleBar.vue';
import NavBar from './components/NavBar.vue';
import MainPage from './components/MainPage.vue';

export default {
	name: 'App',
	data() {
		return {
		activeAction: 'overview',
		};
	},
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
		action(event) {
			this.activeAction = event;
		},
	},
};
</script>

<style scoped>

</style>
