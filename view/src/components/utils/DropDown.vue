<template>
	<div ref="dropdown" class="relative inline-block text-left w-full">
		<button @click="toggleDropdown" class="flex items-center justify-between w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200">
			{{ selected }}
			<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
				<path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
			</svg>
		</button>
		<transition name="fade">
			<div v-if="showDropdown" class="absolute right-0 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10">
				<div v-for="option in options" :key="option" @click="selectOption(option)" class="px-4 py-2 text-sm hover:bg-blue-50 hover:text-blue-600 cursor-pointer">
					{{ option }}
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
	export default {
		name: "DropDown",
		props: {
			options: {
				type: Array,
				required: true,
			},
			modelValue: {
				type: String,
				default: "",
			},
		},
		data() {
			return {
				showDropdown: false,
				selected: this.modelValue || "Select an option",
			};
		},
		methods: {
			toggleDropdown() {
				this.showDropdown = !this.showDropdown;
			},
			selectOption(option) {
				this.selected = option;
				this.$emit("update:modelValue", option); // Emit the selected option
				this.showDropdown = false; // Close the dropdown
			},
			handleClickOutside(event) {
				if (!this.$refs.dropdown.contains(event.target)) {
					this.showDropdown = false;
				}
			},
		},
		mounted() {
			document.addEventListener("click", this.handleClickOutside);
		},
		beforeUnmount() {
			document.removeEventListener("click", this.handleClickOutside);
		},
	};
</script>

<style scoped>
	.fade-enter-active, .fade-leave-active {
		transition: opacity 0.2s;
	}
	.fade-enter-from, .fade-leave-to {
		opacity: 0;
	}
</style>
