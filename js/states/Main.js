import Zombie from '../Zombie.js';
import Player from '../Player.js'

class Main extends Phaser.State {

	create() {
        this.intro = this.game.add.audio('theme');
        this.intro.loopFull();

        this.zombiePain = this.game.add.audio('zombie-pain');

        let shot = this.game.add.audio('pistol-shot');

        let land = this.game.add.tileSprite(0, 0, window.innerWidth, window.innerHeight, 'earth');

        this.player = new Player(this.game, 'player-body-handgun');

        // Weapon for player
        this.weapon = this.game.add.weapon(7, 'bullet');
        this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
        
        this.weapon.bulletSpeed = 600;
        this.weapon.fireRate = 500;
        this.weapon.onFire.add( ()=>shot.play(),this );

        this.weapon.trackSprite(this.player.body, 25, 11, true);
        this.fireButton = this.game.input.activePointer;
        this.weapon.bullets.forEach((el)=>{el.damage(10)}, this);

        // Generate zombies 
        this.zombieArray = [];
        this.zombieGroup = this.game.add.group();
        this.timer = this.game.time.create(false);
        this.timer.loop(1000, this.spawnZombie, this);
        this.timer.start();

        // Count score
        this.scoreText = this.game.add.bitmapText(5, 5, 'upheaval', 'Zombies killed: 0', 50);
   
        this.score = 0;

        
	}
    update() {
        this.player.update();

        if (this.fireButton.isDown)
        {
            this.weapon.fire();
        }
        
        this.zombieArray.forEach(element => {element.update()});
        
        this.game.physics.arcade.collide(this.zombieGroup);
        this.game.physics.arcade.collide(this.player.hero, this.zombieGroup, this.zombieHitPlayer, null, this);
        this.game.physics.arcade.overlap(this.weapon.bullets, this.zombieGroup, this.bulletHitZombie, null, this);
        
    }

    spawnZombie() {
        let zombie  = new Zombie(this.game, this.player.body, 'zombie1', 10);
        this.zombieArray.push(zombie);
        this.zombieGroup.add(zombie.zombieSprite);
    }

    bulletHitZombie(bullet, zombie) {
        bullet.kill();
        this.zombiePain.play();
        zombie.damage(5);
        let bloodSpot = this.game.add.sprite(zombie.x, zombie.y, 'blood');
        bloodSpot.anchor.setTo(0.5, 0.5);
        bloodSpot.scale.set(0.1);
        bloodSpot.sendToBack().moveUp();
        

        if (!zombie.alive) {
        this.score++;
        this.scoreText.setText('Zombies killed: '+this.score);
        }
    }

    zombieHitPlayer(player) {
        player.kill();
        this.game.state.start("GameOver",true,false,this.score);
    }
    }

export default Main;