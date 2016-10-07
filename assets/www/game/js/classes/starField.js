'use strict';

class StarField extends Phaser.TileSprite {

	constructor(game,x,y,width,height){
		super(game, x, y, width, height, "stars");
		this.autoScroll(0,10);
		game.add.existing(this);
	}
	
	update() {
		this.tilePosition.y += .25;
	}
}


