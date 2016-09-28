var express = require('express');
var app = express();
var formidable = require('express-formidable');
// var dir = require('node-dir');
var jsonfile = require('jsonfile');


var filesjson = require('./files.json');


var exphbs  = require('express-handlebars');



var dirToJson = require('dir-to-json');


var file = 'files.json';

// If you prefer, you can also use promises
dirToJson( "./uploads" )
.then( function( dirTree ){
	// console.log( dirTree );
	jsonfile.writeFile(file, dirTree, function(err) {
		console.error(err)
	});
	console.warn(JSON.parse(dirTree));
})
.catch( function( err ){
	throw err;
});



var filename;

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use(express.static('static'));




app.get('/', function (req, res) {
	res.sendfile('index.html');
});


app.get('/about', function (req, res) {
	res.sendfile('about.html');
});

app.get('/list', function (req, res) {
	// res.sendfile('files.html');

    res.render('files',filesjson);
});

app.get('/queue' ,function(req,res){
	console.warn('pplay this file ' + req.query.q);
	res.redirect('/list');

});


app.use(formidable.parse({
	'uploadDir':'uploads',
	'keepExtensions': true
}));


app.post('/upload', function (req, res) {
	console.warn(req.body);
	res.redirect('/list');

});



app.listen(80, function () {
	console.log('Phone Dukaan app listening on port 80!');
});
