var express = require('express');
var path = require('path');

var rootPath = path.normalize(__dirname +'./../client')

var app = express();

app.use(express.static(__dirname + '/../client'));

app.get('/',function(req,res){
      res.sendFile(path.join(rootPath + '/index.html'));
});

var port = process.env.PORT || 3000;

app.listen(port);
console.log('Listening on port ' + port)
