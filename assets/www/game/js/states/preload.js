var Preload = function(game){
	 this.ready = false;
	 this.loadingBar = null;
};

Preload.prototype = {
	init: function(){
		this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
		this.scale.pageAlignHorizontally = true;
		this.game.forceSingleUpdate = true;
	},
	preload: function(){ 
		this.loadingBar = this.add.sprite(game.world.centerX,game.world.centerY,"loading");
		this.loadingBar.anchor.setTo(0.5);
		this.load.setPreloadSprite(this.loadingBar,0);
		
		this.loadData();
		this.onLoadComplete();
		
	},
    create: function() {
    	console.log("Preload state start");
    	this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
    	this.scale.pageAlignHorizontally = true;
	},
	update: function(){
      if(!!this.ready) {
    	  console.log("preloader state finished");
          this.game.state.start('Menu');
        }
	},
    onLoadComplete: function() {
        this.ready = true;
    },
    loadData: function(){
		this.game.load.spritesheet("numbers","game/assets/numbers.png",100,100);
		this.game.load.image("gametitle","game/assets/gametitle.png");
		this.game.load.image("play","game/assets/play.png");
		this.game.load.image("gameover","game/assets/gameover.png");
		this.game.load.image("stars","game/assets/stars.jpg");
		this.game.load.image("ship","game/assets/thrust_ship.png");

		//bullets
		this.game.load.image("aquaball","game/assets/aqua_ball.png");
        
        // Set the physics system
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

//        var ship = [
//                    '.....3..........',
//                    '.....2..........',
//                    '.....2..........',
//                    '.....2..........',
//                    '.....2..........',
//                    '.....222222FFFF.',
//                    '.....2D22222222F',
//                    '366F2DDDD2222222',
//                    '633F2DDDD2222222',
//                    '.....2D22222222F',
//                    '.....222222FFFF.',
//                    '.....2..........',
//                    '.....2..........',
//                    '.....2..........',
//                    '.....2..........',
//                    '.....3..........'
//                  ]; 
//        var ship = [
//                    '......F22F......',
//                    '.....F2222F.....',
//                    '.....F2222F.....',
//                    '.....F2222F.....',
//                    '.....F2222F.....',
//                    '....F222222F....',
//                    '....F222222F....',
//                    '...3222DD2223...',
//                    '..32222DD22223..',
//                    '.32222DDDD22223.',
//                    '3222222DD2222223',
//                    '....F222222F....',
//                    '.....FFFFFF.....',
//                    '......3636......',
//                    '......3636......',
//                    '.......36.......',
//                    ]; 
        
//        this.game.create.texture('ship', ship, 3, 3);  
        
        var alien = [
                     '....DDDDDDDD....',
                     '...DDEEDDDDDD...',
                     '..DDDEEDDDDDDD..',
                     '..DDDDDDDDDDDD..',
                     '..DDDD5555DDDD..',
                     '..DDD555555DDD..',
                     '..DDD555555DDD..',
                     '..DDD555555DDD..',
                     '..334244333333..',
                     '.33344443333333.',
                     '3333444433333333',
                     '....5...5..5....',
                     '...5....5...5...',
                     '.66....66....66.',
                     '.66....66....66.'
                   ];
        this.game.create.texture('alien', alien, 3, 3);
        
        var star = [
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
        this.game.create.texture('star', star, 3, 3);
    }
};