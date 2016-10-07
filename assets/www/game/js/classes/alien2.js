'use strict';

class Alien2 extends Phaser.Sprite{
	
	constructor(game, x, y, frame, target){
		super(game, x, y, 'alien2', frame);
		
		this.target = target || {x:this.x, y:this.game.world.height};
		this.config();
		this.addWeapon();
		this.addMovement();
		
		return this;
	}
	
	config(){
		this.game.physics.arcade.enableBody(this);
		this.game.add.existing(this);
		this.name = 'alien2';
		this.scale.setTo(.5,.5); 
		this.anchor.setTo(0.5);
		this.checkWorldBounds = true;
		this.outOfBoundsKill = true;
		this.body.allowGravity = false;
	}
	
	addMovement(){
		this.body.velocity.y = 150;
	}
	
	addWeapon(){
		this.weapon = game.add.weapon(4,'redball');
		this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
		this.weapon.fireRate = 250;
		this.weapon.trackSprite(this, 0, 0);
	}
	
	update(){
		if(this.alive){
			this.weapon.fire(this, this.target.x, this.target.y);
		}
	}
};