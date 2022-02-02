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
    this.load.image('ground', 'resources/images/ground.png')
    this.load.image('background', 'resources/images/Background.png')
    this.load.image('platform01', 'resources/images/platform01.png')
    this.load.spritesheet('player', 'resources/images/warriorPlayer.png', {frameWidth: 69, frameHeight: 44})
}

function create() {
    let platforms;
    let cursors;
    //server stuff
    game.playerMap = {};
    //creating map
    platforms = this.physics.add.staticGroup()

    this.add.image(400, 300, 'background')
    platforms.create(400, 587.5, 'ground')

    Client.askNewPlayer();
    //creating players

    //misc
    this.physics.add.collider(game.player, platforms);
    cursors = this.input.keyboard.createCursorKeys();

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
    if (cursors.left.isDown) {
        player.setVelocityX(-160)
        player.anims.play('left', true)
        player.flipX = true;
    } else if (cursors.right.isDown) {
        player.setVelocityX(160)
        player.anims.play('right', true)
        player.flipX = false;
    } else {
        player.setVelocityX(0)
        player.anims.play('idleRight', true)
    }
}

game.addNewPlayer = function (id, x, y) {
    game.playerMap[id] = game.add.sprite(x, y, 'player', 0)
    game.playerMap[id].setBounce(0.2);
    game.playerMap[id].setCollideWorldBounds(true);
}


