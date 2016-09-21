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
	create: function() { 
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		
		this.starField = new StarField(game, 0, 0, width, height);
  		this.game.add.existing(this.starField);

        this.ship = new Ship(this.game, game.world.centerX, game.world.centerY);
        
        this.game.input.onDown.add(this.ship.jump, this.ship);

        this.aliens = this.game.add.group();
        this.stars = this.game.add.group();
        this.starEmitter = this.game.add.emitter(0, 0,50);
        this.starEmitter.makeParticles('star');
        
        score = 0;
        this.labelScore = this.game.add.text(20, 20, "0",{ font: "30px Arial", fill: "#ffffff" }); 
        
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
        
    },
    
    hitEnemy: function(_bullet, _enemy) {
    	_bullet.kill();
    	_enemy.kill();
    	this.starEmitter.x = _enemy.x;
    	this.starEmitter.y = _enemy.y;
    	this.starEmitter.start(true, 10000, null, 2);
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
    }
};