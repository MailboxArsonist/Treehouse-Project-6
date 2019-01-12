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

//index route. Project will hold the array of projects
app.get('/', (req, res, next) => {
    const project = json.projects;
    res.render('index', {project:project});
});

// /about route. Will render about.pug
app.get('/about', (req, res) => {
    res.render('about');
});

// /project route. Id will be the index of project to show, will then render project.pug passing in all relevant project info into the template
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

//Error handler for 404 issues, will pass err object to error handler below
app.use((req, res, next) => {
    const err = new Error('We cannot find this page');
    err.status = 404;
    next(err);
});


//Error handler. will render the error.pug template.
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