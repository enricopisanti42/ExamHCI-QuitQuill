"use strict";

/* Data Access Object (DAO) module for accessing pages data */

const sqlite = require("sqlite3");
const db = new sqlite.Database("quitquill.db", (err) => {
  if (err) throw err;
});

exports.listMessages = () => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM Chat ORDER BY ID ASC;";
    db.all(sql, (err, rows) => {
      if (err) {
        reject(err);
      }

      resolve(rows);
    });
  });
};

exports.createMessage = (message) => {
  console.log(message);
  return new Promise((resolve, reject) => {
    const sql = "INSERT INTO Chat(Text,sender) VALUES(?,?)";
    db.run(sql, [message.text, message.sender], function (err) {
      if (err) {
        reject(err);
      }
      console.log("eseguito");
      resolve();
    });
  }).catch(() => "ERRORE!!");
};
