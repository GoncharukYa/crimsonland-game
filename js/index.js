import Boot from './states/Boot.js';
import Preload from './states/Preload.js';
import Main from './states/Main.js';
import GameOver from './states/GameOver.js';
 
class Game extends Phaser.Game {
 
    constructor() {
 
        super(window.innerWidth, window.innerHeight, Phaser.AUTO, 'content');
 
        this.state.add('Boot', Boot, false);
        this.state.add('Preload', Preload, false);
        this.state.add('Main', Main, false);
        this.state.add('GameOver', GameOver, false);
 
        this.state.start('Boot');
    }
 
}
 
new Game();