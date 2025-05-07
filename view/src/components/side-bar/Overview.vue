<template>
	<div class="flex flex-col h-full p-4 scrollable">
		<h1 class="text-2xl font-semibold">Overview</h1>
			<BarGraph :trafficLightsData="trafficLightsData" class="mt-4" />
		<div class="flex flex-col mt-2 flex-grow">
			<DropDown :options="options" v-model="filter" class="mt-5"/>
			<RobotsList :trafficLights="filteredTrafficLights" class="mt-2 flex-grow" />
		</div>
</div>
</template>

<script>
	import BarGraph from "../utils/BarGraph.vue";
	import RobotsList from "../utils/RobotsList.vue";
	import DropDown from "../utils/DropDown.vue"

	export default {
		name: "OverviewPage",
		components: {
			BarGraph,
			RobotsList,
			DropDown,
		},
		props: {
			trafficLights: {
				type: Array,
				required: true,
			},
		},
		data() {
			// TODO: Fetch the traffic lights data from the database
			return {
				filter: "Faulty",
				options: ["All", "Faulty", "Unresponsive", "Functional"],
			};
		},
		computed: {
			filteredTrafficLights() {
				if (this.filter === "All") {
					return this.trafficLights;
				}
				return this.trafficLights.filter((trafficLight) => {
					switch (this.filter) {
						case "Faulty":
							return (trafficLight.code & 0b00001) === 0 || (trafficLight.code & 0b1110) > 0 || (trafficLight.code & 0b10000) > 0; // Not operational or has LED faults or unresponsive
						case "Unresponsive":
							return (trafficLight.code & 0b10000) > 0; // Unresponsive
						case "Functional":
							return (trafficLight.code & 0b00001) > 0 && (trafficLight.code & 0b11110) === 0; // Operational and no faults
						default:
							return true;
					}
				});
			},
			trafficLightsData() {
				let functional = 0;
				let faulty = 0;
				let unresponsive = 0;
				let total = this.trafficLights.length || 1; // Prevent zero

				this.trafficLights.forEach(tl => {
					const code = tl.code ?? 0;

					const isOperational = code & 0b00001;
					const isUnresponsive = (code & 0b10000) > 0;
					const hasLEDFault = (code & 0b00010) > 0 || (code & 0b00100) > 0 || (code & 0b01000) > 0;

					if (!isOperational) {
						faulty++;
					} else if (isUnresponsive) {
						unresponsive++;
					} else if (hasLEDFault) {
						faulty++;
					} else {
						functional++;
					}
				});

				return {
				total,
				functional,
				faulty,
				unresponsive,
				};
			}
		},
	};
</script>

<style scoped>
</style>
