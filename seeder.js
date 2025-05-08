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
    { name: 'TL - 001', location: JSON.stringify({ lat: -20.150780000000000, lng: 28.584550000000000 }) },
    { name: 'TL - 002', location: JSON.stringify({ lat: -20.151810000000000, lng: 28.582990000000000 }) },
    { name: 'TL - 003', location: JSON.stringify({ lat: -20.153500000000000, lng: 28.583770000000000 }) },
    { name: 'TL - 004', location: JSON.stringify({ lat: -20.154080000000000, lng: 28.586240000000000 }) },
    { name: 'TL - 005', location: JSON.stringify({ lat: -20.154610000000000, lng: 28.582190000000000 }) },
    { name: 'TL - 006', location: JSON.stringify({ lat: -20.155230000000000, lng: 28.584610000000000 }) },
    { name: 'TL - 007', location: JSON.stringify({ lat: -20.156940000000000, lng: 28.585390000000000 }) },
    { name: 'TL - 008', location: JSON.stringify({ lat: -20.153040000000000, lng: 28.587790000000000 }) },
    { name: 'TL - 009', location: JSON.stringify({ lat: -20.151090661679724, lng: 28.585773931934995 }) },
    { name: 'TL - 010', location: JSON.stringify({ lat: -20.148399248887984, lng: 28.586530787854140 }) },
    { name: 'TL - 011', location: JSON.stringify({ lat: -20.149002129354955, lng: 28.588996303407928 }) },
    { name: 'TL - 012', location: JSON.stringify({ lat: -20.155052336854375, lng: 28.589821964396002 }) },
    { name: 'TL - 013', location: JSON.stringify({ lat: -20.150337070774150, lng: 28.588606407958235 }) },
    { name: 'TL - 014', location: JSON.stringify({ lat: -20.155859731168817, lng: 28.587035358526340 }) },
    { name: 'TL - 015', location: JSON.stringify({ lat: -20.157549863026308, lng: 28.587792214447138 }) },
    { name: 'TL - 016', location: JSON.stringify({ lat: -20.158583310432150, lng: 28.586221165035784 }) },
    { name: 'TL - 017', location: JSON.stringify({ lat: -20.158012762189582, lng: 28.583835922133880 }) },
    { name: 'TL - 018', location: JSON.stringify({ lat: -20.157366856007040, lng: 28.581450679139927 }) },
    { name: 'TL - 019', location: JSON.stringify({ lat: -20.149142083469380, lng: 28.583744181917480 }) },
    { name: 'TL - 020', location: JSON.stringify({ lat: -20.149874148847380, lng: 28.581049316138884 }) },
    { name: 'TL - 021', location: JSON.stringify({ lat: -20.154008100727022, lng: 28.579914032251533 }) },
    { name: 'TL - 022', location: JSON.stringify({ lat: -20.161296800199903, lng: 28.585472814323410 }) },
    { name: 'TL - 023', location: JSON.stringify({ lat: -20.158698347512960, lng: 28.581073991665093 }) },
    { name: 'TL - 024', location: JSON.stringify({ lat: -20.160773084448380, lng: 28.578027002333354 }) },
    { name: 'TL - 025', location: JSON.stringify({ lat: -20.156784730743198, lng: 28.579142801243570 }) },
    { name: 'TL - 026', location: JSON.stringify({ lat: -20.147196150208460, lng: 28.581825010094690 }) },
    { name: 'TL - 027', location: JSON.stringify({ lat: -20.146350070635897, lng: 28.589742890948255 }) },
    { name: 'TL - 028', location: JSON.stringify({ lat: -20.145141377708352, lng: 28.584914914894444 }) },
    { name: 'TL - 029', location: JSON.stringify({ lat: -20.160682440110937, lng: 28.583037368638987 }) },
];

// Insert each traffic light
const insertMany = db.transaction((lights) => {
    for (const light of lights) {
        insert.run(light.name, light.location);
    }
});

insertMany(trafficLights);

console.log('Traffic lights inserted successfully.');
