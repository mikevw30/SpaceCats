'use strict';

var AlienGroup = function(game, parent) {
  Phaser.Group.call(this, game, parent);
  
  var numOfHoles = window.width/(16*3);
	
  var arr = [];
  while(arr.length < numOfHoles){
    var randomnumber=game.rnd.integerInRange(0, numOfHoles-1);;
    var found=false;
    for(var i=0;i<arr.length;i++){
  	if(arr[i]==randomnumber){found=true;break;}
    }
    if(!found)arr[arr.length]=randomnumber;
  }
  
  for(var i = 0;i<2;i++){
	  this.add(new Alien(game, arr[i]*(16*3)-(16*3)/2, 0));   
  }

  this.setAll('body.velocity.y', 200);
};

AlienGroup.prototype = Object.create(Phaser.Group.prototype);
AlienGroup.prototype.constructor = AlienGroup;

AlienGroup.prototype.update = function() {
};
