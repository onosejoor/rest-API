import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

// Api URL
const apiUrl = "https://secrets-api.appbrewery.com";

// Auth Import
import { token } from "./apikey.js";
const config = {
    headers: {Authorization: `Bearer ${token}`}
};

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs", {content: "Waiting for data...."});
});

app.post("/get-secret", async (req, res) => {
    const userId = req.body.id;
    console.log(userId);
    try {
    const response = await axios.get(apiUrl+ `/secrets/${userId}`, config);
    const result = response.data.secret;
    res.render("index.ejs", {content: result});
    } catch (error) {
        res.render("index.ejs", {content: JSON.stringify(error.response.data)});       
    }

});

app.post("/post-secret", async (req, res) => {
    const userId = req.body.id;
    const userSecret = req.body.secret;
    const userScore = req.body.score;

    let body = {
        secret: userSecret,
        score: userScore,
        id: userId
    }
    console.log(body);
    try {
    const response = await axios.post(apiUrl+ `/secrets`,body, config);
    const result = JSON.stringify(response.data) ;
    res.render("index.ejs", {content: result});
    } catch (error) {
        res.render("index.ejs", {content: JSON.stringify(error.response.data)});       
    }

});

app.post("/put-secret", async (req, res) => {

    const userId = req.body.id;
    const userSecret = req.body.secret;
    const userScore = req.body.score;

    let body = {
        secret: userSecret,
        score: userScore,
    }

    try {
    const response = await axios.put(apiUrl+ `/secrets/${userId}`,body, config);
    const result = JSON.stringify(response.data) ;
    res.render("index.ejs", {content: result});
    } catch (error) {
        res.render("index.ejs", {content: JSON.stringify(error.response.data)});       
    }

});

app.post("/patch-secret", async (req, res) => {

    const userId = req.body.id;
    const userSecret = req.body.secret;
    const userScore = req.body.score;

    let body = {
        secret: userSecret,
        score: userScore,
    }

    try {
    const response = await axios.patch(apiUrl+ `/secrets/${userId}`,body, config);
    const result = JSON.stringify(response.data) ;
    res.render("index.ejs", {content: result});
    } catch (error) {
        res.render("index.ejs", {content: JSON.stringify(error.response.data)});       
    }

});


// To delete secret
app.post("/delete-secret", async (req, res) => {

    // user inputs
    const userId = req.body.id;

    try {
    const response = await axios.delete(apiUrl+ `/secrets/${userId}`, config);
    const result = response.data.message;
    res.render("index.ejs", {content: result});
    } catch (error) {
        res.render("index.ejs", {content: JSON.stringify(error.response.data)});       
    }

});

app.listen(port, () => {
    console.log(`Server running on port ${port} ✌`);
})