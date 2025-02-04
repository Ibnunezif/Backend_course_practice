import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 5000;
var nameLength;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render ("index.ejs")
});

app.post("/submit", (req, res) => {
  var fNameLength=req.body.fName.length;
  var lNameLength=req.body.lName.length;
  nameLength=fNameLength+lNameLength;
  res.render ("index.ejs",{nameLength})
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
