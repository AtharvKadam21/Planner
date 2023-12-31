import express from "express";
import bodyparser from "body-parser";
import mongoose from "mongoose";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended: true}));

mongoose.connect('mongodb+srv://admin-atharv:test123@cluster0.amkmybd.mongodb.net/plannerDB')
  .then(() => console.log('Connected!'));

const Schema = mongoose.Schema;

const itemsSchema = new Schema({
    name: String
});

const Item = mongoose.model("Item", itemsSchema);

// const item1 = new Item({
//     name: "First Item"
// });

// const item2 = new Item({
//     name: "Second Item"
// });

// const item3 = new Item({
//     name: "Third Item"
// });

// const defaultItems = [item1, item2, item3];

// Item.insertMany(defaultItems);

app.get("/", (req, res) => {
    let foundItems = [];
    Item.find({})
        .then(foundItems =>{
            res.render("index.ejs", {list1: foundItems});
        })
        .catch(err => {
            console.log(err);
    });
});

app.post("/submit", (req, res) => {
    let foundItems = [];
    const itemName = req.body["task"];
    const item = new Item({
        name: itemName
    });
    item.save();
    res.redirect("/");
});

app.post("/delete", (req, res) => {
    const checkedItem = req.body.checkbox;
    console.log(checkedItem);

    Item.findByIdAndRemove(checkedItem)
    .then(() => {
        res.redirect("/");
    })
    .catch(err => {
        console.log(err);
    })
});

app.listen(port, () => {
    console.log(`Port ${port} active`);
});