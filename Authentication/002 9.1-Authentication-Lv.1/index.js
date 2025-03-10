import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const db=new pg.Client({
      user:"postgres",
      password:"12345678",
      host:"localhost",
      database:"secrets",
      port:5432
});
db.connect();

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;

  try {
    const check = await db.query("select * from users where email=$1", [email]);

    if (check.rowCount === 0) {
      const query = await db.query(
        "Insert into users(email,password) values($1,$2)",
        [email, password]
      );
      if (query.rowCount > 0) {
        console.log("saved to database");
        res.render("secrets.ejs");
      } else {
        console.log("problem in saving data into db.");
      }
    } else {
      console.log("you have already registered");
      res.redirect("/register");
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/login", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;

  try {
    const result = await db.query("SELECT * from users where email=$1", [
      email,
    ]);

    if (result.rowCount > 0) {
      if (result.rows[0].password === password) {
        console.log("everything is correct!");
        res.render("secrets.ejs");
      } else {
        res.send(`incorect password`);

      }
    } else {
      res.send("you haven't registered");
    }
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
