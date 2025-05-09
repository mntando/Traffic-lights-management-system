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
