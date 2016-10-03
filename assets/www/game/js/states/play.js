var Play = function(game){
	score = 0;
	this.starfield;
	this.starEmitter;
	ship = null;
	this.debug = false;
	this.motherShip;
};

Play.prototype = {
	preload: function() {
//		if(this.debug){
			this.game.time.advancedTiming = true;
//		}
	},
	create: function() { 
		//background
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		this.starField = new StarField(game, 0, 0, width, height);
  		this.game.add.existing(this.starField);

  		//player ship as global variable.
        ship = new Ship(this.game, game.world.centerX, game.world.centerY);

        //groups
        this.motherShip = new MotherShip(game);
        
        //star spawner on enemy kill
        this.starEmitter = this.game.add.emitter();
        this.starEmitter.makeParticles('star',null,20,true,false);
        this.starEmitter.checkWorldBounds = true;
        this.starEmitter.outOfBoundsKill = true;
        this.starEmitter.gravity.x = 0;
        this.starEmitter.gravity.y = 10;
        this.starEmitter.minParticleSpeed.set(-5, 50);
        this.starEmitter.maxParticleSpeed.set(5, 100);
        
        score = 0;
        this.labelScore = this.game.add.text(20, 20, "0",{ font: "30px Arial", fill: "#ffffff" }); 
        
        this.timer = this.game.time.events.loop(1000, this.addRow, this);
    },

    update: function() {
    	//using overlap() instead of collide() because the collide() applies physics that i don't need.
        this.game.physics.arcade.collide(ship, this.motherShip, this.endGame, null, this);
        this.motherShip.forEach(function(alienShip) {
        	this.game.physics.arcade.overlap(ship, alienShip.weapon.bullets, this.endGame, null, this);
        	this.game.physics.arcade.overlap(ship.weapon.bullets, alienShip.weapon.bullets, this.removeBullets, null, this);
        },this);
        this.game.physics.arcade.overlap(ship.weapon.bullets, this.motherShip, this.hitEnemy, null, this);
        this.game.physics.arcade.overlap(ship, this.starEmitter, this.collectStar, null, this);
    },
    
    hitEnemy: function(_bullet, _enemy) {
    	_bullet.kill();
    	_enemy.kill();
    	this.starEmitter.x = _enemy.x;
    	this.starEmitter.y = _enemy.y;
    	this.starEmitter.start(true, 10000, null, 2);
    	console.log("hit enemy");
    },
    
    endGame: function() {
        this.game.state.start('GameOver',true,false,score);
    },

    collectStar: function(_ship,_star) {
    	_star.kill();
        score += 1;
        this.labelScore.text = score;
    },
    
    removeBullets: function(_bullet1,_bullet2) {
    	_bullet1.kill();
    	_bullet2.kill();
    },
    
    addRow: function() {
	  this.motherShip.addEnemyShip("alien1",1);
    },
    render: function() {
    	if(this.debug){
    		this.game.debug.body(ship);
    		
    		this.motherShip.forEachAlive(function(eShip){
    				this.game.debug.body(eShip);
    			eShip.weapon.bullets.forEach(function(b){
    				this.game.debug.body(b);
    			},this);
    		},this);
    		
    	};
    	this.game.debug.text('Debug Info', 30,this.game.world.height-115);
    	this.game.debug.text('fps: ' + (this.game.time.fps), 30,this.game.world.height-100);
    	this.game.debug.text('this.aliens.alive: ' + (this.motherShip.countLiving()), 30,this.game.world.height-85);
    	this.game.debug.text('this.aliens.dead: ' + (this.motherShip.countDead()), 30,this.game.world.height-70);
    	ship.weapon.debug(30,this.game.world.height-55);
    }    
};