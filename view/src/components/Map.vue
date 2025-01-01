<template>
    <div class="flex flex-col w-full h-full relative">
        <HelloWorld msg="Welcome to the vue electron app by MV" class="flex-grow bg-red-100"/>
        <InfoBar class="absolute bottom-0 w-full bg-gray-300 bg-opacity-25"/>
    </div>
</template>

<script>
import HelloWorld from './HelloWorld.vue';
import InfoBar from './InfoBar.vue';

export default {
    name: 'MapDiv',
    components: {
        HelloWorld,
        InfoBar
    }
}
</script>

<style scoped>

</style>