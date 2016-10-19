'use strict';
class RewardPool extends Phaser.Group {
	
	constructor(instances, spriteType){
		super(game, game.world, name);
		this.spriteType = spriteType;
		this.instances = instances;
		this.spawnPool();
		
		return this;
	}
	
	spawnPool(){
		if (this.instances > 0) { 
			let sprite;
			for (var i = 0; i < this.instances; i++) {
				sprite = this.add(new this.spriteType(game,-1000,-1000)); // Add new sprite
				sprite.kill();
			}
		}
	}
	
	addEnemyShip(key, numberInSpawn) {
		this.getInstance(50,50, 150);
	}
	
	getInstance(x, y, velocity) {
		let obj = this.getFirstExists(false);
	    if (!obj) {
	      obj = new this.spriteType(this.game,x,y);
	      this.add(obj, true);
	    }
	    obj.reset(x,y);
	    obj.body.velocity.y = velocity;
	    
	    return obj;
	}
};