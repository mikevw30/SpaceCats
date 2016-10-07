'use strict';

class Game extends Phaser.Game { 

	constructor() {
		super(window.innerWidth, window.innerHeight, Phaser.AUTO, "game");
		this.addStates();
		this.start();
	} 
	
	addStates(){
		this.state.add("Boot",Boot);
		this.state.add("Preload",Preload);
		this.state.add("Menu",Menu);
		this.state.add("Play",Play);
		this.state.add("GameOver",GameOver);
	}
	
	start(){
		this.state.start("Boot");
	}
}

let game = new Game();