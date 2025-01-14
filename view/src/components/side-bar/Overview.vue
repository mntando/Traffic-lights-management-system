<template>
	<div class="flex flex-col h-full p-4 scrollable">
		<h1 class="text-2xl font-semibold">Overview</h1>
			<BarGraph :trafficLightsData="trafficLights.data" class="mt-4" />
		<div class="flex flex-col mt-2 flex-grow">
			<DropDown :options="options" v-model="filter" class="mt-5"/>
			<RobotsList :trafficLightsList="filteredTrafficLights" class="mt-2 flex-grow" />
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
				type: Object,
				required: true,
			},
		},
		data() {
			return {
			filter: "Faulty",
			options: ["All", "Faulty", "Unresponsive", "Functional"],
			};
		},
		computed: {
			filteredTrafficLights() {
				if (this.filter === "All") {
					return this.trafficLights.list;
				}
				return this.trafficLights.list.filter((trafficLight) => {
					switch (this.filter) {
						case "Faulty":
							return (trafficLight.code & 0b00001) === 0 || (trafficLight.code & 0b1110) > 0; // Not operational or has LED faults
						case "Unresponsive":
							return (trafficLight.code & 0b10000) > 0; // Unresponsive
						case "Functional":
							return (trafficLight.code & 0b00001) > 0 && (trafficLight.code & 0b11110) === 0; // Operational and no faults
						default:
							return true;
					}
				});
			},
		},
	};
</script>

<style scoped>
</style>
