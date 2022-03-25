import {game} from "./game.js";
import GameScene from "./scene1.js";
import eventsCenter from "./eventsCenter.js";

export let Client = {};
Client.socket = io.connect();

Client.socket.on('currentPlayers', function (players){
    Object.keys(players).forEach(function (id){
        if (players[id].playerId === Client.socket.id){
            eventsCenter.emit('addPlayer', players[id]);
        }
        else{
            eventsCenter.emit('addOtherPlayer', players[id])
        }
    })
});

Client.askNewPlayer = function () {
    Client.socket.emit('newplayer');
};

Client.socket.on('newplayer', function (newPlayer) {
    eventsCenter.emit('addOtherPlayer', newPlayer)
});

Client.socket.on('disconnect', function (){
    eventsCenter.emit('destroyDisconnectedSprite');
})


