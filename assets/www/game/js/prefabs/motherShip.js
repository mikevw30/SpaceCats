'use strict';

var MotherShip = function(game) {
	Phaser.Group.call(this, game);
	
//	this.MAX_ENEMIES_PER_TYPE = 1;
//	
//	for (var i = 0; i < this.MAX_ENEMIES_PER_TYPE; i++) {
//	    var obstacle = new Alien(game, -1000,-1000,null);
//	    this.add(obstacle);
//	}
};

MotherShip.prototype = Object.create(Phaser.Group.prototype);
MotherShip.prototype.constructor = MotherShip;

MotherShip.prototype.addEnemyShip = function(key, numberInSpawn) {
	
	var numOfHoles = window.width / (16 * 3);

	var arr = [];
	while (arr.length < numOfHoles) {
		var randomnumber = game.rnd.integerInRange(0, numOfHoles - 1);
		var found = false;
		for (var i = 0; i < arr.length; i++) {
			if (arr[i] == randomnumber) {
				found = true;
				break;
			}
		}
		if (!found)
			arr[arr.length] = randomnumber;
	}

	for (var i = 0; i < numberInSpawn; i++) {
		if (key == "alien1"){
			this.getInstance(arr[i] * (16 * 3) - (16 * 3) / 2, 1,150);
		}
	}

};

MotherShip.prototype.getInstance = function(x, y,velocity) {
	var obj = this.getFirstExists(false);
    if (!obj) {
      obj = new Alien(this.game,x,y,null);
      this.add(obj, true);
    }
    obj.revive();
    obj.x = x;
    obj.y = y;
    obj.body.velocity.y = velocity;
//    obj.checkWorldBounds = true;
//    obj.outOfBoundsKill = true;
    
    return obj;
};