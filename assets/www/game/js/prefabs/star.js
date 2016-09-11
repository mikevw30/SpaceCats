'use strict';

var Star = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'star', frame);
  this.game.physics.arcade.enableBody(this);
  this.anchor.setTo(0.5, 0.5);
  this.name = 'star';

  this.body.allowGravity = false;
  this.game.add.existing(this);
  
  var speed = .1;
  
  var d1 = y; 
  var t1 = d1/speed;
  
  var d2 = (height-this.height/2);
  var t2 = d2/speed;

  var d3 = (height-this.height/2) - y;
  var t3 = d3/speed;
  
  var ran = game.rnd.integerInRange(1, 100);
  
  if(ran>50){
	  game.add.tween(this).to({y:0},t1,Phaser.Easing.Linear.NONE)
	  					  .to({y:height-this.height/2},t2,Phaser.Easing.Linear.NONE)
	  					  .to({y:y},t3,Phaser.Easing.Linear.NONE)
	  					  .loop(true).start();
  }
  else{
	  game.add.tween(this).to({y:height-this.height/2},t3,Phaser.Easing.Linear.NONE)
						  .to({y:0},t2,Phaser.Easing.Linear.NONE)
						  .to({y:y},t1,Phaser.Easing.Linear.NONE)
						  .loop(true).start();
  }
};

Star.prototype = Object.create(Phaser.Sprite.prototype);
Star.prototype.constructor = Star;

Star.prototype.update = function() {
	
};