import express from "express";
import bodyparser from "body-parser";

const app = express();
const port = 3000;

var entryCheck = 0;

app.use(bodyparser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.post("/submit", (req, res) => {
    entryCheck = 1;
    let taskEntry = req.body["task"];
    taskList.push(taskEntry);
    res.render("index.ejs", {list: taskList, flag: entryCheck});
})

app.listen(port, () => {
    console.log(`Port ${port} active`);
});

var taskList = [];