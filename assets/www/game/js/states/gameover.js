'use strict';

class GameOver extends Phaser.State {

	constructor(){
		super();
	}
	
	init(score){
		this.score = score;
	}
	
	create(){
		let starfield = new StarField(game, 0, 0, game.width, game.height);
  		
  		let style = { font: "50px Arial", fill: "#e6e6e6", align: "center" };
  		let gameOverText = new GameText(game.world.centerX, game.world.centerY, "Your Score: "+this.score+"\nPlay Again", style, "Play");
	}
};