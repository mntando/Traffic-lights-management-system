<template>
	<div id="title-bar" class="flex items-center justify-between w-full h-9">
		<div class="flex h-full items-center">
			<img src="@/assets/logo.png" id="logo" alt="Logo" class="h-full aspect-square p-2">
			<div class="w-px h-5 bg-gray-300 mr-2"></div>
			<span id="" :class="['inline-block w-2 h-2 mr-1 rounded-full', connection ? 'bg-green-500' : 'bg-red-500']"></span>
			<span id="status" class="text-sm text-gray-700">{{ connection ? 'Connected' : 'Disconnected' }}</span>
		</div>
		<div class="title-bar flex items-center h-full">
			<!-- TitleBar Buttons -->
			<button 
				id="btn-min" 
				class="btn-title-bar flex items-center justify-center h-full px-3 text-gray-800 hover:bg-gray-300"
				@click="minimize">
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1" viewBox="0 0 24 24">
					<line x1="5" y1="12.5" x2="19" y2="12.5" />
				</svg>  
			</button>
			<button 
				id="btn-max" 
				class="btn-title-bar flex items-center justify-center h-full px-3 text-gray-800 hover:bg-gray-300"
				@click="maximize">
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1" viewBox="0 0 24 24">
					<rect x="5" y="5" width="15" height="15" />
				</svg>
			</button>
			<button 
				id="btn-close" 
				class="btn-title-bar flex items-center justify-center h-full px-3 text-gray-800 hover:text-white hover:bg-red-500"
				@click="close">
				<svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 4L20 20M20 4L4 20" />
				</svg>
			</button>
		</div>
	</div>
</template>

<script>
  export default {
    name: 'TitleBar',
    props: {
      connection: Boolean,
    },
		methods: {
			minimize() {
				this.$emit('minimize');
			},
			maximize() {
				this.$emit('maximize');
			},
			close() {
				this.$emit('close');
			},
		},
  };
</script>

<style scoped>

</style>
