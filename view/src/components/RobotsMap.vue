<template>
	<div class="map-container">
		<div id="map" class="relative w-full h-full">
			<div class="absolute top-4 left-4 flex flex-col space-y-3">
				<button @click="zoomIn" class="bg-white shadow p-2 border border-gray-300 rounded-full transition duration-100 ease-in-out transform hover:scale-110" aria-label="Zoom In">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
					</svg>
				</button>
				<button @click="zoomOut" class="bg-white shadow p-2 border border-gray-300 rounded-full transition duration-100 ease-in-out transform hover:scale-110" aria-label="Zoom Out">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
					</svg>
				</button>
				<button @click="toggleFullScreen" class="bg-white shadow p-2 border border-gray-300 rounded-full transition duration-100 ease-in-out transform hover:scale-110" aria-label="Full Screen">
					<svg v-if="!isFullScreen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4h6M4 4v6M20 4h-6M20 4v6M4 20h6M4 20v-6M20 20h-6M20 20v-6" />
					</svg>
					<svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" class="h-6 w-6" viewBox="0 0 24 24">
						<g fill="currentColor">
							<path d="m3 9.25c0-.41421.33579-.75.75-.75h4.75v-4.75c0-.41421.33579-.75.75-.75s.75.33579.75.75v5.25c0 .55229-.44772 1-1 1h-5.25c-.41421 0-.75-.33579-.75-.75z"/>
							<path d="m20.25 8.5c.4142 0 .75.33579.75.75s-.3358.75-.75.75h-5.25c-.5523 0-1-.44771-1-1v-5.25c0-.41421.3358-.75.75-.75s.75.33579.75.75v4.75z"/>
							<path d="m20.25 15.5c.4142 0 .75-.3358.75-.75s-.3358-.75-.75-.75h-5.25c-.5523 0-1 .4477-1 1v5.25c0 .4142.3358.75.75.75s.75-.3358.75-.75v-4.75z"/>
							<path d="m3.75 15.5c-.41421 0-.75-.3358-.75-.75s.33579-.75.75-.75h5.25c.55228 0 1 .4477 1 1v5.25c0 .4142-.33579.75-.75.75s-.75-.3358-.75-.75v-4.75z"/>
						</g>
					</svg>
				</button>
				<button @click="goToTown" class="bg-white shadow p-2 border border-gray-300 rounded-full transition duration-100 ease-in-out transform hover:scale-110 text-blue-500" aria-label="Go to Location">
					<svg v-if="onTown" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
						<path d="M 12 3	A 9 9 0 1 1 12 21 A 9 9 0 1 1 12 3 M 12 2 L 12 -8 M 12 22 L 12 32 M 2 12 L -8 12 M 22 12 L 32 12 M 12 9	A 3 3 0 1 1 12 15 A 3 3 0 1 1 12 9" fill="none" stroke="currentColor" stroke-width="2"/>
						<circle cx="12" cy="12" r="3" fill="currentColor" />
					</svg>
					<svg v-else xmlns="http://www.w3.org/2000/svg" class="text-gray-600" viewBox="0 0 48 48">
						<path d="m0 0h48v48h-48z" fill="none"/>
						<path fill="currentColor" d="m44 22h-4.1a16.1 16.1 0 0 0 -13.9-13.9v-4.1a2 2 0 0 0 -4 0v4a16.1 16.1 0 0 0 -13.9 14h-4.1a2 2 0 0 0 0 4h4.1a16.1 16.1 0 0 0 13.9 13.9v4a2 2 0 0 0 4 0v-3.9a16.1 16.1 0 0 0 13.9-14h4.1a2 2 0 0 0 0-4zm-20 14a12 12 0 1 1 12-12 12 12 0 0 1 -12 12z"/>
					</svg>
				</button>
			</div>
		</div>
	</div>
</template>

