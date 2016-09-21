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
	this.angle -=90;
	this.scale.setTo(2,2);
	
	this.body.maxVelocity.set(200);
	
	
	
	
	this.weapon = game.add.weapon(30,'aquaball');
	this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    this.weapon.fireRate = 400;
//    this.weapon.bulletAngleVariance = 2;
//    this.weapon.bulletAngleOffset = 180;
//    
//    console.log(this.weapon.angle);
    
//    this.weapon.angle. = 180;
    
//    this.game.physics.arcade.velocityFromAngle(180, 200, this.weapon.velocity);
    
//    this.weapon.bulletWorldWrap = true;
    
    this.weapon.trackSprite(this, this.body.width, 0, true);
//    this.weapon.trackSprite(this, 0, 0, true);
};

Ship.prototype = Object.create(Phaser.Sprite.prototype);  
Ship.prototype.constructor = Ship;

Ship.prototype.update = function() {
	
	this.weapon.fire();
	
	var gX = (gyro.getOrientation().x + gyro.getOrientation().x + gyro.getOrientation().x) / 3;
	var gY = (gyro.getOrientation().y + gyro.getOrientation().y + gyro.getOrientation().y) / 3;

	var accFilter = 1;
	
	if(Math.abs(gX) >= accFilter){
		if(gX<0)
			this.body.velocity.x += 15;
		else
			this.body.velocity.x -= 15;
	}
	else{
		this.body.velocity.x = 0;
	}
	if(Math.abs(gY) >= accFilter){
		if(gY<0)
			this.body.velocity.y -= 15;
		else
			this.body.velocity.y += 15;
	}
	else{
		this.body.velocity.y = 0;
	}
};

Ship.prototype.jump = function() {};

Ship.prototype.render = function() {
	this.weapon.debug();
	
};
