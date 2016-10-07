'use strict';

class Ship extends Phaser.Sprite{
	
	constructor(game, x, y, frame){
		super(game, x, y, 'ship', frame);
		
		this.config();
		this.addWeapon();
	}
	
	config(){
		this.playerMovementListener = new PlayerMovementListener(this);

		this.game.physics.arcade.enableBody(this);
		this.game.add.existing(this);

		this.name = 'ship';
		
		this.anchor.setTo(0.5);
		
		this.body.immovable = true;
		this.body.collideWorldBounds = true;
		this.body.maxVelocity.set(200);
		this.body.setCircle(this.body.width);
		this.body.offset.setTo(-this.body.width/4, -this.body.height/4 + 5);
		
		this.angle -=90;
		
		this.scale.setTo(1.5,1.5);
	}
	
	addWeapon(){
		this.weapon = game.add.weapon(20,'aquaball');
		this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
	    this.weapon.fireRate = 300;
	    this.weapon.trackSprite(this, this.body.width-20, 0, true);
	}
	
	update(){
		this.weapon.fire();
		this.playerMovementListener.listen();
	}
}
