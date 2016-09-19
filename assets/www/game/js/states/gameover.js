var gameOver = function(game){
	height = window.innerHeight;
	width = window.innerWidth;
	this.starfield;
};

gameOver.prototype = {
//	init: function(score){
//	},
  	create: function(){
  		this.starfield = new StarField(game, 0, 0, width, height);
  		game.add.existing(this.starfield);
  		
  		var style = { font: "50px Arial", fill: "#e6e6e6", align: "center" };
  		var gameOverText = game.add.text(game.world.centerX, game.world.centerY, "Your Score: "+score+"\nPlay Again", style);
  		gameOverText.inputEnabled = true;
  		gameOverText.events.onInputDown.add(this.playTheGame, this);
  		gameOverText.anchor.set(0.5);
	},
	update: function(){
	},
	playTheGame: function(){
		this.game.state.start("Play");
	}
};