<script>
	import L from "leaflet";
	import { message } from "@/utils/utils.js";

	import { useOverlayStore } from '@/stores/robotMapStore'; 
	import { useRobotMapStore } from "@/stores/robotMapStore";

	export default {
		name: "RobotsMap",
		props: {
			trafficLights: {
				type: Array,
				required: true,
			}
		},
		data() {
			return {
				map: null,
				town: { lat: -20.154, lng: 28.585 },
				markers: {}, // key: id or name, value: marker

				onTown: true,
				isFullScreen: false,
			};
		},
		watch: {
			trafficLights: {
				deep: true,
				handler() {
					this.updateTrafficLights();
				},
			},
		},
		mounted() {
			this.initMap();
			this.addTrafficLights();

			// Set up event listeners for map interactions
			// Fullscreen change event
			document.addEventListener('fullscreenchange', () => {
				if (this.map) {
					this.map.invalidateSize();
				}
			});

			// Focus on a specific marker when focusTargetId changes
			this.mapStore = useRobotMapStore();
			this.unsub = this.mapStore.$subscribe((mutation, state) => {
				if (mutation.storeId === 'robotMap' && mutation.events.key === 'focusTargetId') {
					const id = state.focusTargetId;
					if (id) {
						this.focusOn(id);
						this.mapStore.clearFocus();
					}
				}
			});

			// Map click event
			this.map.on('moveend', () => {
				const center = this.map.getCenter();
				const zoom = this.map.getZoom();
				const townLatLng = L.latLng(this.town.lat, this.town.lng);

				this.onTown = zoom === 16 && center.distanceTo(townLatLng) < 10; // 10 meters threshold
				this.onTown = center.distanceTo(townLatLng) < 10; // Set threshold )
			});
		},
		methods: {
			initMap() {
				this.map = L.map("map", {
					center: [this.town.lat, this.town.lng],
					zoom: 16,
					zoomControl: false,
					attributionControl: false,
				});
				L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager_no_buildings/{z}/{x}/{y}{r}.png").addTo(this.map);
			},
			getTrafficLightMarkerHtml(id, color) {
				return `<div class="flex w-full h-full border-2 border-white rounded-full transition duration-100 ease-in-out transform hover:scale-125">
							<div class="flex items-center justify-center text-white w-full h-full bg-${color}-500 rounded-full">${id}</div>
						</div>`;
			},
			addTrafficLights() {
				const attachPopupEventListener = (id) => {
					const a = document.querySelector(`.overlay-more[data-id='${id}']`);
					if (a) {
						a.addEventListener('click', (e) => {
							e.preventDefault();
							this.toggleOverlay(id); // works correctly
						});
					}
				}

				this.trafficLights.forEach((light) => {
					const id = light.id || light.name;
					const location = JSON.parse(light.location);
					const color = message(light.code).color;
					const html = this.getTrafficLightMarkerHtml(id, color);
					const label = `<span class='text-lg'>${light.name}</span><br>
						<span class='text-${color}-500'>${message(light.code).msg}</span><br>
						<a href="#" class='overlay-more hover:underline cursor-pointer' data-id='${light.id}'>more</a>`;

					const existing = this.markers[id];

					if (existing) {
						// Update location
						const current = existing.getLatLng();
						if (current.lat !== location.lat || current.lng !== location.lng) {
							existing.setLatLng([location.lat, location.lng]);
						}
						// Update popup content
						if (existing.getPopup().getContent() !== label) {
							existing.setPopupContent(label);

							// Re-attach the event listener to the existing marker
							if (existing.isPopupOpen()) {
								attachPopupEventListener(light.id);
							}
						}
						// Update icon
						const newIcon = L.divIcon({
							className: "custom-icon",
							html,
							iconSize: [30, 30],
						});
						existing.setIcon(newIcon);
						// Add event listener to the existing marker
						existing.off('popupopen').on('popupopen', () => {
							attachPopupEventListener(light.id);
						});

					} else {
						// New marker
						const marker = L.marker([location.lat, location.lng], {
							icon: L.divIcon({
								className: "custom-icon",
								html,
								iconSize: [30, 30],
							}),
						}).bindPopup(label).addTo(this.map);
						this.markers[id] = marker;

						// Add listener for new marker
						marker.on('popupopen', () => {
							attachPopupEventListener(light.id);
						});
					}
				});
			},
			updateTrafficLights() {
				if (!this.map) return;
				this.addTrafficLights(); // Re-add traffic lights to update their positions and colors
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
			toggleFullScreen() {
				if (this.map) {
					if (!document.fullscreenElement) {
						this.map.getContainer().requestFullscreen();
						setTimeout(() => {
							this.isFullScreen = true;
						}, 100);
					} else {
						document.exitFullscreen();
						setTimeout(() => {
							this.isFullScreen = false;
						}, 100);
					}
				}
			},
			goToTown() {
				if (this.map) {
					this.map.flyTo(this.town, 16);
					this.onTown = true;
				}
			},
			focusOn(id) {
				const marker = this.markers[id];
				if (marker) {
					this.map.flyTo(marker.getLatLng(), 17);
					this.map.once('moveend', () => {
						marker.openPopup();
					});
				}
			},
			toggleOverlay(id) {
                const overlay = useOverlayStore()
                overlay.toggle(id)
            },
			message,
		},
		beforeUnmount() {
			if (this.map) {
				this.map.off();
				this.map.remove();
			}

			// Remove event listeners
			this.unsub(); 
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
		z-index: 500;
	}
</style>
