'use strict';

class FireRatePower extends Phaser.Sprite{
	
	constructor(game, x, y, frame){
		super(game, x, y, 'fireRatePower', frame);
		this.config();
		this.addMovement();
		
		return this;
	}
	
	config(){
		this.game.physics.arcade.enableBody(this);
		this.name = 'fireRatePower';
		this.game.add.existing(this);
		this.anchor.setTo(0.5);
		this.scale.setTo(.25);
		this.body.setSize(this.width,this.height);
		this.checkWorldBounds = true;
		this.outOfBoundsKill = true;
		this.body.allowGravity = false;
	}
	
	addMovement(){
		this.body.velocity.y = 50;
	}
	
	collect(playerShip){
		console.log("w: "+this.width + " h: "+this.height);
		playerShip.weapon.fireRate -= 25;
	}
};