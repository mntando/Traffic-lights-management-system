<template>
	<div class="map-container">
		<div id="map" class="w-full h-full"></div>
	</div>
</template>

<script>
	import L from "leaflet";

	export default {
		name: "RobotsMap",
		props: {
			robotsList: {
				type: Array,
				required: true,
			}
		},
		data() {
			return {
				map: null,
			};
		},
		mounted() {
			this.initMap();
			this.addTrafficLights();
		},
		methods: {
			initMap() {
				// Initialize the map centered on town's CBD
				this.map = L.map("map", { attributionControl: false, }).setView([-20.154, 28.585], 17);

				// Add CartoDB Positron tiles
				L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",).addTo(this.map);
			},
			addTrafficLights() {
				// Custom traffic light marker
				const trafficIcon = L.divIcon({
					className: "custom-icon",
					html: this.robotMarker,
					iconSize: [26, 26],
				});

				// Add multiple traffic light markers
				const trafficLights = [
					{ lat: -20.15078, lng: 28.58455, label: "<span class='text-lg'>Traffic Light 1</span><br><span class='text-red-500'>Faults: Not operational</span><br><a class='hover:underline'>more</a>" },
					{ lat: -20.15181, lng: 28.58299, label: "Traffic Light 2" },
					{ lat: -20.15350, lng: 28.58377, label: "Traffic Light 3" },
					{ lat: -20.15408, lng: 28.58624, label: "Traffic Light 4" },
					{ lat: -20.15461, lng: 28.58219, label: "Traffic Light 5" },
					{ lat: -20.15523, lng: 28.58461, label: "Traffic Light 6" },
					{ lat: -20.15694, lng: 28.58539, label: "Traffic Light 7" },
					{ lat: -20.15304, lng: 28.58779, label: "Traffic Light 8" },
					// { lat: -20.15379, lng: 28.58500, label: "" },
				];

				trafficLights.forEach((light) => {
					L.marker([light.lat, light.lng], { icon: trafficIcon })
					.bindPopup(light.label)
					.addTo(this.map);
				});
			},
		},
		computed: {
			robotMarker() {
				return '<div class="flex p-1 w-full h-full border border-gray-500 rounded-full"><div class="justify-center w-full h-full bg-gray-500 rounded-full"></div></div>';
			}
		}
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
	}
	.custom-icon {
		text-align: center;
		font-size: 0.75rem;
	}
</style>
