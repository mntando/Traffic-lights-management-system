<template>
    <div class="py-1 px-2 text-left text-xs">
        <p>{{ message }}</p>
    </div>
</template>

<script>
export default {
    name: 'InfoBar',
    data() {
        return {
            message: 'Traffic Lights Status'
        };
    }
};
</script>

<style scoped>

</style>