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
export function simulateTrafficLightUpdates(callback, interval, number) {
    const commonCodes = [1];
    
    const trafficLights = Array.from({ length: number }, (_, i) => ({ id: (i + 1).toString() }));
    
    const intervalId = setInterval(() => {
        trafficLights.forEach(light => {
            const useCommonCode = Math.random() < 0.8;
            let code = useCommonCode ? commonCodes[Math.floor(Math.random() * commonCodes.length)] : Math.floor(Math.random() * 32);
            if (code & 0b10000) {
                code = 0b10001;
            }

            callback({ id: light.id, code });
        });
    }, interval);
    
    return () => clearInterval(intervalId);
}


// Listen for traffic light updates via Electron preload
export function listenTrafficLightUpdates(callback) {
	if (!window.trafficAPI) {
		console.error('trafficAPI not available');
		return () => {};
	}

	window.trafficAPI.start();

	// CAPTURE unsubscribe
	const unsubscribe = window.trafficAPI.onUpdate(callback);

	// Cleanup
	return () => {
		unsubscribe();
		window.trafficAPI.stop();
	};
}
