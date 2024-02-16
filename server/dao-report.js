"use strict";

const dayjs = require("dayjs");
/* Data Access Object (DAO) module for accessing pages data */

const sqlite = require("sqlite3");
const db = new sqlite.Database("quitquill.db", (err) => {
  if (err) throw err;
});

exports.listReports = () => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM Reports ORDER BY ID ASC;";
    db.all(sql, (err, rows) => {
      if (err) {
        reject(err);
      }

      resolve(rows);
    });
  });
};

exports.createReport = (report) => {
  return new Promise((resolve, reject) => {
    const today = dayjs().format("MMMM D, YYYY h:mm A");

    const sql =
      "INSERT INTO Reports(Mood, Smoked, Feelings, Time) VALUES(?,?,?,?)";
    db.run(
      sql,
      [report.mood, report.smoked, report.feelings, today],
      function (err) {
        if (err) {
          reject(err);
        }

        resolve();
      }
    );
  }).catch(() => "ERRORE!!");
};

exports.updateReport = async (id, report) => {
  return new Promise(async (resolve, reject) => {
    const sql = "UPDATE Reports SET Mood=?, Smoked=?, Feelings=? WHERE id=?";

    db.run(
      sql,
      [report.mood, report.smoked, report.feelings, id],
      function (err) {
        if (err) {
          reject(err);
        }
        if (this.changes !== 1) {
          reject({ error: "No report was updated." });
        } else {
          resolve({message : "ok"});
        }
      }
    );
  });
};
