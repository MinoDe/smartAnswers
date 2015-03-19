var os = require('os');
var http = require('http');
var express = require('express');
var connect = require("connect");
var blessed = require('blessed');
var crypto = require('crypto');
var bodyParser = require('body-parser');
var querystring = require('querystring');
var app = express();
app.set('port', process.env.PORT || 3000);
var question=[{q:"What does CIS stand for?", a:"COMPUTER AND INFORMATION SCIENCES", b:"COMPUTER AND IDIOT SCIENCES",c:"CALCULAS AND INTEGRATION SCIENCS",d:"None of the above"},
				{q:"How many presidents did the US have?" , a:"48", b:"47",c:"44",d:"None of the above"}];

//Getting values from android to get the question 
app.post('/question', function (req, res) {
	var post_data = req.body;	//see connect package above
	/*console.log ( "post body: " + the_body );
	res.json({"body": the_body, "id": JSON.stringify(my_group[my_index])});*/

	//box.setContent("Count is at: " + post_data.n + ", with " + post_data.c + " primes found.");
	var id = post_data.id;
	if(id < question.length)
		res.write(JSON.stringify(question[id]));
	else
		res.write(JSON.stringify({q:"thank You", a:"", b:"", c:"", d:""}));
	res.end();
});
http.createServer(app).listen(app.get('port'), function(){
	console.log("Express server listening on port " + app.get('port'));
	
});

