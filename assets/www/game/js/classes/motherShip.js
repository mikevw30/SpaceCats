'use strict';
class MotherShip extends Phaser.Group {
	
	constructor(target, instances, spriteType){
		super(game, game.world, name);
		this.target = target;
		this.spriteType = spriteType;
		this.instances = instances;
		
		this.spawnPool();
		
		return this;
	}
	
	spawnPool(){
		if (this.instances > 0) { 
			let sprite;
			for (var i = 0; i < this.instances; i++) {
				sprite = this.add(new this.spriteType(this.game,-1000,-1000,null,this.target)); // Add new sprite
				sprite.kill();
			}
		}
	}
	
	addEnemyShip(key, numberInSpawn) {
		let numOfHoles = game.width / (16 * 2);

		let randomnumber = game.rnd.integerInRange(1, numOfHoles - 1);

		this.getInstance(randomnumber * (16 * 2) - (16 * 2) / 2, 1, 150);
	}
	
	getInstance(x, y, velocity) {
		let obj = this.getFirstExists(false);
	    if (!obj) {
	      obj = new this.spriteType(this.game,x,y,null,this.target);
	      this.add(obj, true);
	    }
	    obj.reset(x,y);
	    obj.body.velocity.y = velocity;
	    
	    return obj;
	}
};