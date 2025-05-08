<template>
	<div class="flex w-full flex-grow bg-white border-t border-l border-gray-300 rounded-tl-xl">
		<div id="side-bar" class="w-1/3 text-left">
			<component :is="activeComponent" :trafficLights="trafficLights" @focus-request="focusOn"></component>
		</div>
		<div v-if="!loadMap">loading map...</div>
		<RobotsMap ref="mapRef" v-else :trafficLights="trafficLights" class="flex w-2/3 border-l border-gray-300 overflow-hidden" />
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

	import { ref } from 'vue';

	import { simulateTrafficLightUpdates } from "@/utils/utils.js";


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
				stopSimulation: null, // to store clearInterval
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
					location: tl.location,
					code: null,
				}));

				// Start simulation and update codes in real-time
				this.stopSimulation = simulateTrafficLightUpdates((update) => {
					const index = this.trafficLights.findIndex(tl => tl.id.toString() === update.id);
					if (index !== -1) {
						this.trafficLights[index].code = update.code;
					}
				}, 30000, this.trafficLights.length); // TODO: time 30 seconds

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
		setup() {
			const mapRef = ref(null);

			const focusOn = (id) => {
				mapRef.value?.focusOn(id);
			};

			return {
				mapRef,
				focusOn,
			};
		},
	};
</script>
