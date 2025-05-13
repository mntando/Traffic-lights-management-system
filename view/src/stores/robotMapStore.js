import { defineStore } from 'pinia'

export const useRobotMapStore = defineStore('robotMap', {
	state: () => ({
		focusTargetId: null,
	}),
	actions: {
		focusOn(id) {
			this.focusTargetId = id
		},
		clearFocus() {
			this.focusTargetId = null
		}
	}
})

export const useOverlayStore = defineStore('overlay', {
	state: () => ({
		isOpen: false,
		selectedId: null
	}),
	actions: {
		toggle(id) {
			this.selectedId = id
			this.isOpen = !this.isOpen
		}
	}
})
