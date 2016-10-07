'use strict';

class Alien extends Phaser.Sprite{
	
	constructor(game, x, y, frame, target){
		super(game, x, y, 'alien', frame);
		
		this.target = target || {x:this.x, y:this.game.world.height};
		this.config();
		this.addWeapon();
		this.addMovement();
	}
	
	config(){
		this.game.physics.arcade.enableBody(this);
		this.game.add.existing(this);
		this.name = 'alien';
		this.anchor.setTo(0.5);
		this.checkWorldBounds = true;
		this.outOfBoundsKill = true;
		this.body.allowGravity = false;
		
	}
	
	addMovement(){
		this.body.velocity.y = 150;
	}
	
	addWeapon(){
		this.weapon = game.add.weapon(2,'redball');
		this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
		this.weapon.fireRate = 1500;
		this.weapon.trackSprite(this, this.body.width, 0, true);
	}
	
	
	update(){
		if(this.alive){
			this.weapon.fire(this, this.target.x, this.target.y);
		}
	}
}


