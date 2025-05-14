<template>
	<div @click.self="closeOverlay" class="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center p-4">
		<div class="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden">
			<!-- Header -->
			<header class="flex items-center p-4" :class="`bg-${status.color}-500`">
				<h2 class="text-2xl font-bold text-white">{{ trafficLight.name }}</h2>
				<DropDown :options="show" v-model="selectedOption" class="ml-4 w-24"/>
				<button @click="closeOverlay" class="ml-auto text-white hover:text-gray-200">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
			</header>

			<!-- Body -->
			<div class="flex flex-col p-6 space-y-6">
				<!-- Details -->
				<div class="flex flex-row">
					<span class="font-medium mr-1 text-gray-600">Status:</span>
					<span class="font-medium" :class="`text-${status.color}-500`">{{ status.msg }}</span>
				</div>
				<div class="flex flex-row">
					<span class="font-medium mr-1 text-gray-600">Signal:</span>
					<span class="inline-block text-center font-medium text-red-500">Red</span>
				</div>
				<!-- Override Section -->
				<section class="border-t pt-4 space-y-4">
					<h3 class="text-xl text-left font-medium">Overide</h3>
					<div class="flex flex-col">
						<!-- Color Selector -->
						<label class="text-sm font-medium text-left text-gray-600">Color:</label>
						<DropDown :options="['Green', 'Red']" class="mt-2"/>
					</div>
					<div class="flex justify-end space-x-3 pt-2">
						<button @click="clearOverride" class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">Clear</button>
						<button @click="closeOverlay" class="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200">Cancel</button>
						<button @click="applyOverride" class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">Apply</button>
					</div>
				</section>
			</div>
		</div>
	</div>
</template>

<script>
	import DropDown from '@/components/utils/DropDown.vue'

	import { useOverlayStore } from '@/stores/robotMapStore'
	import { message } from '@/utils/utils.js'

	export default {
		name: 'RobotOverlay',
		components: {
			DropDown
		},
		props: {
			trafficLight: { type: Object, required: true }
		},
		data() {
			return {
				show: ['Str.', 'Ave.'],
				selectedOption: 'Str.',
				signalColor: 'gray'
			}
		},
		computed: {
			status() {
				return {
					msg: message(this.trafficLight.code).msg,
					color: message(this.trafficLight.code).color,
				}
			},
			override() {
				return this.trafficLight.code == 1
			},
		},
		methods: {
			closeOverlay() {
					const store = useOverlayStore()
					store.toggle()
			}
		}
	}
</script>

<style>
</style>
