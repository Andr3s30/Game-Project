var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use('/css',express.static(__dirname + '/css'));
app.use('',express.static(__dirname + '/js'));
app.use('/assets',express.static(__dirname + '/assets'));

app.get('/',function(req,res){
    res.sendFile(__dirname+'/game.js');
});

server.listen(8081,function(){ // Listens to port 8081
    console.log('Listening on '+server.address().port);
});

server.lastPlayerID = 0;

io.on('connection',function(socket){
    socket.on('newplayer',function(){
        socket.player = {
            id: server.lastPlayerID++,
            x: Math.floor(Math.random() * 300) + 100, //random int from 100 to 400
            y: Math.floor(Math.random() * 300) + 100
        };
        socket.emit('allplayers',getAllPlayers());
        socket.broadcast.emit('newplayer',socket.player);
    });
});

function getAllPlayers(){
    var players = [];
    Object.keys(io.sockets.connected).forEach(function(socketID){
        var player = io.sockets.connected[socketID].player;
        if(player) players.push(player);
    });
    return players;
}