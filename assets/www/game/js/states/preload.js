'use strict';

class Preload extends Phaser.State {

	constructor(){
		super();
		this.ready = false;
		this.loadingBar = null;
	}

	init(){
		this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
		this.scale.pageAlignHorizontally = true;
		this.game.forceSingleUpdate = true;
	}
	
	preload(){ 
		this.loadingBar = this.add.sprite(game.world.centerX,game.world.centerY,"loading");
		this.loadingBar.anchor.setTo(0.5);
		this.load.setPreloadSprite(this.loadingBar,0);
		
		this.game.time.advancedTiming = true;
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		
		this.loadData();
		this.onLoadComplete();
		
	} 
	
    create() {
    	console.log("Preload state start");
    	this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
    	this.scale.pageAlignHorizontally = true;
	}
    
	update(){
      if(!!this.ready) {
    	  console.log("preloader state finished");
          this.game.state.start('Menu');
        }
	}
	
    onLoadComplete() {
        this.ready = true;
    }
    
    loadData(){
		this.game.load.image("stars","game/assets/stars.jpg");
		this.game.load.image("ship","game/assets/thrust_ship.png");
		this.game.load.image("alien","game/assets/xenon2_ship.png");

		//bullets
		this.game.load.image("aquaball","game/assets/aqua_ball.png");
		this.game.load.image("redball","game/assets/red_ball.png");
        
        // Set the physics system
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        let star = [
                    '.....828.....',
                    '....72227....',
                    '....82228....',
                    '...7222227...',
                    '2222222222222',
                    '8222222222228',
                    '.72222222227.',
                    '..787777787..',
                    '..877777778..',
                    '.78778887787.',
                    '.27887.78872.',
                    '.787.....787.'
                  ];
        this.game.create.texture('star', star, 2, 2);
    }
};