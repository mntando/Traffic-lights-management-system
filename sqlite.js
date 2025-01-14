const Database = require('better-sqlite3');

// Connect to the database
const db = new Database('test.db');

// Create a test table
db.exec('CREATE TABLE IF NOT EXISTS test (id INTEGER PRIMARY KEY, name TEXT);');

console.log('SQLite is working!');
