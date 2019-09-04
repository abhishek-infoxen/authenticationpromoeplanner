var express = require('express');

var app = express();

// Rewrite rule for angular
// app.use('/', express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/dist/angular7-heroku'));
app.get('/assets', function(req, res){
    res.sendFile(__dirname + '/dist/assets');
});
app.get('/*', function(req, res){
    res.sendFile(__dirname + `/dist/index.html`);
});

var port = process.env.PORT || 80;
app.listen(port, function(){
    console.log('server running on port ' + port + '.');
})