<template>
	<div id="app" class="flex flex-col text-center w-screen h-screen bg-gray-50 text-gray-700 select-none">
		<RobotOverlay v-if="isOverlayOpen" :trafficLightId="this.overlayStore.selectedId"/>
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
	import RobotOverlay from './components/RobotOverlay.vue';

	import { useOverlayStore } from '@/stores/robotMapStore'; // Import the store

	export default {
		name: 'App',
		data() {
			return {
				activeAction: 'overview',
				isOverlayOpen: false,
			};
		},
		components: {
			TitleBar,
			NavBar,
			MainPage,
			RobotOverlay
		},
		mounted() {
			// Watch overlay store for changes
			this.overlayStore = useOverlayStore()
			this.unsub = this.overlayStore.$subscribe((mutation, state) => {
				if (mutation.storeId === 'overlay' && mutation.events && mutation.events.key === 'isOpen') {
					this.isOverlayOpen = state.isOpen
				}
			})
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
		beforeUnmount() {
			// Clean up subscription
			if (this.unsub) {
				this.unsub()
				this.unsub = null
			}
		}
	};
</script>

<style scoped>

</style>
