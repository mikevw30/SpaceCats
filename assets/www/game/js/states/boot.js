'use strict';

class Boot extends Phaser.State {
	
	init(){
		game.scale.forceOrientation(false, true);
	}
	
	preload(){
		this.game.load.image("loading","game/assets/loading.png");
	}
	
	create(){
	  console.log("boot state");
	  this.game.state.start("Preload");
	}
	
}; 