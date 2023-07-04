const sqlite3 = require("sqlite3");
const path = require("path");

const dbPath = path.resolve(process.cwd(), "services", "database.sqlite");

const db = new sqlite3.Database(dbPath);

const run = (query, params = []) => {
  return new Promise((resolve, reject) => {
    db.run(query, params, function (error) {
      if (error) {
        return reject(error);
      }

      return resolve({
        status: true,
        lastID: this.lastID,
        changes: this.changes,
      });
    });
  });
};

const get = (query, params = []) => {
  return new Promise((resolve, reject) => {
    db.all(query, params, (err, rows) => {
      if (err) {
        console.log(err);
        return reject(err);
      }
      resolve(rows);
    });
  });
};

const initDB = async () => {
  try {
    await db.run(
      "CREATE TABLE IF NOT EXiSTS todos (id INTEGER PRIMARY KEY,title Text, description TEXT, isDone INTEGER DEFAULT 0, creation_date INTEGER, modified_date INTEGER)"
    );

    console.log("Tablas cargadas");
  } catch (error) {
    throw new Error(error);
  }
};

// db.serialize(() => {
//   db.run("CREATE TABLE users (id INT,name TEXT,age INT)");
//   db.run('INSERT INTO users VALUES  (1, "Yishar",28)');
//   db.run("SELECT * FROM users", (error) => {
//     if (error) {
//       console.log(error);
//     }
//   });
// });

// db.close();

module.exports = {
  get,
  run,
  initDB,
};
