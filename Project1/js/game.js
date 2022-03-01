var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 300},
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config)
    game.init = function () {
        // game.stage.disableVisibilityChange = true

}

function preload() {
    this.load.image('ground', '/resources/images/ground.png')
    this.load.image('background', '/resources/images/Background.png')
    this.load.image('platform01', '/resources/images/platform01.png')
    this.load.spritesheet('player', '/resources/images/warriorPlayer.png', {frameWidth: 69, frameHeight: 44})
}

function create() {

    let platforms;
    //server stuff
    game.playerMap = {};
    //creating map
    platforms = this.physics.add.staticGroup()

    this.add.image(400, 300, 'background')
    platforms.create(400, 587.5, 'ground')

    Client.askNewPlayer();
    // console.log(this);
    // let playerInfo = {
    //     id: 'test',
    //     x: 200,
    //     y: 200
    // }
    //
    // addPlayer(this, playerInfo);



    //creating players

    //misc
    this.physics.add.collider(game.player, platforms);
    // cursors = this.input.keyboard.createCursorKeys();

    //animations for player movement
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

function update() {
    // console.log('update fired');
    // let cursors = this.input.keyboard.createCursorKeys();
    // // game.playerMap['playerId'] = addNewPlayer();
    // if (cursors.left.isDown) {
    //     game.playerMap['playerId'].setVelocityX(-160);
    //     game.playerMap['playerId'].anims.play('left', true);
    //     game.playerMap['playerId'].flipX = true;
    // } else if (cursors.right.isDown) {
    //     game.playerMap['playerId'].setVelocityX(160);
    //     game.playerMap['playerId'].anims.play('right', true);
    //     game.playerMap['playerId'].flipX = false;
    // } else {
    //     game.playerMap['playerId'].setVelocityX(0);
    //     game.playerMap['playerId'].anims.play('idleRight', true);
    // }
}

function addPlayer (playerInfo, scene = game){
    console.log(scene);
    scene.player = scene.add.sprite(playerInfo.x, playerInfo.y, 'player', 0);
    // console.log(playerInfo);
    // game.player =  scene.add.sprite(playerInfo.x, playerInfo.y, 'player', 0)
    // game.player.setBounce(0.2);
    // game.player.setCollideWorldBounds(true);
    // return data;
}

