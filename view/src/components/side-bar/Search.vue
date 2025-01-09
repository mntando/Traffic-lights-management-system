<template>
	<div class="flex flex-col h-full p-4 scrollable">
		<h1 class="text-2xl font-semibold">Search</h1>
		<div class="flex items-center justify-center pt-4">
			<div class="relative w-full">
				<input id="search" v-model="searchQuery" @input="onSearch" type="text" placeholder="Search..." ref="searchInput" class="w-full py-2 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"/>
				<svg class="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M11 17l6-6-6-6M17 11H4" />
				</svg>
			</div>
		</div>
		<RobotsList v-if="filteredRobots.length" :robotsList="filteredRobots" class="mt-2 flex-grow" />
		<div v-else class="flex items-center justify-center flex-grow">
			<p class="text-lg text-gray-500">No robots found</p>
		</div>
	</div>
</template>

<script>
	import RobotsList from '../utils/RobotsList.vue';

	export default {
		name: 'SearchPage',
		components: {
			RobotsList,
		},
		props: {
			robots: {
				type: Object,
				required: true,
			},
		},
		data() {
			return {
				searchQuery: '',
			};
		},
		computed: {
			filteredRobots() {
				if (!this.searchQuery.trim()) {
					return [];
				}
				return this.robots.list.filter(robot =>
					robot.name.toLowerCase().includes(this.searchQuery.toLowerCase())
				);
			},
		},
		methods: {
			onSearch() {
				// TODO: method can be used for additional side effects if needed
				// console.log('Searching for:', this.searchQuery);
			},
		},
		mounted() {
			this.$refs.searchInput.focus();
		},
	};
</script>

<style scoped>
</style>
