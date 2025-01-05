<template>
	<div class="flex flex-col h-full p-4 scrollable">
		<h1 class="text-2xl font-semibold">Search</h1>
		<div class="flex items-center justify-center pt-4">
			<div class="relative w-full">
				<input v-model="searchQuery" @input="onSearch" type="text" placeholder="Search..." class="w-full py-2 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"/>
				<svg class="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M11 17l6-6-6-6M17 11H4" />
				</svg>
			</div>
		</div>
		<RobotsList :robotsList="robots.list" class="mt-2 flex-grow"/>
	</div>
</template>

<script>
    import RobotsList from '../util/RobotsList.vue';

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
		methods: {
			onSearch() {
				console.log('Searching for:', this.searchQuery);
			},
		},
	};
</script>