'use strict';

var Ship = function(game, x, y, frame) {  
	Phaser.Sprite.call(this, game, x, y, 'ship', frame);
	this.game.physics.arcade.enableBody(this);
	this.game.add.existing(this);

	this.name = 'ship';
	this.anchor.setTo(0.5);
	this.body.immovable = true;
	this.body.collideWorldBounds = true;
	this.body.maxVelocity.set(200);

	this.angle -=90;
	
	this.scale.setTo(2,2);
	
	this.weapon = game.add.weapon(30,'aquaball');
	this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    this.weapon.fireRate = 200;
    this.weapon.trackSprite(this, this.body.width, 0, true);
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
	
	if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
    {
        this.x -= 4;
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
    {
        this.x += 4;
    }

    if (game.input.keyboard.isDown(Phaser.Keyboard.UP))
    {
        this.y -= 4;
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN))
    {
        this.y += 4;
    }
};

Ship.prototype.jump = function() {};
