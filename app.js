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

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/project/:id', (req, res) => {
    let {id} = req.params;
    const project = json.projects[id];
    const title = project.project_name;
    const description = project.description
    const live_link = project.live_link;
    const github_link = project.github_link;
    const image_urls = project.image_urls;
    const technologies = project.technologies;
    res.render('project', {
        project,
        title,
        description,
        live_link,
        github_link,
        image_urls,
        technologies
    });
});

app.use((req, res, next) => {
    const err = new Error('We cannot find this page');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.status(err.status||500);
    console.log(`Oh no-- ${err.message}  Error:${res.statusCode}`);
    res.render('error', {
        message : err.message,
        status : res.statusCode,
        stack : err.stack
    });
});


//Listen on localhost port:3000
app.listen('3000', () =>{
    console.log('listening on port 3000');
});