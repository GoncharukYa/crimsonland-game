export default class {
    constructor(game, sprite) {
        this.game = game;

        this.alive = true;

        

        const X = game.world.centerX;
        const Y = game.world.centerY;

        this.hero = this.game.add.group();
        this.hero.health = 100; 

        this.feet = game.add.sprite(X, Y, 'player-feet');
        this.body = game.add.sprite(X, Y, 'player-body-handgun');

        
        
        this.feet.scale.set(0.2);
        this.body.scale.set(0.2);

        this.feet.anchor.setTo(0.5, 0.5);
        this.body.anchor.setTo(0.5, 0.5);
        
        this.feet.animations.add('run', Phaser.Animation.generateFrameNames('run', 0, 19), 20, true);
        this.body.animations.add('move', Phaser.Animation.generateFrameNames('survivor-move_handgun_', 0, 19), 20, true);
    
        this.hero.add(this.feet);
        this.hero.add(this.body);

        this.game.physics.enable( this.hero, Phaser.Physics.ARCADE, true);


        
        this.feet.body.drag.set(1);
        this.feet.body.immovable = true;
        this.feet.body.maxVelocity.setTo(150, 150);
        this.feet.body.collideWorldBounds = true;
        

        this.feet.bringToTop();
        this.body.bringToTop();

        

        this.cursors = game.input.keyboard.createCursorKeys();
        this.wasd = {
            up: this.game.input.keyboard.addKey(Phaser.Keyboard.W),
            down: this.game.input.keyboard.addKey(Phaser.Keyboard.S),
            left: this.game.input.keyboard.addKey(Phaser.Keyboard.A),
            right: this.game.input.keyboard.addKey(Phaser.Keyboard.D),
        };
      }

    
    update() {
        
        this.feet.body.velocity.x = 0;
        this.feet.body.velocity.y = 0;
    
        if ( (this.cursors.left.isDown) || (this.wasd.left.isDown) )
        {
            this.feet.angle -= 4;
            
        }
        else if ( (this.cursors.right.isDown) || (this.wasd.right.isDown))
        {
            this.feet.angle += 4;
            
        }
    
        if ( (this.cursors.up.isDown) || (this.wasd.up.isDown))
        {
            //  The speed we'll travel at
            this.currentSpeed = 100;
            this.feet.animations.play('run');
            this.body.animations.play('move');
        }
        else
        {
            this.feet.animations.stop();
            this.body.animations.stop();
            if ( this.currentSpeed > 0)
            {
                this.currentSpeed -= 50;
            }
        }
    
        if ( this.currentSpeed > 0)
        {
            this.game.physics.arcade.velocityFromRotation( this.feet.rotation,  this.currentSpeed,  this.feet.body.velocity);
        }
    
    
        //  Position all the parts and align rotations
        this.body.x =  this.feet.x;
        this.body.y =  this.feet.y;
    
        this.body.rotation =  this.game.physics.arcade.angleToPointer( this.body);
    
    };

    
}