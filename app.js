const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require("body-parser");
const path = require('path')
const axios = require('axios');
const { Pool } = require('pg');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const connectionString = "postgres://postgres:password@localhost:5432/test_db";
const pool = new Pool({
    connectionString: connectionString
});

app.use(express.static(path.join(__dirname, 'public')));
app.get("/all", (req, res) => {
    pool.query("SELECT name FROM ranking")
        .then((result) => {
            if(result.rows) {
                result.rows.forEach((row, index) => {
                    console.log(index + 1, row);
                });
            }
        })
        .catch((error) => {
            console.log("Fail", error);
        })
        .then(() => {
            console.log("切断");
        })
});

app.post("/post", (req, res) => {
    const userName = req.body.name;
    const score = req.body.score;
    const queryText = "INSERT INTO rank(name, score) VALUES($1, $2)";
    const values = [userName, score];
    console.log({queryText, values});
    pool.query(queryText, values)
        .then((result) => {
            console.log("Success", result);
            res.send("Received POST DATA!");
        })
        .catch((error) => {
            console.error(error.stack);
        });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})