const sqlite3 = require('sqlite3').verbose();
const dbLocation = process.env.APPDATA;
const db = new sqlite3.Database(dbLocation + '/BiZeeBird/bizeebird.db');

module.exports = db;
