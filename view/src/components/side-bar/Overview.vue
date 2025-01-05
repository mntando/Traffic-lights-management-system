<template>
    <div class="flex flex-col h-full p-4 scrollable">
        <h1 class="text-2xl font-semibold">Overview</h1>
        <BarGraph :robotsData="robots.data" class="mt-4 border border-gray-300 rounded-lg" />
        <div class="flex flex-col mt-2 flex-grow">
            <p class="text-xs font-medium">Total Traffic Lights: {{ robots.data.total }}</p>
            <div ref="dropdown" class="relative mt-5 inline-block text-left w-full">
                <button @click="toggleDropdown" class="flex items-center justify-between w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200">
                    {{ filter }}
                    <svg class="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
                <div v-if="showDropdown" class="absolute right-0 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                    <div v-for="option in options" :key="option" @click="setFilter(option)" class="px-4 py-2 text-sm hover:bg-blue-50 hover:text-blue-600 cursor-pointer">
                        {{ option }}
                    </div>
                </div>
            </div>
            <RobotsList :robotsList="robots.list" class="mt-2 flex-grow"/>
        </div>
    </div>
</template>

<script>
    import BarGraph from '../util/BarGraph.vue';
    import RobotsList from '../util/RobotsList.vue';
    
    export default {
        name: 'OverviewPage',
        components: {
            BarGraph,
            RobotsList,
        },
        data() {
            return {
            showDropdown: false,
            filter: "Faulty",
            options: ["All", "Faulty", "Not Responding", "Functional"],
            };
        },
        props: {
            robots: {
                type: Object,
                required: true,
            },
        },
        methods: {
            toggleDropdown() {
                this.showDropdown = !this.showDropdown;
            },
            setFilter(option) {
                this.filter = option;
                this.showDropdown = false; // Close dropdown after selecting
            },
            handleClickOutside(event) {
                // Check if the click occurred outside the dropdown
                if (!this.$refs.dropdown.contains(event.target)) {
                    this.showDropdown = false;
                }
            },
        },
        mounted() {
            // Attach a global click event listener when the component is mounted
            document.addEventListener("click", this.handleClickOutside);
        },
        beforeUnmount() {
            // Remove the event listener when the component is destroyed
            document.removeEventListener("click", this.handleClickOutside);
        },
    };
</script>

<style scoped>

</style>