var Menu = function(game){	
	this.height = window.innerHeight;
	this.width = window.innerWidth;
	this.ship = null;
	this.statField;
};

Menu.prototype = {
  	create: function(){
  		this.starfield = new StarField(game, 0, 0, width, height);
  		this.game.add.existing(this.starfield);

  		var style = { font: "65px Arial", fill: "#e6e6e6", align: "center" };
  		
 	    var titleText = game.add.text(game.world.centerX, game.world.centerY-game.world.centerY/2, "flappyShip", style);
 	    titleText.anchor.set(0.5);
	    
	    var playText = game.add.text(game.world.centerX, game.world.centerY, "Play", style);
	    playText.inputEnabled = true;
	    playText.events.onInputDown.add(this.playTheGame, this);
	    playText.anchor.set(0.5);
	    
	    var style = { font: "25px Arial", fill: "#e6e6e6", align: "center" };
	    var tapText = game.add.text(game.world.centerX, game.world.centerY+game.world.centerY/2, "Tap to make the ship jump\n?????\nProfit!", style);
	    tapText.anchor.set(0.5);
		
	    this.ship = new Ship(this.game, (width/2)-16, height/2);
	    
	    var gyroTextStyle = { font: "10px Arial", fill: "#e6e6e6", align: "center" };
	    this.gyroText = game.add.text(10, 10, "x: "+gyro.getOrientation().x  +"\ny: "+gyro.getOrientation().y, gyroTextStyle);

//	    gyro.frequency = 10;
		// start gyroscope detection
//		gyro.startTracking(function(o){});
	    
//	    this.game.input.onDown.add(this.ship.jump, this.ship);
	    
	    console.log("menu state");
	},
	update: function(){
	},
	playTheGame: function(){
		this.game.state.start("Play");
	}
};