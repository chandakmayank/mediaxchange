var express = require('express');
var app = express();
var formidable = require('express-formidable');
var jsonfile = require('jsonfile');
var dirToJson = require('dir-to-json');
var exphbs  = require('express-handlebars');
var Sound = require('node-mpg123');
var Omx = require('node-omxplayer');


var player = Omx();


app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use(express.static('static'));

var filetree = './files.json';

// If you prefer, you can also use promises
// dirToJson( "./uploads/Khirki Library" )
// .then( function( dirTree ){
// 	console.log( dirTree );
// 	jsonfile.writeFile(filetree, dirTree, function(err) {
// 		console.error(err);
// 	});
// })
// .catch( function( err ){
// 	throw err;
// });


app.get('/', function (req, res) {
	res.sendfile('index.html');
});


app.get('/about', function (req, res) {
	res.sendfile('about.html');
});

app.get('/list', function (req, res) {
    var treeobj = jsonfile.readFileSync(filetree);
    res.render('files',treeobj);
});

app.get('/queue' ,function(req,res){
	var path = '/uploads/Khirki Library/'+req.query.q;
	console.warn(path);
	player.newSource(path, 'hdmi');
	res.redirect('/list');

});


app.use(formidable.parse({
	'uploadDir':'files',
	'keepExtensions': true
}));


app.post('/upload', function (req, res) {
	console.warn(req.body);
	res.redirect('/list');

});



app.listen(80, function () {
	console.log('Phone Dukaan app listening on port 80!');
});
