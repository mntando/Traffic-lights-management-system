<template>
	<div class="flex w-full flex-grow bg-white border-t border-l border-gray-300 rounded-tl-xl">
		<div id="side-bar" class="w-1/3 text-left">
			<component :is="activeComponent" :trafficLights="trafficLights"></component>
		</div>
		<div v-if="!loadMap">loading map...</div>
		<RobotsMap v-else :trafficLights="trafficLights" class="flex w-2/3 border-l border-gray-300 overflow-hidden" />
	</div>
</template>

<script>
	import RobotsMap from './RobotsMap.vue';
	import OverviewPage from './side-bar/Overview.vue';
	import SearchPage from './side-bar/Search.vue';
	import ReportsPage from './side-bar/Reports.vue';
	import AlertsPage from './side-bar/Alerts.vue';
	import MorePage from './side-bar/More.vue';
	import AccountPage from './side-bar/Account.vue';

	import { simulateTrafficLightUpdates } from "@/utils/utils.js";
	import { listenTrafficLightUpdates } from "@/utils/utils.js";

	const USE_HARDWARE = false;

	export default {
		name: 'MainPage',
		components: {
			RobotsMap,
			OverviewPage,
			SearchPage,
			ReportsPage,
			AlertsPage,
			MorePage,
			AccountPage,
		},
		data() {
			return {
				trafficLights: [],
				loadMap: false, // Start with loading
				stopSimulation: null, // To store clearInterval
			};
		},
		props: {
			activeAction: {
				type: String,
				required: true,
			},
		},
		async mounted() {
			await this.fetchTrafficLights();
		},
		methods: {
			async fetchTrafficLights() {
				// Fetch traffic lights from the DB
				const allTrafficlights = await window.dbAPI.getAll();

				// Initialize with code = null
				this.trafficLights = allTrafficlights.map(tl => ({
					id: tl.id,
					name: tl.name,
					location: JSON.parse(tl.location),
					code: null,
				}));

				// Start simulation and update codes in real-time
				if (this.stopSimulation) {
					this.stopSimulation();
					this.stopSimulation = null;
				}

				if (!USE_HARDWARE) {
					this.stopSimulation = simulateTrafficLightUpdates((update) => {
						const index = this.trafficLights.findIndex(tl => tl.id.toString() === update.id);
						if (index !== -1) {
							this.trafficLights[index].code = update.code;
						}
					}, 30000, this.trafficLights.length); // TODO: time 30 seconds
				} else {

				/**
				 * ╔════════════════════════════════════════════════════════════════════════════════╗
				 * ║                         WEBSOCKET ALTERNATIVE APPROACH                         ║
				 * ║                                                                                ║
				 * ║ PURPOSE: Real-time traffic light status updates via WebSocket connection       ║
				 * ║                                                                                ║
				 * ║ HOW IT WORKS:                                                                  ║
				 * ║  - Establishes a WebSocket listener for continuous traffic light updates       ║
				 * ║  - Receives update objects containing: id (string) and code (string)           ║
				 * ║  - Matches incoming updates to traffic lights by ID                            ║
				 * ║  - Updates the 'code' property (light status: red/yellow/green)                ║
				 * ║                                                                                ║
				 * ║ RETURN VALUE: Function reference stored in this.stopSimulation                 ║
				 * ║               - Can be called to disconnect/cleanup the WebSocket listener     ║
				 * ║                                                                                ║
				 * ║ NOTE: Currently disabled in favor of [INSERT_CURRENT_APPROACH_HERE]            ║
				 * ║       Consider re-enabling for real-time updates without polling               ║
				 * ║                                                                                ║
				 * ╚════════════════════════════════════════════════════════════════════════════════╝
				 */

					this.stopSimulation = listenTrafficLightUpdates((update) => {
						const index = this.trafficLights.findIndex(
							tl => tl.id.toString() === update.id
						);
						if (index !== -1) {
							this.trafficLights[index].code = update.code;
						}
					});
				}

				// Show the component after loading
				this.loadMap = true;
			},
			beforeDestroy() {
				// Stop simulation when component is destroyed
				if (this.stopSimulation) {
					this.stopSimulation();
				}
			}
		},
		computed: {
			activeComponent() {
				const componentName = this.activeAction.charAt(0).toUpperCase() + this.activeAction.slice(1) + 'Page';
				return this.$options.components[componentName];
			},
		},
	};
</script>
