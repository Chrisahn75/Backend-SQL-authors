const express = require("express");
const dotenv = require("dotenv");
dotenv.config({
  path: "./config.env",
});
const { Pool } = require("pg");
const app = express();
app.use(express.json());

const Postgres = new Pool({ ssl: { rejectUnauthorized: false } });

app.get("/", (_req, res) => {
  res.send("Authors API");
});

app.get("/authors/:id", async (req, res) => {
  const author = await Postgres.query(
    "SELECT name, nationality FROM authors",
    [req.params.id]
  );
  res.send(author.rows);
});

app.get("/authors/:id/books", async (req, res) => {
  const author = await Postgres.query(
    "SELECT books FROM authors",
    [req.params.id]
  );

  res.send(author.rows);
});

app.get("/json/authors/:id", async (req, res) => {
  const author = await Postgres.query(
    "SELECT name, nationality FROM authors",
    [req.params.id]
  );

  res.json(author.rows);
});

app.get("/json/authors/:id/books", async (req, res, _next) => {
  const author = await Postgres.query(
    "SELECT books FROM authors",
    [req.params.id]
  );

  res.json(author.rows);
});

app.use("*", (err, req, res, next) => {
	res.send("error");
});

app.listen(8000, () => {
  console.log("Listening on port 8000");
});