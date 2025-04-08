<template>
	<div class="flex w-full flex-grow bg-white border-t border-l border-gray-300 rounded-tl-xl">
		<div id="side-bar" class="w-1/3 text-left">
			<component :is="activeComponent" :trafficLights="trafficLights"></component>
		</div>
		<div v-if="!loadMap">loading map...</div>
		<RobotsMap v-else :trafficLightsList="trafficLights.list" class="flex w-2/3 border-l border-gray-300 overflow-hidden" />
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
				trafficLights: {
					list: [],
				},
				loadMap: false, // Start with loading
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
				// Fetch traffic lights data from the database
				const allTrafficlights = await window.dbAPI.getAll();

				// Map the hardcoded `code` values to the fetched traffic lights
				const hardcodedCodes = [0, 2, 13, 7, 17, 6, 1, 11, 0, 2, 13, 7, 17, 6, 1, 11, 3, 12, 8, 9, 6, 1]; // Retain these codes
				const trafficLightsWithCodes = allTrafficlights.map((trafficLight, index) => ({
					id: trafficLight.id,
					name: trafficLight.name,
					location: trafficLight.location,
					code: hardcodedCodes[index + 1] || null, // Map codes; fallback to null if out of range
				}));

				// Update the trafficLights object
				this.trafficLights.list = trafficLightsWithCodes;

				// Only show component when data is ready
				this.loadMap = true;
			},
		},
		computed: {
			activeComponent() {
				const componentName = this.activeAction.charAt(0).toUpperCase() + this.activeAction.slice(1) + 'Page';
				return this.$options.components[componentName];
			},
		},
	};
</script>
