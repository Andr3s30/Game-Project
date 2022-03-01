var Client = {};
Client.socket = io.connect();

Client.socket.on('currentPlayers', function (players){
    Object.keys(players).forEach(function (id){
        if (players[id].playerId === Client.socket.id){
            addPlayer(players[id]);
        }
    })
});

Client.sendTest = function(){
    console.log("test sent");
    Client.socket.emit('test');
};

Client.askNewPlayer = function () {
    Client.socket.emit('newplayer');
};

Client.socket.on('newplayer', function (data) {
    addPlayer(data);
});

Client.socket.on('allplayers', function (data) {
    for (var i = 0; i < data.length; i++) {
        game.addNewPlayer(data[i].id, data[i].x, data[i].y)
    }
});