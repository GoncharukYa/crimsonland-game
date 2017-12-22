export default class {
    constructor(game, player, sprite, health) {
        this.game = game;
        this.player = player;
        this.alive = true;

        let arrXY = this.game.rnd.pick([[0, this.game.world.randomY], 
                                   [this.game.world.width, this.game.world.randomY],
                                   [this.game.world.randomX, 0],
                                   [this.game.world.randomX, this.game.world.height]]);  

        this.zombieSprite = this.game.add.sprite(arrXY[0], arrXY[1], sprite);
        this.zombieSprite.health = health;
        
        this.zombieSprite.scale.set(0.4);
        this.zombieSprite.animations.add('goingZombie', Phaser.Animation.generateFrameNames('goingZombie', 1, 11), 5, true);
        this.zombieSprite.anchor.set(0.5, 0.5);

        this.game.physics.enable(this.zombieSprite, Phaser.Physics.ARCADE);
        this.zombieSprite.body.bounce.x = 1;
        this.zombieSprite.body.bounce.y = 1;
        this.zombieSprite.enableBody = true;
        this.zombieSprite.moveDown();

        this.zombieSprite.body.immovable = false;
        this.zombieSprite.body.collideWorldBounds = true;
        this.zombieSprite.body.maxVelocity.setTo(50, 50);
        this.zombieSprite.animations.play('goingZombie');

        
      }

    
    update() {
        
        this.zombieSprite.rotation = this.game.physics.arcade.angleBetween(this.zombieSprite, this.player);
        this.game.physics.arcade.velocityFromRotation(this.zombieSprite.rotation, 15, this.zombieSprite.body.velocity);
    };

    
}