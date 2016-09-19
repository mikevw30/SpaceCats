'use strict';

var Ship = function(game, x, y, frame) {  
	Phaser.Sprite.call(this, game, x, y, 'ship', frame);
	this.name = 'ship';
  
	this.anchor.setTo(0.5);
	this.game.physics.arcade.enableBody(this);
	//this.body.gravity.y = 1000;
	this.game.add.existing(this);
	this.body.immovable = true;
	this.body.collideWorldBounds = true;
};

Ship.prototype = Object.create(Phaser.Sprite.prototype);  
Ship.prototype.constructor = Ship;

Ship.prototype.update = function() {
	
	var gX = gyro.getOrientation().x;
	var gY = gyro.getOrientation().y;

	var accFilter = 0.0001;
	
	if(Math.abs(gX) >= accFilter){
		if(gX < 0){
			this.body.velocity.x = -200;
		}
		else{
			this.body.velocity.x = 200;
		}
	}
	else{
		this.body.velocity.x = 0;
	}
	if(Math.abs(gY) >= accFilter){
		if(gY < 0){
			this.body.velocity.y = 200;
		}
		else{
			this.body.velocity.y = -200;
		}
//		this.body.velocity.y += gY;
	}
	else{
		this.body.velocity.y = 0;
	}
};

Ship.prototype.jump = function() {};
