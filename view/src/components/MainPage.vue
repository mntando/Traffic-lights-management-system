<template>
	<div class="flex w-full flex-grow bg-white border-t border-l border-gray-300 rounded-tl-xl">
		<div id="side-bar" class="w-1/3 text-left">
			<component :is="activeComponent" :robots="robots"></component>
		</div>
		<MapDiv class="flex w-2/3 border-l border-gray-300" />
	</div>
</template>

<script>
	import MapDiv from './MapDiv.vue';
	import OverviewPage from './side-bar/Overview.vue';
	import SearchPage from './side-bar/Search.vue';
	import ReportsPage from './side-bar/Reports.vue';
	import AlertsPage from './side-bar/Alerts.vue';
	import MorePage from './side-bar/More.vue';
	import SettingsPage from './side-bar/Settings.vue';
	import AccountPage from './side-bar/Account.vue';

	export default {
		name: 'MainPage',
		components: {
			MapDiv,
			OverviewPage,
			SearchPage,
			ReportsPage,
			AlertsPage,
			MorePage,
			SettingsPage,
			AccountPage,
		},
		data() {
			return {
				// TODO: listen for this online
				robots: {
					data: {
						total: 200,
						functional: 183,
						faulty: 17,
						notResponding: 0,
					},
					list: [
						{ name: "JMN Str. & Masotsha Ave.", code: 0 },
						{ name: "Fort Str. & 10th Ave.", code: 2 },
						{ name: "Fife Str. & 4th Ave.", code: 31 },
						{ name: "Lobengula Str. & 4th Ave.", code: 7 },
						{ name: "Fort Str. & L.T Ave.", code: 19 },
						{ name: "G.S Str. & 13th Ave.", code: 22 },
						{ name: "JMN Str. & 15th Ave.", code: 1 },
						{ name: "Fife Str. & 15th Ave.", code: 11 },
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
