import {game} from "./game.js";
import GameScene from "./scene1.js";
import eventsCenter from "./eventsCenter.js";

export let Client = {};
Client.socket = io.connect()
let otherPlayer = 0;
Client.socket.on('currentPlayers', function (players){
    if(Object.keys(players).length > 2){
        window.alert('Error: two people already connected');
        return;
    }
    Object.keys(players).forEach(function (id){
        if (players[id].playerId === Client.socket.id){
            eventsCenter.emit('addPlayer', players[id]);
        }
        else{
            eventsCenter.emit('addOtherPlayer', players[id]);
            otherPlayer++;
        }
    })
});

Client.askNewPlayer = function () {
    Client.socket.emit('newplayer');
};

Client.socket.on('newplayer', function (playerData) {
    eventsCenter.emit('joinPlayer', playerData);
});

Client.socket.on('disconnect', function (){
    eventsCenter.emit('destroyDisconnectedSprite');
})


