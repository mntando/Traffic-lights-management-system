<template>
		<div class="flex flex-col relative">
				<HelloWorld msg="Welcome to the vue electron app by MV" class=""/>
				<InfoBar class="absolute bottom-0 w-full bg-gray-200 bg-opacity-25"/>
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