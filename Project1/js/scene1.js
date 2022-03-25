import {Client} from "./client.js"
import eventsCenter from "./eventsCenter.js";

export default class GameScene extends Phaser.Scene{
    constructor() {
        super("GameScene");
    }

    preload(){
        this.load.image('ground', '/resources/images/ground.png')
        this.load.image('background', '/resources/images/Background.png')
        this.load.image('platform01', '/resources/images/platform01.png')
        this.load.spritesheet('player', '/resources/images/warriorPlayer.png', {frameWidth: 69, frameHeight: 44})
    }

        create(){
            this.player = {myself:'', enemy:''}
            let playerMap = {};
            this.platforms = this.physics.add.staticGroup()

            this.add.image(400, 300, 'background')
            this.platforms.create(400, 587.5, 'ground')

            Client.askNewPlayer();
            eventsCenter.on('addPlayer', this.addPlayer, this)
            eventsCenter.on('addOtherPlayer', this.addOtherPlayer, this)
            eventsCenter.on('destroyDisconnectedSprite', this.destroyDisconnectedSprite, this)

        this.anims.create({
            key: 'idleRight',
            frames: this.anims.generateFrameNumbers('player', {start: 0, end: 5}),
            frameRate: 10,
            repeat: -1
        })

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player', {start: 6, end: 11}),
            frameRate: 10,
            repeat: -1

        })
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('player', {start: 6, end: 11}),
            frameRate: 10,
            repeat: -1,
        })
    }
    addPlayer(data){
        this.player.myself = this.physics.add.sprite(data['x'], data['y'],'player');
        this.physics.add.collider(this.player.myself, this.platforms);
    }
    addOtherPlayer(data){
        this.player.enemy = this.physics.add.sprite(data['x'], data['y'],'player');
        this.physics.add.collider(this.player.enemy, this.platforms);
    }
    destroyDisconnectedSprite(){
        console.log('almost destroyed');
        this.player.enemy.destroy()
    }

    // update(){
    //     console.log('update fired');
    //     let cursors = this.input.keyboard.createCursorKeys();
    //     // game.playerMap['playerId'] = addNewPlayer();
    //     if (cursors.left.isDown) {
    //         game.playerMap['playerId'].setVelocityX(-160);
    //         game.playerMap['playerId'].anims.play('left', true);
    //         game.playerMap['playerId'].flipX = true;
    //     } else if (cursors.right.isDown) {
    //         game.playerMap['playerId'].setVelocityX(160);
    //         game.playerMap['playerId'].anims.play('right', true);
    //         game.playerMap['playerId'].flipX = false;
    //     } else {
    //         game.playerMap['playerId'].setVelocityX(0);
    //         game.playerMap['playerId'].anims.play('idleRight', true);
    //     }
    // }

}






