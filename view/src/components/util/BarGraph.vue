<template>
  <div>
    <div class="bar-graph">
      <div class="bar bg-green-500" :style="{ width: bar1Width }">
        <span class="percentage" :class="{ 'fade-in': showPercentages }">{{ bar1Width }}</span>
      </div>
      <div class="bar bg-red-500" :style="{ width: bar2Width }">
        <span class="percentage" :class="{ 'fade-in': showPercentages }">{{ bar2Width }}</span>
      </div>
      <div class="bar bg-gray-500" :style="{ width: bar3Width }">
        <span class="percentage" :class="{ 'fade-in': showPercentages }">{{ bar3Width }}</span>
      </div>
    </div>
    <div class="flex justify-between text-xs font-medium p-3">
      <div class="flex items-center">
        <span class="inline-block w-2 h-2 mr-1 bg-green-500 rounded-full"></span>
        <span>Functional:</span>
        <span class="ml-1">{{ robotsData.functional }}</span>
      </div>
      <div class="flex items-center">
        <span class="inline-block w-2 h-2 mr-1 bg-red-500 rounded-full"></span>
        <span>Faulty:</span>
        <span class="ml-1">{{ robotsData.faulty }}</span>
      </div>
      <div class="flex items-center">
        <span class="inline-block w-2 h-2 mr-1 bg-gray-500 rounded-full"></span>
        <span>Not Responding:</span>
        <span class="ml-1">{{ robotsData.notResponding }}</span>
      </div>
    </div>
  </div>
</template>
  
  <script>
  export default {
    name: "BarGraph",
    props: {
      robotsData: {
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
    mounted() {
      this.animateBar(1, this.targetWidths.functional);
      this.animateBar(2, this.targetWidths.faulty);
      this.animateBar(3, this.targetWidths.notResponding);
  
      // Show percentages after all animations
      setTimeout(() => {
        this.showPercentages = true;
      }, 800); // Delay matches the animation duration
    },
    methods: {
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
            functional: this.robotsData.functional / this.robotsData.total * 100,
            faulty: this.robotsData.faulty / this.robotsData.total * 100,
            notResponding: this.robotsData.notResponding / this.robotsData.total * 100,
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