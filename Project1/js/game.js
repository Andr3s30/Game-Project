import GameScene from "./scene1.js";

// let GameScene = new GameScene();

let config = {
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
    scene: GameScene
};

let game = new Phaser.Game(config);

game.scene.start('GameScene');







