'use strict';
class StarEmitter extends Phaser.Particles.Arcade.Emitter {
	
	constructor(){
		super(game);
        
        this.makeParticles('star',null,20,true,false);
        this.checkWorldBounds = true;
        this.outOfBoundsKill = true;
        this.x = 0;
        this.y = 10;
        this.minParticleSpeed.set(-5, 50);
        this.maxParticleSpeed.set(5, 100);
        
		return this;
	}
	
	startEmitter(){
		this.start(true, 10000, null, 2);
	}
	
	setLocation(_x,_y){
		this.x = _x;
		this.y = _y;
	}
};