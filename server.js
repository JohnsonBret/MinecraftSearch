const express = require('express');
const fs = require('fs');
const hbs = require('hbs');
const bodyParser = require('body-parser');


const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + "/views/partials");
app.set('view engine', 'hbs');

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next)=>{
    var now = new Date().toString();
    var log = `Method: ${req.method} Request url: ${req.url} at time: ${now}`;
    fs.appendFile('server.log', log + '\n', (err) =>{
        if(err){
            console.log("Unable to append server log");
        }
    });
    next();
});


app.use(express.static(__dirname + "/public"));

hbs.registerHelper('getCurrentYear', ()=>{
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text)=>{
    return text.toUpperCase();
})

app.get('/', (req, res)=>{
    res.render('index.hbs', {
        pageTitle: "Minecraft Search",
        welcomeMessage: "Welcome to Minecraft Search"
    });
});

app.listen(port, ()=>{
    console.log(`Server up on Port ${port}`);
});