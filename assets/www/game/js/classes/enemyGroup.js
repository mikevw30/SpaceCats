'use strict';
class EnemyGroup extends Phaser.Group {
	
	constructor(target){
		super(game, game.world, name);
		this.game = game;
		
        this.motherShip1 = new MotherShip(target,2,Alien);
        this.motherShip2 = new MotherShip(target,2,Alien2);
		
        this.addGroup(this.motherShip1);
        this.addGroup(this.motherShip2);
        
		return this;
	}
	
	addGroup(enemyPool){
		this.add(enemyPool)
	}
	
	spawnEnemy(){
      let ranNum = game.rnd.integerInRange(1, 3);
      if(ranNum == 1)
	      this.motherShip2.addEnemyShip("alien2",1);
      else
    	  this.motherShip1.addEnemyShip("alien1",1);
	}
	
	getAlive(){
		let aliveCount = 0;
		this.forEach(function(enemyPool){
			aliveCount += enemyPool.countLiving();
		},this);
		return aliveCount;
	}
	getDead(){
		let aliveCount = 0;
		this.forEach(function(enemyPool){
			aliveCount += enemyPool.countDead();
		},this);
		return aliveCount;
	}
	
};