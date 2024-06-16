import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import fs from 'fs/promises';

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

async function loadJson(questionFile) {
    try {
        const questionJSON = await fs.readFile(`./${questionFile}.json`, 'utf-8');
        return JSON.parse(questionJSON);
    } catch (err) {
        console.error('Error reading or parsing the JSON file:', err);
        throw err; // Re-throw the error to handle it in the calling function
    }
}

app.get("/", async (req, res) => {
    res.render("index.ejs");
});

app.get("/menu", async (req, res) =>{
    res.render("menu.ejs");
});

app.get("/icebreaker", async (req, res) =>{
    const questions = await loadJson('questions');
    const levels = questions.levels;
    const iceLevel = levels.find(function(level){
        return level.name === "ice breaker";
    })
    const iceQuestion = iceLevel.questions;
    console.log(iceQuestion);
    res.render("ice.ejs", {
        question: iceQuestion
    });
});

app.get("/confess", async (req, res) =>{
    const questions = await loadJson('questions');
    const levels = questions.levels;
    const confessLevel = levels.find(function(level){
        return level.name === "confess";
    })
    const confessQuestion = confessLevel.questions;
    res.render("confess.ejs", {
        question: confessQuestion
    });
});

app.get("/deep", async (req, res) =>{
    const questions = await loadJson('questions');
    const levels = questions.levels;
    const deepLevel = levels.find(function(level){
        return level.name === "deep";
    })
    const deepQuestion = deepLevel.questions;
    res.render("deep.ejs", {
        question: deepQuestion
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
