var formidable = require('formidable'),
    http = require('http'),
    util = require('util');

var filename;

http.createServer(function(req, res) {
  if (req.url == '/upload' && req.method.toLowerCase() == 'post') {
    // parse a file upload
    var form = new formidable.IncomingForm();
    form.uploadDir = "/Users/chandakmayank/Desktop/swati recharge ki dukaan/uploads";
    form.multiples = true;

    form.keepExtensions = true;
    form.parse(req, function(err, fields, files) {
      res.writeHead(200, {'content-type': 'text/plain'});
      res.write('received upload:\n\n');
      res.end(util.inspect({fields: fields, files: files}));
      // filename= files.upload.name.toString();
      // console.warn(filename);
    });

    return;
  }

  // show a file upload form
  res.writeHead(200, {'content-type': 'text/html'});
  res.end(
    '<form action="/upload" enctype="multipart/form-data" method="post">'+
    '<input type="text" name="title"> <br>'+
    // '<input type="file" name="upload" accept="image/*"><br>'+
    '<input type="file" name="upload" multiple="multiple" accept="*" >'+
    '<input type="submit" value="Upload">'+

    '</form>'
  );
}).listen(8080);