'use strict';

var Alien = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'alien', frame);
  this.anchor.setTo(0.5, 0.5);
  this.game.physics.arcade.enableBody(this);
  this.name = 'alien';

  this.body.allowGravity = false;
//  this.body.immovable = true;
  this.game.add.existing(this);
  this.checkWorldBounds = true;
  this.outofBoundsKill = true;
  
  
//  this.weapon = game.add.weapon(30,'aquaball');
//  this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
//  this.weapon.fireRate = 200;
//  this.weapon.trackSprite(this, this.body.width, 0, true);
  
};

Alien.prototype = Object.create(Phaser.Sprite.prototype);
Alien.prototype.constructor = Alien;

Alien.prototype.update = function() {
	this.weapon.fireAt(50,50);
};