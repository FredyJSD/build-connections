import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import fs from 'fs/promises';

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get("/", async (req, res) => {
    res.render("index.ejs");
});

app.get("/menu", async (req, res) =>{
    res.render("menu.ejs");
});

app.get("/icebreaker", async (req, res) =>{
    res.render("ice.ejs");
});

app.get("/confess", async (req, res) =>{
    res.render("confess.ejs");
});

app.get("/deep", async (req, res) =>{
    res.render("deep.ejs");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
