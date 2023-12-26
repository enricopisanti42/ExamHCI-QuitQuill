'use strict';

/* Data Access Object (DAO) module for accessing pages data */

const sqlite = require('sqlite3');
const db = new sqlite.Database('quitquill.db', (err) => {
  if (err) throw err;

});

const dayjs = require("dayjs");

// MMMM D, YYYY h:mm A	August 16, 2018 8:02 PM

exports.getTime = () => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM Time;'
      db.all(sql,(err, rows) => {
        if (err) { reject(err); }
        resolve(rows);
      });
    });
};