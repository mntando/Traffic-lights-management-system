const Database = require('better-sqlite3');

// Connect to the database (it will create the file if it doesn't exist)
const db = new Database('traffic-lights.db');

// Create the TrafficLights table if it doesn't exist
db.prepare(`
	CREATE TABLE IF NOT EXISTS TrafficLights (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		name TEXT NOT NULL,
		location TEXT NOT NULL
	)
`).run();

// Insert dummy data
const stmt = db.prepare("INSERT INTO TrafficLights (name, location) VALUES (?, ?)");
const trafficLightsData = [
	{ name: 'Traffic Light 1', location: '{"lat": -20.15078, "lng": 28.58455}' },
	{ name: 'Traffic Light 2', location: '{"lat": -20.15181, "lng": 28.58299}' },
	{ name: 'Traffic Light 3', location: '{"lat": -20.15350, "lng": 28.58377}' },
	{ name: 'Traffic Light 4', location: '{"lat": -20.15408, "lng": 28.58624}' },
	{ name: 'Traffic Light 5', location: '{"lat": -20.15461, "lng": 28.58219}' },
	{ name: 'Traffic Light 6', location: '{"lat": -20.15523, "lng": 28.58461}' },
	{ name: 'Traffic Light 7', location: '{"lat": -20.15694, "lng": 28.58539}' },
	{ name: 'Traffic Light 8', location: '{"lat": -20.15304, "lng": 28.58779}' },
];

// Prepare and insert each data entry
trafficLightsData.forEach(light => {
	stmt.run(light.name, light.location);
});

console.log('TrafficLights table created and data inserted successfully!');

// Close the database connection
db.close();
