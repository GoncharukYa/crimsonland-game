class Preload extends Phaser.State {

	preload() {
        this.intro = this.game.add.audio('intro');
        this.intro.loopFull();

        let art = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'crimsonland-art');
        art.anchor.setTo(0.5,0.61);
        art.scale.setTo(1.1);

        let loadingBar = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY + 300, 'loading');
        loadingBar.anchor.setTo(0.5,0.5);
        this.game.load.setPreloadSprite(loadingBar);
        
		this.game.load.atlas('player-body-handgun', '../../assets/player/handgun/move/survivor-move_handgun.png', '../assets/player/handgun/move/survivor-move_handgun.json');
        this.game.load.atlas('player-feet', '../../assets/player/feet/feet.png', '../assets/player/feet/feet.json');
        this.game.load.image('bullet', '../../assets/player/shmup-bullet.png');
        this.game.load.atlas('zombie1', '../../assets/zombie/zombie1/zombie1.png', '../assets/zombie/zombie1/zombie1.json');
        this.game.load.image('earth', '../../assets/scorched_earth.png');
        this.game.load.image('blood', '../../assets/blood.png');
        this.game.load.audio('theme', '../../assets/music/theme.mp3');
        this.game.load.audio('pistol-shot', '../../assets/shots/pistol.wav');
        this.game.load.audio('zombie-pain', '../../assets/music/zombie_pain.mp3');
        this.game.load.bitmapFont('upheaval', 'assets/fonts/upheaval/font.png', 'assets/fonts/upheaval/font.fnt');
	


        let playButton = this.game.add.button(this.game.world.centerX, this.game.world.centerY + 50,'button-start-game',this.playGame,this);
        playButton.anchor.setTo(0.5,0.5);
        playButton.scale.setTo(0.7);
	}

	playGame() {
        this.intro.stop();
		this.game.state.start("Main");
	}

}

export default Preload;