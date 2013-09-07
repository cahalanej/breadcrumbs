// dh@foursquare.com @octopi

// var app = require('express')()
var express = require('express')
  , app = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server)
  , twilio = require('twilio' ); //Load the twilio module

// Create a new REST API client to make authenticated requests against the
// twilio back end
var accountSid = 'AC71b7fa31feefaf648cda86b85d68fe2d'
var authToken = "{{ c6195524b11918be9586a42d407b605f }}"
var client = new twilio.RestClient(accountSid, authToken);

// Pass in parameters to the REST API using an object literal notation. The
// REST client will handle authentication and response serialzation for you.
client.sms.messages.create({
    to:'+18022660505',
    from:'+16035383594',
    body:'ahoy hoy! Testing Twilio and node.js'
}, function(error, message) {
// The HTTP request to Twilio will run asynchronously. This callback
// function will be called when a response is received from Twilio
// The "error" variable will contain error information, if any.
// If the request was successful, this value will be "falsy"
if (!error) {
// The second argument to the callback will contain the information
// sent back by Twilio for the request. In this case, it is the
// information about the text messsage you just sent:
console.log('Success! The SID for this SMS message is:');
console.log(message.sid);

console.log('Message sent on:');
console.log(message.dateCreated);
}
else {
    console.log('Oops! There was an error.');
}
});

server.listen(8080);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

app.use('/libs', express.static(__dirname + '/libs'));

io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});