class GameOver extends Phaser.State {

    init(score){
		this.intro = this.game.add.audio('intro');
        this.intro.loopFull();

        let art = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'crimsonland-art');
        art.anchor.setTo(0.5,0.61);
        art.scale.setTo(1.1);

        this.wasted = this.game.add.bitmapText(this.game.world.centerX-300, 150, 'upheaval', 'WASTED', 150);
        this.wasted.tint = 0x68f442;
        this.scoreText = this.game.add.bitmapText(this.game.world.centerX-450, 50, 'upheaval', 'Zombies killed: 0', 100);
        this.scoreText.setText('Zombies killed: '+score);
        
        let playButton = this.game.add.button(this.game.world.centerX, this.game.world.centerY + 50,'button-start-game',this.playGame,this);
        playButton.anchor.setTo(0.5,0.5);
        playButton.scale.setTo(0.7);
	}

	

	playGame() {
        this.intro.stop();
		this.game.state.start("Main");
	}

}

export default GameOver;