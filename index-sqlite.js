const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./todos-sqlite.db");

// テーブルの作成
db.run(
  "CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY, task TEXT, completed BOOLEAN)"
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public")); // publicディレクトリに静的ファイルを置く

// TODOを追加
app.post("/todos", (req, res) => {
  const { task } = req.body;
  db.run(
    "INSERT INTO todos (task, completed) VALUES (?, ?)",
    [task, false],
    function (err) {
      if (err) {
        return console.log(err.message);
      }
      res.send({ id: this.lastID });
    }
  );
});

// TODOを取得
app.get("/todos", (req, res) => {
  db.all("SELECT * FROM todos", [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.send(rows);
  });
});

// サーバー起動
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
