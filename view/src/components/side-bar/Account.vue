<template>
    <div class="flex flex-col h-full p-4 scrollable">
        <h1 class="text-2xl font-semibold">Traffic Lights</h1>
        <ul>
            <li v-for="light in trafficLights" :key="light.id">{{ light.name }} - {{ light.location }}</li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'AccountPage',
    data() {
        return {
            trafficLights: []
        };
    },
    methods: {
        async fetchTrafficLights() {
            this.trafficLights = await window.dbAPI.getAll();
        }
    },
    mounted() {
        this.fetchTrafficLights();
    }
};
</script>