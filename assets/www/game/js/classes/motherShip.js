'use strict';

var MotherShip = function(player) {
	Phaser.Group.call(this, game);
	
	this.player = player;
	
	this.MAX_ENEMIES_PER_TYPE = 5;
	
	for (var i = 0; i < this.MAX_ENEMIES_PER_TYPE; i++) {
	    var obstacle = new Alien(game, -1000,-1000,null,player);
	    obstacle.kill();
	    this.add(obstacle);
	}
};

MotherShip.prototype = Object.create(Phaser.Group.prototype);
MotherShip.prototype.constructor = MotherShip;

MotherShip.prototype.addEnemyShip = function(key, numberInSpawn) {
	
	var numOfHoles = game.width / (16 * 2);

	var randomnumber = game.rnd.integerInRange(1, numOfHoles - 1);

	if (key == "alien1"){
		this.getInstance(randomnumber * (16 * 2) - (16 * 2) / 2, 1, 150);
	}

};

MotherShip.prototype.getInstance = function(x, y,velocity) {
	var obj = this.getFirstExists(false);
    if (!obj) {
      obj = new Alien(this.game,x,y,null,this.target);
      this.add(obj);
    }
    obj.reset(x,y);
    obj.body.velocity.y = velocity;
    
    return obj;
};