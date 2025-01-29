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

// Export utility functions
module.exports = {
	getAllTrafficLights() {
		return db.prepare('SELECT * FROM TrafficLights').all();
	},

	getTrafficLight(id) {
		return db.prepare('SELECT * FROM TrafficLights WHERE id = ?').get(id);
	},

	addTrafficLight(name, location) {
		return db.prepare('INSERT INTO TrafficLights (name, location) VALUES (?, ?)').run(name, location);
	},

	deleteTrafficLight(id) {
		return db.prepare('DELETE FROM TrafficLights WHERE id = ?').run(id);
	},

	close() {
		db.close();
	}
};
