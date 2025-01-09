<template>
	<div class="flex w-full flex-grow bg-white border-t border-l border-gray-300 rounded-tl-xl">
		<div id="side-bar" class="w-1/3 text-left">
			<component :is="activeComponent" :robots="robots"></component>
		</div>
		<RobotsMap :robotsList="robots.list" class="flex w-2/3 border-l border-gray-300 overflow-hidden" />
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
				// TODO: listen for this data online
				robots: {
					data: {
						total: 8,
						functional: 5,
						faulty: 2,
						unresponsive: 1,
					},
					list: [
						{ name: "Traffic Light 1", code: 0 },	// TODO: pass ids instead of robots name
						{ name: "Traffic Light 2", code: 2 },
						{ name: "Traffic Light 3", code: 13 },
						{ name: "Traffic Light 4", code: 7 },
						{ name: "Traffic Light 5", code: 17 },
						{ name: "Traffic Light 6", code: 6 },
						{ name: "Traffic Light 7", code: 1 },
						{ name: "Traffic Light 8", code: 11 },
					]
				},
			};
		},
		props: {
			activeAction: {
				type: String,
				required: true,
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
