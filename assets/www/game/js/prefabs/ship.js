'use strict';

var Ship = function(game, x, y, frame) {  
	Phaser.Sprite.call(this, game, x, y, 'ship', frame);
	this.name = 'ship';
  
	this.anchor.setTo(-0.2, 0.5);
	this.game.physics.arcade.enableBody(this);
	//this.body.gravity.y = 1000;
	this.game.add.existing(this);
	this.body.immovable = true;
  
	gyro.frequency = 10;
	// start gyroscope detection
	gyro.startTracking(function(o) {
	     // updating player velocity
	     this.body.velocity.x += o.gamma/20;
	     this.body.velocity.y += o.beta/20;
	});
  
};

Ship.prototype = Object.create(Phaser.Sprite.prototype);  
Ship.prototype.constructor = Ship;

Ship.prototype.update = function() {
    if (this.angle < 20){
        this.angle += 1; 
    }
};

Ship.prototype.jump = function() {
//	this.body.velocity.y = -350;
	this.game.add.tween(this).to({angle: -20}, 100).start(); 
};
