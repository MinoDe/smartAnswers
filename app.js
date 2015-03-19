var os = require('os');
var http = require('http');
var express = require('express');
var connect = require("connect");
var blessed = require('blessed');
var bodyParser = require('body-parser');
var querystring = require('querystring');
var app = express();
//Adding
app.use(bodyParser.urlencoded());

// Create a screen object.
var screen = blessed.screen();
var question=[{q:"What does CIS stand for?", a:"COMPUTER AND INFORMATION SCIENCES", b:"COMPUTER AND IDIOT SCIENCES",c:"CALCULAS AND INTEGRATION SCIENCS",d:"None of the above"},
				{q:"How many presidents did the US have?" , a:"48", b:"47",c:"44",d:"None of the above"}];
// Create a box perfectly centered horizontally and vertically.
var box = blessed.box({
	top: 'center',
	left: 'center',
	width: '50%',
	height: '50%',
	content: '',
	tags: true,
	border: {
		type: 'line'
	},
	style: {
		fg: 'white',
		bg: 'black',
		border: {
			fg: '#f0f0f0'
		},
		hover: {
			bg: 'black'
		}
	}
});

// Append our box to the screen.
screen.append(box);

app.set('port', process.env.PORT || 3000);

var my_group = ["192.168.0.101", "192.168.0.103", "192.168.1.104", "192.168.1.105"];	// replace with real IPs of group

var my_index = 1;	// replace with index of my IP in my_group

box.setContent('this node (' + my_group[my_index] + ') will attempt to send its token to other nodes on network. ');
screen.render();

// handle GET requests
app.get('/do_get', function (req, res){
	var the_body = req.query;
	console.log ( "get body: " + the_body );
	box.setContent("Get with query: " + the_body);
	box.style.bg = 'green';	//green for get
	screen.render();
	res.json({"query": the_body, "id": JSON.stringify(my_group[my_index])});
});


// handle POST requests
app.post('/do_post', function (req, res) {
	var post_data = req.body;	//see connect package above
	/*console.log ( "post body: " + the_body );
	res.json({"body": the_body, "id": JSON.stringify(my_group[my_index])});*/

	//box.setContent("Count is at: " + post_data.n + ", with " + post_data.c + " primes found.");
	var count = countPrimes(post_data);
	
	postToNext({c:count,n:num,k:kwork});
	}, 0);
	//box.style.bg = "green";
	//screen.render();

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
},0);


// Quit on Escape, q, or Control-C.
screen.key(['escape', 'q', 'C-c'], function(ch, key) {
	return process.exit(0);
});

// Focus our element.
box.focus();

// Render the screen.
screen.render();

http.createServer(app).listen(app.get('port'), function(){
	console.log("Express server listening on port " + app.get('port'));
});