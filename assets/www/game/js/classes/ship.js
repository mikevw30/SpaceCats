'use strict';

class Ship extends Phaser.Sprite{
	
	constructor(game, x, y, frame){
		super(game, x, y, 'ship', frame);
		
		this.config();
		this.addWeapon();
		
		return this;
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
		this.weapon = game.add.weapon(50,'aquaball');
		this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
	    this.weapon.fireRate = 350;
	    this.weapon.fireAngle = Phaser.ANGLE_UP;
	    this.weapon.trackSprite(this, 0, -this.body.height/2, false);
	}
	
	update(){
		this.weapon.fire();
		
		this.playerMovementListener.listen();
	}
	
	powerUpFireRate(){
		if (this.weapon.fireRate >100)
			console.log("fireRate: "+this.weapon.fireRate);
			this.weapon.fireRate -= 25;
	}
};