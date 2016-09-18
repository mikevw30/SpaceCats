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

	if(Math.abs(gX) >=0.5){
		this.body.velocity.x -= gX;
	}
	else{
		this.body.velocity.x = 0;
	}
	if(Math.abs(gY) >=0.5){
		this.body.velocity.y += gY;
	}
	else{
		this.body.velocity.y = 0;
	}
};

Ship.prototype.jump = function() {
//	this.body.velocity.y = -350;
//	this.game.add.tween(this).to({angle: -20}, 100).start(); 
};
