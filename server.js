'use strict';
var port = process.env.PORT || 8080;
var restify = require('restify');
var jsonfile = require('jsonfile');
var file = 'data/pullups.json';

console.log('application started at '+ new Date());

var server = restify.createServer();
server.use(restify.bodyParser());

server.use(restify.CORS({
	origins: ['*']
}));

function addPullUps(req,res,next){
	var name = req.params.name;
	var amount = parseInt(req.params.amount);
  var set = parseInt(req.params.set);
	jsonfile.readFile(file, function(err, obj) {
      if(err) {
        console.log(err);
      }
  		if(name in obj) {
  			obj[name].amount += amount;
        obj[name].set = set;
  			jsonfile.writeFile(file, obj, function (err) {
  				res.send(obj);
			});
  		} else {
  			var err = {
  				"msg":"User does not exist",
  				code:999
  			};
  			res.send(err);
  		}
	});
}

function getResults(req,res,next) {
  jsonfile.readFile(file, function(err, obj){
      res.send(obj);
  });
}

server.post('/add/:name/:amount/:set', addPullUps);
server.get('/getResults',getResults);

server.listen(port, function() {
  console.log('%s listening at %s', server.name, server.url);
});