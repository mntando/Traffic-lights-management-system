<template>
    <div @click.self="closeOverlay" class="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
        <div class="bg-white text-gray-800 p-8 rounded-2xl shadow-2xl w-[600px] max-w-full relative">
            <button @click="closeOverlay" class="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
            <div class="text-xl font-semibold mb-4">Overlay Title</div>
            <div class="text-sm text-gray-500 mb-4">
                This is an overlay for traffic light ID: {{ trafficLightId }}
            </div>
        </div>
    </div>
</template>

<script>
    import { useOverlayStore } from '@/stores/robotMapStore'

    export default {
        name: 'RobotOverlay',
        props: {
            trafficLightId: {
                required: true
            }
        },
        methods: {
            closeOverlay() {
                const store = useOverlayStore()
                store.toggle()
            }
        }
    }
</script>
