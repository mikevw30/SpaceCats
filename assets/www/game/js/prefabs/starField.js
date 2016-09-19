'use strict';

var StarField = function(game, x, y, width, height) {
  Phaser.TileSprite.call(this, game, x, y, width, height, "stars");
  this.autoScroll(0,10);
};

StarField.prototype = Object.create(Phaser.TileSprite.prototype);
StarField.constructor = StarField;

StarField.prototype.update = function() {
	this.tilePosition.y += .25;
};
