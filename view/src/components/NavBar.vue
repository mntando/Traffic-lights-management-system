<template>
	<div class="flex flex-col flex-grow items-center">
		<div class="flex items-center w-full px-4 mt-3">
			<span class="ml-2 text-sm font-semibold">TL</span>
		</div>
		<div class="w-full px-2">
			<div class="flex flex-col items-center w-full mt-3 border-t border-gray-300">
				<button class="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-200"
					:class="{ 'bg-gray-200': activeButton === 'overview' }"
					@click="btnClick('overview')">
					<svg class="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
					</svg>
				</button>
				<button class="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-200"
					:class="{ 'bg-gray-200': activeButton === 'search' }"
					@click="btnClick('search')">
					<svg class="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
					</svg>
				</button>
				<button class="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-200"
					:class="{ 'bg-gray-200': activeButton === 'reports' }"
					@click="btnClick('reports')">
					<svg class="w-6 h-5 bi bi-clipboard2" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
						<path d="M3.5 2a.5.5 0 0 0-.5.5v12a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-12a.5.5 0 0 0-.5-.5H12a.5.5 0 0 1 0-1h.5A1.5 1.5 0 0 1 14 2.5v12a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 14.5v-12A1.5 1.5 0 0 1 3.5 1H4a.5.5 0 0 1 0 1z"/>
						<path d="M10 .5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5.5.5 0 0 1-.5.5.5.5 0 0 0-.5.5V2a.5.5 0 0 0 .5.5h5A.5.5 0 0 0 11 2v-.5a.5.5 0 0 0-.5-.5.5.5 0 0 1-.5-.5"/>
						</svg>
				</button>
			</div>
			<div class="flex flex-col items-center w-full mt-2 border-t border-gray-300">
				<button class="relative flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-200"
					:class="{ 'bg-gray-200': activeButton === 'alerts' }"
					@click="btnClick('alerts')">
					<svg class="w-6 h-6 bi bi-exclamation-lg" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
						<path d="M7.005 3.1a1 1 0 1 1 1.99 0l-.388 6.35a.61.61 0 0 1-1.214 0zM7 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0"/>
					</svg>
					<span class="absolute top-0 left-0 w-2 h-2 mt-2 ml-2 bg-red-500 rounded-full"></span>
				</button>
				<button class="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-200"
					:class="{ 'bg-gray-200': activeButton === 'more' }"
					@click="btnClick('more')">
					<svg class="w-6 h-6 bi bi-three-dots" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
						<path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3"/>
					</svg>
				</button>
				<button class="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-200"
					:class="{ 'bg-gray-200': activeButton === 'settings' }"
					@click="btnClick('settings')">
					<svg class="w-6 h-6 stroke-current"  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
					</svg>
				</button>
			</div>
		</div>
		<button class="flex items-center justify-center w-full h-16 mt-auto bg-gray-100 hover:bg-gray-200"
					@click="btnClick('account')">
			<svg class="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
			</svg>
		</button>
	</div>
</template>

<script>
	export default {
		name: 'NavBar',
		props: {
			activeAction: {
				type: String,
				required: true,
			},
		},
		data() {
			return {
				activeButton: this.activeAction,
			};
		},
		methods: {
			btnClick(action) {
				this.activeButton = action;
				this.$emit('action', action);
			},
		},
	};
</script>