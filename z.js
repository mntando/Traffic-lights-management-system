function generateTrafficLightUpdates(callback, interval = 1000) {
    // Common traffic light states (will appear more frequently)
    const commonCodes = [0, 1, 2, 3, 6, 7, 8, 9, 11, 12, 13, 17];
    
    // Track IDs and their current codes
    const trafficLights = [
        { id: 'TL-001' },
        { id: 'TL-002' },
        { id: 'TL-003' },
        { id: 'TL-004' }
    ];
    
    const intervalId = setInterval(() => {
      // Generate updates for all traffic lights
        trafficLights.forEach(light => {
            // Determine if we should use a common code (70% chance) or random 0-31
            const useCommonCode = Math.random() < 0.7;
            light.code = useCommonCode 
            ? commonCodes[Math.floor(Math.random() * commonCodes.length)]
            : Math.floor(Math.random() * 32);
            
            // Create the JSON output
            const update = {
            id: light.id,
            code: light.code
            };
            
            callback(update);
        });

    }, interval);
    
    // Return function to stop the simulation
    return () => clearInterval(intervalId);
}

// Start receiving simulated updates
const stopUpdates = generateTrafficLightUpdates((update) => {
    console.log(JSON.stringify(update));
});

stopUpdates();
