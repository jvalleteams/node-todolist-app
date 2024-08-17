const express = require("express");
const Datastore = require("nedb");
const bodyParser = require("body-parser");
const app = express();
const db = new Datastore({ filename: "./todos-nedb.db", autoload: true });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public")); // publicディレクトリに静的ファイルを置く

// TODOを追加
app.post("/todos", (req, res) => {
  const task = { task: req.body.task, completed: false };
  db.insert(task, (err, newDoc) => {
    if (err) {
      console.error(err);
      res.send("Error");
      return;
    }
    res.send(newDoc);
  });
});

// TODOを取得
app.get("/todos", (req, res) => {
  db.find({}, (err, docs) => {
    if (err) {
      console.error(err);
      res.send("Error");
      return;
    }
    res.send(docs);
  });
});

// サーバー起動
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
