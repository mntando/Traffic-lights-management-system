<template>
	<div class="flex w-full bg-white h-full border-t border-l border-gray-300 rounded-tl-xl overflow-hidden">
		<div class="w-2/5 p-2">
			<component :is="activeComponent"></component>
		</div>
		<MapDiv class="3/5 border-l border-gray-300" />
	</div>
</template>

<script>
	import MapDiv from './Map.vue';
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
