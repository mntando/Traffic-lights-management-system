const Database = require('better-sqlite3');

// Initialize database
const db = new Database('traffic-lights.db');

// Ensure table exists
db.prepare(`
    CREATE TABLE IF NOT EXISTS TrafficLights (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        location TEXT NOT NULL
    )
`).run();

// Add traffic lights
const insert = db.prepare(`INSERT INTO TrafficLights (name, location) VALUES (?, ?)`);

// Existing traffic lights
const trafficLights = [
    { name: 'TL - 001', location: JSON.stringify({ lat: -20.15078, lng: 28.58455 }) },
    { name: 'TL - 002', location: JSON.stringify({ lat: -20.15181, lng: 28.58299 }) },
    { name: 'TL - 003', location: JSON.stringify({ lat: -20.15350, lng: 28.58377 }) },
    { name: 'TL - 004', location: JSON.stringify({ lat: -20.15408, lng: 28.58624 }) },
    { name: 'TL - 005', location: JSON.stringify({ lat: -20.15461, lng: 28.58219 }) },
    { name: 'TL - 006', location: JSON.stringify({ lat: -20.15523, lng: 28.58461 }) },
    { name: 'TL - 007', location: JSON.stringify({ lat: -20.15694, lng: 28.58539 }) },
    { name: 'TL - 008', location: JSON.stringify({ lat: -20.15304, lng: 28.58779 }) },
    { name: 'TL - 009', location: JSON.stringify({ lat: -20.151090661679724, lng: 28.585773931934995 }) },
    { name: 'TL - 010', location: JSON.stringify({ lat: -20.148399248887984, lng: 28.58653078785414 }) },
    { name: 'TL - 011', location: JSON.stringify({ lat: -20.149002129354955, lng: 28.588996303407928 }) },
    { name: 'TL - 012', location: JSON.stringify({ lat: -20.155052336854375, lng: 28.589821964396002 }) },
    { name: 'TL - 013', location: JSON.stringify({ lat: -20.15033707077415, lng: 28.588606407958235 }) },
    { name: 'TL - 014', location: JSON.stringify({ lat: -20.155859731168817, lng: 28.58703535852634 }) },
    { name: 'TL - 015', location: JSON.stringify({ lat: -20.157549863026308, lng: 28.587792214447138 }) },
    { name: 'TL - 016', location: JSON.stringify({ lat: -20.15858331043215, lng: 28.586221165035784 }) },
    { name: 'TL - 017', location: JSON.stringify({ lat: -20.158012762189582, lng: 28.58383592213388 }) },
    { name: 'TL - 018', location: JSON.stringify({ lat: -20.15736685600704, lng: 28.581450679139927 }) },
    { name: 'TL - 019', location: JSON.stringify({ lat: -20.14914208346938, lng: 28.58374418191748 }) },
    { name: 'TL - 020', location: JSON.stringify({ lat: -20.14987414884738, lng: 28.581049316138884 }) },
    { name: 'TL - 021', location: JSON.stringify({ lat: -20.154008100727022, lng: 28.579914032251533 }) },
];

// Insert each traffic light
const insertMany = db.transaction((lights) => {
    for (const light of lights) {
        insert.run(light.name, light.location);
    }
});

insertMany(trafficLights);

console.log('Traffic lights inserted successfully.');
