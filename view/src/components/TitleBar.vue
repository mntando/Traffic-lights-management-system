<template>
	<div id="title-bar" class="flex w-full h-10 items-center justify-between">
		<div class="title-bar flex h-full items-center">
			<img src="@/assets/logo.png" id="logo" alt="Logo" class="h-full aspect-square p-2">
			<div class="w-px h-5 bg-gray-300 mr-2"></div>
			<button class="px-1 rounded-lg">
				<span class="text-sm text-gray-700">{{ connection ? 'Connected' : 'Disconnected' }}</span>
			</button>
		</div>
		<div class="title-bar flex items-center h-full">
			<button 
				@click="minimize"
				class="btn-title-bar flex items-center justify-center h-full px-3.5 text-gray-800 hover:bg-gray-300">
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1" viewBox="0 0 24 24">
					<line x1="5" y1="12.5" x2="19" y2="12.5" />
				</svg>  
			</button>
			<button 
				@click="maximize"
				class="btn-title-bar flex items-center justify-center h-full px-3.5 text-gray-800 hover:bg-gray-300">
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1" viewBox="0 0 24 24">
					<rect x="5" y="5" width="15" height="15" />
				</svg>
			</button>
			<button 
				@click="close"
				class="btn-title-bar flex items-center justify-center h-full px-3.5 text-gray-800 hover:text-white hover:bg-red-600">
				<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
