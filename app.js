//Require express module
const express = require('express');
//Create express app
const app = express();

//Require json file ALL PROJECT DATA IS STPRED HERE
const json = require('./data.json');

//Set view engine to pug template
app.set('view engine', 'pug');

//serve static files
app.use('/static', express.static('public'));

//------Routing---------//

//index
app.get('/', (req, res, next) => {
    const project = json.projects;
    res.render('index', {project:project});
});

app.get('/about', (req, res, next) => {
    res.render('about');
});

app.get('/project', (req, res, next) => {
    console.log(req.param);
    res.render('project');
});






//
// app.get('/', (req, res, next) => {
//     const imgs = json.projects[0].image_urls[0];
//     console.log(json.projects[0]);
//     res.send(`<img src='${imgs}'</img>`);
// });


//Listen on localhost port:3000
app.listen('3000', () =>{
    console.log('listening on port 3000');
});