'use strict';

class GameText extends Phaser.Text {

	constructor(x,y,text,style,state){
		super(game, x, y, text, style);
		this.state = state;
		this.config();
		
		return this;
	}
	
	config(){
  		game.stage.addChild(this);
  		this.anchor.set(0.5);
  		this.inputEnabled = true;
  		this.events.onInputDown.add(this.goToState, this);
	}
	
	goToState(){
		this.kill();
		game.state.start(this.state);
	}
};