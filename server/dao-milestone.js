"use strict";

const dayjs = require("dayjs");
/* Data Access Object (DAO) module for accessing pages data */

const sqlite = require("sqlite3");
const db = new sqlite.Database("quitquill.db", (err) => {
  if (err) throw err;
});

exports.listMilestone = () => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM Milestones ORDER BY ID ASC;";
    db.all(sql, (err, rows) => {
      if (err) {
        reject(err);
      }

      resolve(rows);
    });
  });
};