<template>
	<div class="map-container">
		<div id="map" class="reletive w-full h-full">
			<div class="absolute top-4 left-4 flex flex-col space-y-2">
				<button @click="zoomIn" class="bg-white shadow p-2 border border-gray-300 rounded-full hover:bg-gray-50 transition duration-100 ease-in-out transform hover:scale-110" aria-label="Zoom In">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
					</svg>
				</button>
				<button @click="zoomOut" class="bg-white shadow p-2 border border-gray-300 rounded-full hover:bg-gray-50 transition duration-100 ease-in-out transform hover:scale-110" aria-label="Zoom Out">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
					</svg>
				</button>
				<button @click="goToTown" class="bg-white shadow p-2 border border-gray-300 rounded-full hover:bg-gray-50 transition duration-100 ease-in-out transform hover:scale-110 text-blue-500" aria-label="Go to Location">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<circle cx="12" cy="12" r="9" />
						<circle cx="12" cy="12" r="3" fill="currentColor" />
						<line x1="12" y1="2" x2="12" y2="-8" />
						<line x1="12" y1="22" x2="12" y2="32" />
						<line x1="2" y1="12" x2="-8" y2="12" />
						<line x1="22" y1="12" x2="32" y2="12" />
					</svg>
				</button>
			</div>
		</div>
	</div>
</template>

<script>
	import L from "leaflet";
	import { msg } from '@/utils/utils.js';

	export default {
		name: "RobotsMap",
		
		props: {
			trafficLightsList: {
				type: Array,
				required: true,
			}
		},
		data() {
			return {
				map: null,
				town: { lat: -20.154, lng: 28.585 },
			};
		},
		computed: {
			trafficLightMarker() {
				return '<div class="flex p-1 w-full h-full border border-red-500 rounded-full"><div class="justify-center w-full h-full bg-red-500 rounded-full"></div></div>';
			},
			trafficLights() {
				return this.trafficLightsList.map((trafficLight, index) => {
					const coordinates = [
						{ lat: -20.15078, lng: 28.58455 },
						{ lat: -20.15181, lng: 28.58299 },
						{ lat: -20.15350, lng: 28.58377 },
						{ lat: -20.15408, lng: 28.58624 },
						{ lat: -20.15461, lng: 28.58219 },
						{ lat: -20.15523, lng: 28.58461 },
						{ lat: -20.15694, lng: 28.58539 },
						{ lat: -20.15304, lng: 28.58779 },
					][index];

					return {
						lat: coordinates.lat,
						lng: coordinates.lng,
						label: `<span class='text-lg'>${trafficLight.name}</span><br><span class='text-red-500'>${msg(trafficLight.code)}</span><br><a class='hover:underline'>more</a>`
					}
				})
			}
		},
		mounted() {
			this.initMap();
			this.addTrafficLights();
		},
		methods: {
			initMap() {
				// Initialize the map centered on town's CBD
				this.map = L.map("map", {
					center: [this.town.lat, this.town.lng],
					zoom: 17,
					zoomControl: false, 
					attributionControl: false, 
				})
				// Add CartoDB Positron tiles
				L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",).addTo(this.map);
			},
			addTrafficLights() {
				// Custom traffic light marker
				const trafficLightIcon = L.divIcon({
					className: "custom-icon",
					html: this.trafficLightMarker,
					iconSize: [35, 35],
				});

				this.trafficLights.forEach((light) => {
					L.marker([light.lat, light.lng], { icon: trafficLightIcon })
					.bindPopup(light.label)
					.addTo(this.map);
				});
			},
			zoomIn() {
				if (this.map) {
					this.map.zoomIn();
				}
			},
			zoomOut() {
				if (this.map) {
					this.map.zoomOut();
				}
			},
			goToTown() {
				if (this.map) {
					this.map.setView(this.town, 17);
				}
			},
			// Imported methods
			msg,
		},
		beforeUnmount() {
			if (this.map) {
				this.map.off(); // Remove all event listeners
				this.map.remove(); // Remove the map instance
			}
		},
	};
</script>

<style>
	.map-container {
		width: 100%;
		height: 100%;
		overflow: hidden;
	}

	#map {
		width: 100%;
		height: 100%;
		z-index: 0;
	}

	.custom-icon {
		text-align: center;
		font-size: 0.75rem;
	}

	.map-container .absolute {
		z-index: 1000; /* A high value to ensure the buttons are above everything */
	}
</style>
