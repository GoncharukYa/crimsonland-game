class Boot extends Phaser.State {

	preload() {
        this.game.load.image('loading', '../assets/loading.png' );
        this.game.load.image('button-start-game', '../assets/button-start-game.png');
        this.game.load.image('crimsonland-art', '../assets/crimsonland-art.jpg' );
        this.game.load.audio('intro', '../assets/music/intro.mp3');
	}

	create() {
        
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
		this.game.state.start("Preload");
	}

}
export default Boot;
