var Play = function(game){
	spriteNumber = null;
	number = 0;
	workingButtons = true;
	higher = true;
	score = 0;
	this.starfield;
	this.starEmitter;
	ship = null;
	this.debug = true;
};

Play.prototype = {
	preload: function() {
		if(this.debug)
			this.game.time.advancedTiming = true;
	},
	create: function() { 
		//background
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		this.starField = new StarField(game, 0, 0, width, height);
  		this.game.add.existing(this.starField);

  		//player ship as global variable.
        ship = new Ship(this.game, game.world.centerX, game.world.centerY);

        //groups
        this.aliens = this.game.add.group();
        this.stars = this.game.add.group();
        
        //star spawner on enemy kill
        this.starEmitter = this.game.add.emitter();
        this.starEmitter.makeParticles('star',null,30,true,false);
        this.starEmitter.checkWorldBounds = true;
        this.starEmitter.outOfBoundsKill = true;
        this.starEmitter.gravity.x = 0;
        this.starEmitter.gravity.y = 10;
        this.starEmitter.minParticleSpeed.set(-5, 50);
        this.starEmitter.maxParticleSpeed.set(5, 100);
        
        score = 0;
        this.labelScore = this.game.add.text(20, 20, "0",{ font: "30px Arial", fill: "#ffffff" }); 
        
        this.timer = this.game.time.events.loop(1500, this.addRow, this);
    },

    update: function() {
        if (ship.y < 0 || ship.y > height){
        	this.endGame();
        }    	
        this.aliens.forEach(function(alienGroup) {
        	var remove = true;
        	alienGroup.forEach(function(a){
        		this.game.physics.arcade.overlap(ship, a.weapon.bullets, this.endGame, null, this);
        		if(a.alive){
        			remove = false;
        		}
        	}, this);
        	//remove 
        	if(remove){
        		this.aliens.remove(alienGroup);
        	}
        	else{
        		this.game.physics.arcade.overlap(ship, alienGroup, this.endGame, null, this);
        		this.game.physics.arcade.overlap(ship.weapon.bullets, alienGroup, this.hitEnemy, null, this);
        	}
        }, this);
        this.game.physics.arcade.overlap(ship, this.starEmitter, this.collectStar, null, this);
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
    	var alienGroup = this.aliens.getFirstExists(false);
    	if(!alienGroup) {
    		alienGroup = new AlienGroup(this.game, this.aliens);  
    	}
    },
    render: function() {
    	if(this.debug){
	        ship.weapon.debug(30,this.game.world.height-55);
	        this.game.debug.text('Debug Info', 30,this.game.world.height-115);
	        this.game.debug.text('fps: ' + (this.game.time.fps), 30,this.game.world.height-100);
	        this.game.debug.text('this.aliens.aliveWaveCount: ' + (this.aliens.countLiving()), 30,this.game.world.height-85);
    	}
    }
};