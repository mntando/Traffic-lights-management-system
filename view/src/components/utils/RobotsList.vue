<template>
	<div class="flex flex-col flex-grow">
		<ul>
		<li v-for="(trafficLight, index) in trafficLights" :key="index" @mouseover="hoverIndex = index" @mouseleave="hoverIndex = -1" @click="mapStore.focusOn(trafficLight.id)" class="flex flex-row mb-2 p-3 hover:bg-gray-200 rounded-lg transition-all">
			<div class="flex flex-col">
				<div class="font-semibold text-lg">
					{{ trafficLight.name }}
				</div>
				<div class="text-sm" :class="`text-${message(trafficLight.code).color}-500`">
					{{ message(trafficLight.code).msg }}
				</div>
			</div>
			<button class="ml-auto my-auto p-2 w-10 h-10 rounded-lg stroke-current hover:bg-gray-300">
				<svg xmlns="http://www.w3.org/2000/svg" v-if="hoverIndex === index"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
				</svg>
			</button>
		</li>
		</ul>
	</div>
</template>  

<script>
	import { message } from '@/utils/utils.js';

	import { useRobotMapStore } from '@/stores/robotMapStore'

	export default {
		name: 'RobotsList',
		props: {
			trafficLights: {
				type: Array,
				required: true,
			}
		},
		data() {
			return {
				hoverIndex: -1,
			}
		},
		mounted() {
			// Initialize the map store
			this.mapStore = useRobotMapStore()
		},
		methods: {
			message,
		},
	}
</script>

<style scoped>

</style>
