// Status code
export function message(code) {
    const faults = [];
    let ledFaults = [];
    let color = 'red';

    if (!(code & 0b00001)) { faults.push('Not operational'); }
    if (code & 0b10000) { faults.push('Unresponsive'); }
    if (code & 0b00010) { ledFaults.push('Red'); }
    if (code & 0b00100) { ledFaults.push('Yellow'); }
    if (code & 0b01000) { ledFaults.push('Green'); }

    if (ledFaults.length > 0) {
        faults.push(`${ledFaults.join(', ')} ${ledFaults.length > 1 ? 'LEDs' : 'LED'}`);
    }

    let msg = faults.length === 0 ? 'Functional' : `Faults: ${faults.join(', ')}`;
    if (msg === 'Functional') {
        color = 'green';
    } else if (faults.includes('Unresponsive')) {
        color = 'gray';
    }

    return { msg, color };
}

// Function to generate random traffic light updates
export function getTrafficLightUpdates(callback, interval = 30000) { // Put 30 seconds
    // Common traffic light states (will appear more frequently)
    const commonCodes = [1];
    
    // Track IDs and their current codes
    const trafficLights = Array.from({ length: 21 }, (_, i) => ({ id: (i + 1).toString() }));
    
    const intervalId = setInterval(() => {
        // Generate updates for all traffic lights
        trafficLights.forEach(light => {
            // Determine if we should use a common code (80% chance) or random 0-31
            const useCommonCode = Math.random() < 0.8;
            let code = useCommonCode 
                ? commonCodes[Math.floor(Math.random() * commonCodes.length)]
                : Math.floor(Math.random() * 32);

            // If the code includes 'Unresponsive' (bit 4), strip all other bits
            if (code & 0b10000) {
                code = 0b10001;
            }

            // Create the JSON output
            const update = {
                id: light.id,
                code: code
            };

            callback(update);
        });

    }, interval);
    
    // Return function to stop the simulation
    return () => clearInterval(intervalId);
}
