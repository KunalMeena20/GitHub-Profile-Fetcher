const express = require("express");
const path = require("path");
const app = express();
const axios = require("axios");
const port = 8080;

app.listen(port, () => {
    console.log("server started.");
});

app.use(express.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, "public")));
 
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/users", (req, res) => {
    res.render("index.ejs");
    let username = req.query.username ;
    try{
        let profileFetcher = axios.get(`https://api.github.com/users/${username}`);
        console.log( profileFetcher.data);  
        res.render("index.ejs", {profileFetcher})          
    } catch (err){
        console.log("Invalid Username");
}})

                                                                                           
