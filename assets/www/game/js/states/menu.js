'use static';

class Menu extends Phaser.State{
	
	constructor(){
		super();
		
	}
	create(){
		let starfield = new StarField(game, 0, 0, game.width, game.height);
		
		var style = { font: "50px Arial", fill: "#e6e6e6", align: "center" };
		
		var titleText = game.add.text(game.world.centerX, game.world.centerY-game.world.centerY/2, "Space Cats 2", style);
		titleText.anchor.set(0.5);
		
		var playText = game.add.text(game.world.centerX, game.world.centerY, "Play", style);
		playText.inputEnabled = true;
		playText.events.onInputDown.add(this.playTheGame, this);
		playText.anchor.set(0.5);
		
		var style = { font: "25px Arial", fill: "#e6e6e6", align: "center" };
		
		var tapText = game.add.text(game.world.centerX, game.world.centerY+game.world.centerY/2, "Tilt to move\nCollect stars\nProfit!", style);
		tapText.anchor.set(0.5);
		
		let ship = new Ship(this.game, (game.width/2), game.height/2+game.height/8);
		
		console.log("menu state");
	}
	
	playTheGame(){
		this.game.state.start("Play");
	}
	
};