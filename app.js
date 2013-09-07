// dh@foursquare.com @octopi

var fs = require('fs');

var express = require('express')
  , app = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server)
  , twilio = require('twilio'); 

var accountSid = 'AC71b7fa31feefaf648cda86b85d68fe2d';
var authToken = 'c6195524b11918be9586a42d407b605f';
var client = new twilio.RestClient(accountSid, authToken);

server.listen(8080);
var datastore = {};

// phone number to send to
app.use(express.bodyParser());

app.post('/textmsg', function(req, res) {
    var phonenumber= req.body.phone;
    var uid = req.body.uid;
    console.log(phonenumber);


    // Pass in parameters to the REST API using an object literal notation. The
    // REST client will handle authentication and response serialzation for you.
    client.sms.messages.create({
        to:'+1' + phonenumber,
        from:'+16035383594',
        body:'follow the crumbs: http://crumb.herokuapp.com/track/' + uid
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
});


app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

app.get('/track/:uid', function (req, res) {
    var uid = req.params.uid;
    uid = uid.replace(/</g, '');
    uid = uid.replace(/>/g, '');
    uid = uid.replace(/&/g, '');
    fs.readFile(__dirname + '/track.html', function(err, data) {
        res.send((data + '').replace("theirs", uid));
    });
});

app.use('/libs', express.static(__dirname + '/libs'));

io.sockets.on('connection', function (socket) {
    // add back later to uid: Math.random.toString() + ':' + 
    var uid = (new Date()).getTime().toString();

    var datatimeout;
    var listentimeout;
    socket.emit('news', { 'uid': uid });
    socket.on('location', function (data) {
        console.log('location: ' + data);
        datastore[uid] = data;

        clearTimeout(datatimeout);
        datatimeout = setTimeout(function() {
            if (uid in datastore) {
                delete datastore[uid];
            }
        }, 3600);
    });
    socket.on('listen', function (their_uid) {
        console.log('listen: ' + their_uid);
        setInterval(function() {
            socket.emit('location', datastore[their_uid])
        }, 10000);
    });

    socket.on('disconnect', function() {
        clearInterval(listentimeout);
    });

});


// Create a new REST API client to make authenticated requests against the
// twilio back end


