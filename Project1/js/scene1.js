import {Client} from "./client.js"
import eventsCenter from "./eventsCenter.js";
import {StateMachine} from "./StateMachine.js";
import {State} from "./StateMachine.js";

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

    create() {
        this.player = {myself: '', enemy: ''};

        this.platforms = this.physics.add.staticGroup();

        this.add.image(400, 300, 'background');
        this.platforms.create(400, 587.5, 'ground');

        Client.askNewPlayer();
        eventsCenter.on('addPlayer', this.addPlayer, this);
        eventsCenter.on('addOtherPlayer', this.addOtherPlayer, this);
        eventsCenter.on('destroyDisconnectedSprite', this.destroyDisconnectedSprite, this);

        this.stateMachine = new StateMachine(
            'idle',
            {
                idle: new IdleState(),
                move: new MoveState()
            },
            [this, this.player.myself]
        );
        this.anims.create({
            key: 'idle',
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
    joinPlayer(data){

    }
    destroyDisconnectedSprite(){
        console.log('almost destroyed');
        this.player.enemy.destroy();
    }

    update(){
        // if(this.player.myself === ""){
        //     console.log("waiting for player creation");
        // }
        // else{
        //     let cursors = this.input.keyboard.createCursorKeys();
        //     if (cursors.left.isDown) {
        //         Client.playerMovement('left');
        //         this.player.myself.setVelocityX(-160);
        //         this.player.myself.anims.play('left', true);
        //         this.player.myself.flipX = true;
        //     } else if (cursors.right.isDown) {
        //         Client.playerMovement('right');
        //         this.player.myself.setVelocityX(160);
        //         this.player.myself.anims.play('right', true);
        //         this.player.myself.flipX = false;
        //     } else {
        //         Client.playerMovement('idle');
        //         this.player.myself.setVelocityX(0);
        //         this.player.myself.anims.play('idle', true);
        //     }
        //
        // }
        // eventsCenter.on('joinPlayer', drawJoinedPlayer, this)
        // eventsCenter.on('moveEnemy', moveEnemy, this);
        //
        // function drawJoinedPlayer(data){
        //     this.player.enemy = this.physics.add.sprite(data['x'], data['y'],'player');
        //     this.physics.add.collider(this.player.enemy, this.platforms);
        // }
        // function moveEnemy(direction){
        //     switch (direction){
        //         case 'idle':
        //             this.player.enemy.setVelocityX(0);
        //             this.player.enemy.anims.play('idle', true);
        //             break;
        //         case 'left':
        //             this.player.enemy.setVelocityX(-160);
        //             this.player.enemy.anims.play('left', true);
        //             this.player.enemy.flipX = true;
        //             break;
        //         case 'right':
        //             this.player.enemy.setVelocityX(160);
        //             this.player.enemy.anims.play('right', true);
        //             this.player.enemy.flipX = false;
        //             break;
        //     }
        // }

        this.stateMachine.step();
    }

}

class IdleState extends State{
    enter(scene, player){
        console.log(player);
        // player.anims.play('idle', true);
        // player.setVelocityX(0);
    }
    execute(scene, hero) {
        console.log('executing');
        const {left, right, up, down, space} = scene.keys;
            // Transition to swing if pressing space
        if (space.isDown) {
            this.stateMachine.transition('swing');
            return;

        } // Transition to move if pressing a movement key
        if (left.isDown || right.isDown || up.isDown || down.isDown) {
            this.stateMachine.transition('move');
            return;
        }
    }
}

class MoveState extends State {execute(scene, hero) {
    const {left, right, up, down, space} = scene.keys;

    // Transition to swing if pressing space
    if (space.isDown) {
        this.stateMachine.transition('swing');
        return;
    }

    // Transition to idle if not pressing movement keys
    if (!(left.isDown || right.isDown || up.isDown || down.isDown)) {
        this.stateMachine.transition('idle');
        return;
    }

    hero.setVelocity(0);
    if (up.isDown) {
        hero.setVelocityY(-100);
        hero.direction = 'up';
    } else if (down.isDown) {
        hero.setVelocityY(100);
        hero.direction = 'down';
    }
    if (left.isDown) {
        Client.playerMovement('left');
        hero.setVelocityX(-160);
        hero.anims.play('left', true);
        hero.flipX = true;
    } else if (right.isDown) {
        hero.setVelocityX(100);
        hero.direction = 'right';
    }
}



}





// TODO: Make a state machine:
// More character movement





