import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  host: "localhost",
  user: "postgres",
  password: "12345678",
  port: 5432,
  database: "world",
});

db.connect();

async function selectCountries() {
  const result = await db.query("SELECT country_code FROM visited_countries");
  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  return countries;
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  const countries = await selectCountries();
  res.render("index.ejs", { countries: countries, total: countries.length });
});

app.post("/add", async (req, res) => {
  var countryName = req.body.country;
  countryName=countryName.toLowerCase();
  try {
    const result = await db.query(
      "select country_code from countries where LOWER(country_name) like '%' || $1 || '%'",
      [countryName]
    );
    try {
      await db.query(
        "Insert into visited_countries (country_code) values ($1)",
        [result.rows[0].country_code]
      );
      res.redirect("/");
    } catch (error) {
      console.log(error);
      const countries = await selectCountries();
      res.render("index.ejs", {
        countries: countries,
        total: countries.length,
        error: "The country already exist please try another one.",
      });
    }
  } catch (error) {
    console.log(error);
      const countries = await selectCountries();
      res.render("index.ejs", {
        countries: countries,
        total: countries.length,
        error: "Country name doesn't exist please try again.",
      });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
