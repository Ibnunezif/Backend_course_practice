import express from "express";
import bodyParser from "body-parser";
import pg from "pg";


const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


const db= new pg.Client({
  user:"postgres",
  password:"12345678",
  host:"localhost",
  database:"permalist",
  port:5432
})

db.connect();

async function getItems(){
const result=await db.query("select * from items order by id ASC;");
return result.rows;
}

app.get("/", async (req, res) => {
const items=await getItems();
  res.render("index.ejs", {
    listTitle: "Today",
    listItems: items,
  });
});

async function  addItems (task){
await db.query("insert into items (title) values ($1);",[task]);
}

app.post("/add", (req, res) => {
  const item = req.body.newItem;
  addItems(item);
  res.redirect("/");
});

app.post("/edit", (req, res) => {
  const updatedItemTitle=req.body.updatedItemTitle;
  const updatedItemID=req.body.updatedItemId;
  db.query ("update items set title=$1 where id=$2;",[updatedItemTitle,updatedItemID]);
  res.redirect("/");
});

app.post("/delete", (req, res) => {
  const itemToDelete=req.body.deleteItemId;
  db.query("delete from items where id=$1",[itemToDelete]);
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
