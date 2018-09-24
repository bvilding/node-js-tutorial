// let data = [{item: 'get milk'}, {item: 'walk dog'}, {item: 'kick some coding ass'}]
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//Connect to Database
mongoose.connect('mongodb://test:Ml_994532@ds111913.mlab.com:11913/node-todo-test');

//Create a schema - This is like the blueprint for the data
const todoSchema = new mongoose.Schema({
	item: String
});

//This is the Model from MongoDB
var Todo = mongoose.model('Todo', todoSchema);
// var itemOne = Todo({item: 'buy flowers'}).save(function(err){
// 	if (err) throw err;
// 	console.log('item saved');
// });

const urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){
	
	app.get('/todo', function (req, res){
			//Get data from MongoDB and pass it to the view	
			Todo.find({}, function(err, data){ //Searches the database for this collection. This will pull everything in the database.
					if (err) throw err; 
			res.render('todo', {todos: data});
		});
	});

	app.post('/todo', urlencodedParser, function (req, res){
			//Get data from the view, and add it to MongoDB
			var newTodo = Todo(req.body).save(function(err, data){
				if (err) throw err;
				res.json(data);
			});
		});

	app.delete('/todo/:item', function (req, res){
			//Delete the requested item from MongoDB
			Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
				if (err) throw err;
				res.json(data);
		});
	});	
}