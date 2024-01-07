import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://v2.jokeapi.dev/joke/Programming?format=json&blacklistFlags=nsfw,sexist&type=single&lang=en&amount=2";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs", {
        Name: '',
        Joke1: '',
        Joke2: '',
    });
});

app.post("/submit", async (req, res) => {
    const name = req.body["users-name"];
    try {
        const result = await axios.get(API_URL);
        
        res.render("index.ejs", {
            Name: name,
            Joke1: result.data.jokes[0].joke,
            Joke2: result.data.jokes[1].joke,
        });
    } catch (error) {
        res.status(500);
    }
});

app.listen(port, () =>{
    console.log(`Server is running on ${port}`);
});