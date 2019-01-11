//Require express module
const express = require('express');
//Create express app
const app = express();




//
app.get('/', (req, res, next) => {
    const user = 'hello user';
    res.send(`<h1>${user}</h1>`);
});


//Listen on localhost port:3000
app.listen('3000', () =>{
    console.log('listening on port 3000');
});