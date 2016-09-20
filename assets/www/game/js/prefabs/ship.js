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
	
	var gX = (gyro.getOrientation().x + gyro.getOrientation().x + gyro.getOrientation().x) / 3;
	var gY = (gyro.getOrientation().y + gyro.getOrientation().y + gyro.getOrientation().y) / 3;

	var accFilter = 1;
	var maxShipSpeed = 150;
	
	if(Math.abs(gX) >= accFilter){
		if(Math.abs(this.body.velocity.x) < maxShipSpeed){
			if(gX<0)
				this.body.velocity.x += 5;
			else
				this.body.velocity.x -= 5;
		}
	}
	else{
		this.body.velocity.x = 0;
	}
	if(Math.abs(gY) >= accFilter){
		if(Math.abs(this.body.velocity.y) < maxShipSpeed){
			if(gY<0)
				this.body.velocity.y -= 5;
			else
				this.body.velocity.y += 5;
		}
	}
	else{
		this.body.velocity.y = 0;
	}
};

Ship.prototype.jump = function() {};
