<template>
    <div class="map-container">
        <div id="map" class="relative w-full h-full">
            <div class="absolute top-4 left-4 flex flex-col space-y-2">
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
                <button @click="clicked" class="bg-white shadow p-2 border border-gray-300 rounded-full transition duration-100 ease-in-out transform hover:scale-110" aria-label="Full Screen">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4h6M4 4v6M20 4h-6M20 4v6M4 20h6M4 20v-6M20 20h-6M20 20v-6" />
                    </svg>
                </button>
                <button @click="goToTown" class="bg-white shadow p-2 border border-gray-300 rounded-full transition duration-100 ease-in-out transform hover:scale-110 text-blue-500" aria-label="Go to Location">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M 12 3	A 9 9 0 1 1 12 21 A 9 9 0 1 1 12 3 M 12 2 L 12 -8 M 12 22 L 12 32 M 2 12 L -8 12 M 22 12 L 32 12 M 12 9	A 3 3 0 1 1 12 15 A 3 3 0 1 1 12 9" fill="none" stroke="currentColor" stroke-width="2"/>
                        <circle cx="12" cy="12" r="3" fill="currentColor" />
                    </svg>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    import L from "leaflet";
    import { message } from "@/utils/utils.js";

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
                markers: [],
            };
        },
        computed: {
            trafficLightMarker() {
                return `<div class="flex p-1 w-full h-full border border-gray-500 rounded-full transition duration-100 ease-in-out transform hover:scale-125">
                        <div class="justify-center w-full h-full bg-gray-500 rounded-full"></div>
                    </div>`;
            },
            trafficLightMarkers() {
                return this.trafficLights.map((trafficLight) => {
                    const location = JSON.parse(trafficLight.location);
                    return {
                        lat: location.lat,
                        lng: location.lng,
                        label: `<span class='text-lg'>${trafficLight.name}</span>
                            <br>
                            <span class="text-${message(trafficLight.code).color}-500">${message(trafficLight.code).msg}</span>
                            <br>
                            <a class='hover:underline'>more</a>`
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
                L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager_no_buildings/{z}/{x}/{y}{r}.png",).addTo(this.map);
            },
            addTrafficLights() {
                // Custom traffic light marker
                const trafficLightIcon = L.divIcon({
                    className: "custom-icon",
                    html: this.trafficLightMarker,
                    iconSize: [35, 35],
                });

                this.trafficLightMarkers.forEach((trafficLight) => {
					const marker = L.marker([trafficLight.lat, trafficLight.lng], { icon: trafficLightIcon })
					.bindPopup(trafficLight.label)
                    .addTo(this.map);
                    this.markers.push(marker);
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
            clicked() {
                console.log("mv");
            },
            // Imported methods
            message,
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
