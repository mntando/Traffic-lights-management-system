<template>
    <div class="flex flex-col flex-grow">
      <ul>
        <li v-for="(robot, index) in robotsList" :key="index" class="mb-3 p-3 hover:bg-gray-200 rounded-lg transition-all">
        <div class="font-semibold text-lg">{{ robot.name }}</div>
            <div class="text-sm" :class="msg(robot.code).startsWith('Faults:') ? 'text-red-500' : 'text-green-500'">
                {{ msg(robot.code) }}
            </div>
        </li>

      </ul>
    </div>
  </template>  

<script>
    export default {
        name: 'RobotsList',
        props: {
            robotsList: {
                type: Object,
                required: true,
            }
        },
        methods: {
            msg(code) {
                const faults = [];
                let ledFaults = [];

                if (!(code & 0b00001)) { // Bit 1: Operational
                    faults.push('Not operational');
                }

                if (code & 0b10000) { // Bit 5: Response Status
                    faults.push('Not responding');
                }

                if (code & 0b00010) { // Bit 2: Red Light Status
                    ledFaults.push('Red');
                }

                if (code & 0b00100) { // Bit 3: Yellow Light Status
                    ledFaults.push('Yellow');
                }

                if (code & 0b01000) { // Bit 4: Green Light Status
                    ledFaults.push('Green');
                }

                if (ledFaults.length > 0) {
                    faults.push(`${ledFaults.join(', ')} ${ledFaults.length > 1 ? 'LEDs' : 'LED'}`);
                }

                if (faults.length === 0) {
                    return 'Functional';
                } else {
                    return `Faults: ${faults.join(', ')}`;
                }
            }
        }
    }
</script>

<style scoped>

</style>