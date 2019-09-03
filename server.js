var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server, {});
var internalIP = require("internal-ip");
var publicIP = require('public-ip');
var chalk = require("chalk");
app.get('/', function (request, response) {
    response.sendFile(__dirname + '/public/index.html');
});
app.use(express.static(__dirname + '/public'));
server.listen(13214);
console.log(chalk.cyan("[INFO]:"), "Server startet!");
internalIP.v4().then(function (ip) {
    console.log("Local:\t" + ip + ":" + server.address().port);
});
publicIP.v4().then(function (ip) {
    console.log("Public:\t" + ip + ":" + server.address().port);
});
io.sockets.on('connection', function (socket) {
    console.log(chalk.green("Connected: "), socket.id);
    socket.on('disconnect', function () {
        console.log(chalk.red("Disconnected: "), socket.id);
    });
});
