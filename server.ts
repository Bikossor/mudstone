declare function require(name:string);
declare var __dirname; 

const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io') (server, {});
const internalIP = require("internal-ip");
const publicIP = require('public-ip');
const chalk = require("chalk");

app.get('/', function(request, response) {
    response.sendFile(__dirname + '/public/index.html');
});

app.use(express.static(__dirname + '/public'));

server.listen(13214);

console.log(chalk.cyan("[INFO]:"), "Server startet!");

internalIP.v4().then(ip => {
	console.log(`Local:\t${ip}:${server.address().port}`);
});

publicIP.v4().then(ip => {
    console.log(`Public:\t${ip}:${server.address().port}`);
});

io.sockets.on('connection', function(socket) {
    console.log(chalk.green("Connected: "), socket.id);
    
    socket.on('disconnect', () => {
        console.log(chalk.red("Disconnected: "), socket.id);
    });
});