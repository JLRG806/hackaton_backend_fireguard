import sqlite3 from 'sqlite3';
import config from '../config/index.js';

// Set verbose to true to see the SQL queries
sqlite3.verbose();
const DB_PATH = config.db.path;

const db = new sqlite3.Database(DB_PATH, (err) => {

    if (err) {
        console.log('Could not connect to database', err)
    } else {
        console.log('Connected to the SQLite database.')
        db.run(`CREATE TABLE IF NOT EXISTS Alert (
                id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                sender_ip TEXT NOT NULL,
                created_at DATETIME NOT NULL,
                latitude TEXT NOT NULL,
                longitude TEXT NOT NULL,
                status INTEGER NOT NULL,
                isConfirmed INTEGER NOT NULL
                );`, (err) => {
            if (err) {
                console.log("Table already exists");
            } else {
                console.log('Table Alert created.');
            }
        });
    }
});

export default db;
