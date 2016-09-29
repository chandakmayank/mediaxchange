var express = require('express');
var app = express();
var formidable = require('express-formidable');
var jsonfile = require('jsonfile');
var dirToJson = require('dir-to-json');
var exphbs  = require('express-handlebars');
// var Mpg = require('mpg123');
// var Omx = require('node-omxplayer');


// var player = Omx();
// var musicplayer = new Mpg();


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
	var isMovie = path.match(/\.(mp4|flv|mkv)$/g);
	var isMusic = path.match(/\.(mp3)$/g);
	if(isMovie !=null){
		console.warn('found movie');
		// player.newSource(path, 'hdmi');
		// res.redirect('/thanks');

	}
	else if(isMusic !=null){
		console.warn('found music');
		// musicplayer.play(path)
		// res.redirect('/thanks');
	}
	else{
		console.warn('found nothing');
		// res.redirect('/sorry');
	}

});

app.get('/thanks',function(req,res){

});


app.get('/sorry',function(req,res){

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
