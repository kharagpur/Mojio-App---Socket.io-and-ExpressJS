var express = require('express');
var app = express();

var http = require('http');
var server = http.Server(app);

app.use(express.static('Client'));

var io = require('socket.io')(server);
var msgHistory = [];

io.on('connection', function(socket){
	console.log(`SOCKET ID: ${socket.id}`);
	console.log(`SOCKET ROOMS: ${socket.rooms}`);
	console.log(`SOCKET CLIENT: ${socket.client}`);	

	// On disconnecting callback
	socket.on('disconnecting', function(){
		console.log(`Socket ID: ${socket.id} Disconnecting...`);
	});

	// on disconnected callback
	socket.on('disconnect', function(){
		console.log(`Socket ID: ${socket.id} Disconnected!`);
	});

	// Push message history
	if (msgHistory.length > 0){
		for (var i = 0; i < msgHistory.length; i++){
			socket.emit('message', msgHistory[i]);
		}
	}

	// On topic message callback
	socket.on('message', function(initial, msg){
		console.log(`${msgHistory.length}: ${initial}: ${msg}`);
		msgHistory.push({'initial': initial, 'message': msg});
		io.emit('message', {'initial': initial, 'message': msg});
		
	});

	// https://stackoverflow.com/questions/16766488/socket-io-how-to-check-if-user-is-typing-and-broadcast-it-to-other-users
});

server.listen(process.env.PORT || 8080, function() {
  console.log('Chat server running');
});