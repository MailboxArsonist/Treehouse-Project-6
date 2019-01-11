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
    console.log(project);
    res.render('project', {
        project,
        title,
        description,
        live_link,
        github_link,
        image_urls
    });
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