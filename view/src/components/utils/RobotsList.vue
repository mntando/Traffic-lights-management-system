<template>
	<div class="flex flex-col flex-grow">
		<ul>
		<li v-for="(trafficLight, index) in trafficLightsList" :key="index" @mouseover="hoverIndex = index" @mouseleave="hoverIndex = -1" class="flex flex-row mb-2 p-3 hover:bg-gray-200 rounded-lg transition-all">
			<div class="flex flex-col">
				<div class="font-semibold text-lg">
					{{ trafficLight.name }}
				</div>
				<div class="text-sm" :class="msg(trafficLight.code).startsWith('Faults:') ? 'text-red-500' : 'text-green-500'">
					{{ msg(trafficLight.code) }}
				</div>
			</div>
			<svg xmlns="http://www.w3.org/2000/svg" v-if="hoverIndex === index" 
				class="ml-auto my-auto p-2 w-10 h-10 rounded-lg stroke-current hover:bg-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
			</svg>
		</li>
		</ul>
	</div>
</template>  

<script>
	import { msg } from '@/utils/utils.js';

	export default {
		name: 'RobotsList',
		props: {
			trafficLightsList: {
				type: Array,
				required: true,
			}
		},
		data() {
			return {
				hoverIndex: -1
			}
		},
		methods: {
			msg,
		},
	}
</script>

<style scoped>

</style>
