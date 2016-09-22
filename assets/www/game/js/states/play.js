var Play = function(game){
	spriteNumber = null;
	number = 0;
	workingButtons = true;
	higher = true;
	score = 0;
	this.starfield;
	this.starEmitter;
};

Play.prototype = {
	preload: function() {
		this.game.time.advancedTiming = true;
	},
	create: function() { 
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		
		this.starField = new StarField(game, 0, 0, width, height);
  		this.game.add.existing(this.starField);

        this.ship = new Ship(this.game, game.world.centerX, game.world.centerY);
        
        this.game.input.onDown.add(this.ship.jump, this.ship);

        this.aliens = this.game.add.group();
        this.stars = this.game.add.group();
        this.starEmitter = this.game.add.emitter();
//        						      (keys, frames, quantity, collide, collideWorldBounds);
        this.starEmitter.makeParticles('star',null,50,true,false);
        
        this.starEmitter.checkWorldBounds = true;
        this.starEmitter.outOfBoundsKill = true;
        
        this.starEmitter.gravity.x = 0;
        this.starEmitter.gravity.y = 10;
        
        this.starEmitter.minParticleSpeed.set(-5, 50);
        this.starEmitter.maxParticleSpeed.set(5, 100);
        
        score = 0;
        this.labelScore = this.game.add.text(20, 20, "0",{ font: "30px Arial", fill: "#ffffff" }); 
//        this.info = this.game.add.text(game.world.centerX, 20, "info",{ font: "30px Arial", fill: "#ffffff" }); 
        
        this.timer = this.game.time.events.loop(1500, this.addRow, this);
    },

    update: function() {
        if (this.ship.y < 0 || this.ship.y > height){
        	this.endGame();
        }    	
        this.aliens.forEach(function(pipeGroup) {
        	this.game.physics.arcade.overlap(this.ship.weapon.bullets, pipeGroup, this.hitEnemy, null, this);
            this.game.physics.arcade.overlap(this.ship, pipeGroup, this.endGame, null, this);
        }, this);
        this.game.physics.arcade.overlap(this.ship, this.starEmitter, this.collectStar, null, this);
//        this.stars.forEach(function(starGroup) {
//        	this.game.physics.arcade.overlap(this.ship, starGroup, this.collectStar, null, this);
//        }, this);
//        this.info.text = "stars: "+this.starEmitter.countLiving() +
//        				 "fps: "+this.game.fps +
//        				 "\nenemy: "+this.aliens.countLiving();
        
    },
    
    hitEnemy: function(_bullet, _enemy) {
    	_bullet.kill();
    	_enemy.kill();
    	this.starEmitter.x = _enemy.x;
    	this.starEmitter.y = _enemy.y;
    	this.starEmitter.start(true, 10000, null, 10);
    },
    
    endGame: function() {
        this.game.state.start('GameOver',true,false,score);
    },

    collectStar: function(_ship,_star) {
    	_star.kill();
        score += 1;
        this.labelScore.text = score;
    },
    
    addRow: function() {
    	var pipeGroup = this.aliens.getFirstExists(false);
    	if(!pipeGroup) {
    		pipeGroup = new AlienGroup(this.game, this.aliens);  
    	}
//    	var starGroup = this.stars.getFirstExists(false);
//    	if(!starGroup) {
//    		starGroup = new StarGroup(this.game, this.stars);  
//    	}
    },
    //debug
    render: function() {
//    	game.debug.spriteInfo(this.ship, 30, 30);
        this.ship.weapon.debug(30,this.game.world.height-30);
        this.game.debug.text('fps: ' + (this.game.time.fps), 30,this.game.world.height-100);
        this.game.debug.text('this.aliens.countLiving: ' + (this.aliens.countLiving()), 30,this.game.world.height-85);
        this.game.debug.text('this.aliens.countDead: ' + (this.aliens.countDead()), 30,this.game.world.height-70);
        this.game.debug.text('this.aliens.length: ' + (this.aliens.length), 30,this.game.world.height-55);

    }
};