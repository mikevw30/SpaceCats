'use strict';

var Ship = function(game, x, y, frame) {  
	Phaser.Sprite.call(this, game, x, y, 'ship', frame);
	this.name = 'ship';
  
	this.anchor.setTo(-0.2, 0.5);
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

//	this.gyroText.text =  "x: "+gX +"\ny: "+gY;
	
	if(Math.abs(gX) >=1){
		this.ship.body.velocity.x -= gX;
	}
	if(Math.abs(gY) >=1){
		this.ship.body.velocity.y += gY;
	}
	
	if(Math.abs(gX) <=1 && Math.abs(gY) <=1){
		this.body.velocity.x = 0;
		this.body.velocity.y = 0;
	}
	
//    if (this.angle < 20){
//        this.angle += 1; 
//    }
};

Ship.prototype.jump = function() {
//	this.body.velocity.y = -350;
//	this.game.add.tween(this).to({angle: -20}, 100).start(); 
};
