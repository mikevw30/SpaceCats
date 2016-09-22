'use strict';

var Alien = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'alien', frame);
  this.game.physics.arcade.enableBody(this);
  this.game.add.existing(this);

  this.name = 'alien';
  this.anchor.setTo(0.5);
  this.checkWorldBounds = true;
  this.outOfBoundsKill = true;
  
  this.body.velocity.y = 150;
  this.body.allowGravity = false;
  
  this.weapon = game.add.weapon(30,'redball');
  this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
  this.weapon.fireRate = 2000;
  this.weapon.trackSprite(this, this.body.width, 0, true);
  
};

Alien.prototype = Object.create(Phaser.Sprite.prototype);
Alien.prototype.constructor = Alien;

Alien.prototype.update = function() {
	if(this.alive){
		this.weapon.fire(this, this.x, this.game.world.height);
	}
};

Alien.prototype.kill = function() {
    this.alive = false;
    this.exists = false;
    this.visible = false;
    this.events.destroy();
    if (this.events) {
        this.events.onKilled$dispatch(this);
    }
    return this;
};


//function MyGroup() { 
//	Phaser.Group.apply(this, arguments);
//}
//MyGroup.prototype = Object.create(Phaser.Group.prototype);
//MyGroup.prototype.constructor = MyGroup;
//// if you override, make sure to call the parent function.
//MyGroup.prototype.update = function () {   
//	Phaser.Group.prototype.update.apply(this, arguments);
//};
