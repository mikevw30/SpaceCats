'use strict';
function Boot(game) {}

Boot.prototype = {
  init: function(){
	  game.scale.forceOrientation(false, true);
  },
  preload: function() {
      this.game.load.image("loading","game/assets/loading.png");
  },
  create: function() {
	  console.log("boot state");
	  this.game.state.start("Preload");
  },
  update: function() {
  }
};
