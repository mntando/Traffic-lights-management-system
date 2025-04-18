<template>
	<div>
		<div class="border border-gray-300 rounded-lg">
			<div class="bar-graph">
				<div class="bar bg-green-500" :style="{ width: bar1Width }">
					<span class="percentage" :class="{ 'fade-in': showPercentages }">{{ targetWidths.functional.toFixed(1) }}</span>
				</div>
				<div class="bar bg-red-500" :style="{ width: bar2Width }">
					<span class="percentage" :class="{ 'fade-in': showPercentages }">{{ targetWidths.faulty.toFixed(1) }}</span>
				</div>
				<div class="bar bg-gray-500" :style="{ width: bar3Width }">
					<span class="percentage" :class="{ 'fade-in': showPercentages }">{{ targetWidths.unresponsive.toFixed(1) }}</span>
				</div>
			</div>
			<div class="flex justify-between text-xs font-medium p-3">
				<div class="flex items-center">
					<span class="inline-block w-3 h-3 mr-1 bg-green-500 rounded-full"></span>
					<span>Functional:</span>
					<span class="ml-1">{{ trafficLightsData.functional }}</span>
				</div>
				<div class="flex items-center">
					<span class="inline-block w-3 h-3 mr-1 bg-red-500 rounded-full"></span>
					<span>Faulty:</span>
					<span class="ml-1">{{ trafficLightsData.faulty }}</span>
				</div>
				<div class="flex items-center">
					<span class="inline-block w-3 h-3 mr-1 bg-gray-500 rounded-full"></span>
					<span>Unresponsive:</span>
					<span class="ml-1">{{ trafficLightsData.unresponsive }}</span>
				</div>
			</div>
		</div>
		<p class="text-xs font-medium mt-2">Total Traffic Lights: {{ trafficLightsData.total }}</p>
	</div>
</template>

<script>
	export default {
		name: "BarGraph",
		props: {
			trafficLightsData: {
					type: Object,
					required: true,
			},
		},
		data() {
			return {
				bar1Width: "0%", // Initial width for bar 1
				bar2Width: "0%", // Initial width for bar 2
				bar3Width: "0%", // Initial width for bar 3
				showPercentages: false, // State to control percentage visibility
			};
		},
		watch: {
			targetWidths: {
				handler() {
					this.animateBars();
				},
				deep: true,
			},
		},
		mounted() {
			this.animateBars();
		},
		methods: {
			animateBars() {
				this.animateBar(1, this.targetWidths.functional);
				this.animateBar(2, this.targetWidths.faulty);
				this.animateBar(3, this.targetWidths.unresponsive);

				// Show percentages after all animations
				setTimeout(() => {
					this.showPercentages = true;
				}, 800); // Delay matches the animation duration
			},
			animateBar(barNumber, targetWidth) {
				let width = 0;
				const interval = setInterval(() => {
					if (width >= targetWidth) {
						clearInterval(interval); // Stop the animation at the target width
					} else {
						width++;
						this[`bar${barNumber}Width`] = `${width}%`; // Update the width of the specific bar
					}
				}, 10); // Adjust speed
			},
		},
		computed: {
			targetWidths() {
				return {
					functional: this.trafficLightsData.functional / this.trafficLightsData.total * 100,
					faulty: this.trafficLightsData.faulty / this.trafficLightsData.total * 100,
					unresponsive: this.trafficLightsData.unresponsive / this.trafficLightsData.total * 100,
				};
			},
		},
	};
</script>
	
<style>
	.bar-graph {
		width: 100%;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		gap: 10px;
		padding: 10px;
	}
	
	.bar {
		height: 55px;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		position: relative;
		border-radius: 5px;
		color: white;
		font-weight: bold;
		padding-right: 5px;
		overflow: hidden;
	}
	
	.percentage {
		opacity: 0; /* Initially hidden */
		transition: opacity 1s ease; /* Smooth fade-in effect */
	}
	
	.percentage.fade-in {
		opacity: 1; /* Fully visible */
	}
</style>
