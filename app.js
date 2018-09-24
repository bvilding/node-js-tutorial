const express = require('express');
const todoController = require('./controllers/todoController');

const app = express();

//Setup Template Engine
app.set('view engine', 'ejs');

//Static Files Middleware
app.use(express.static('./public'));

//Fire Controllers
todoController(app);

//Listen to Port
app.listen(3000);
console.log('You are listening to port 3000');

//We are using MVC Structure that breaks things down into Model, View, and Controller. This sounds a lot like Service Oriented Architecture.
