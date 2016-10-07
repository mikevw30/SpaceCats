'use strict';

class Play extends Phaser.State{
	
	constructor(){
		super();
		this.score = 0;
		this.debug = false;
		this.ship;
		this.starEmitter;
		this.motherShip1;
		this.motherShip2;
		
		return this;
	}

	create() { 
		//background
		let starField = new StarField(game, 0, 0, game.width, game.height);

  		//player ship as global variable.
        this.ship = new Ship(this.game, game.world.centerX, game.world.centerY);

//        let target = {x: this.ship.x, y: this.ship.y};
        this.motherShip1 = new MotherShip(this.ship,5,Alien);
        this.motherShip2 = new MotherShip(this.ship,5,Alien2);
        
        //star spawner on enemy kill
        this.starEmitter = this.game.add.emitter();
        this.starEmitter.makeParticles('star',null,20,true,false);
        this.starEmitter.checkWorldBounds = true;
        this.starEmitter.outOfBoundsKill = true;
        this.starEmitter.x = 0;
        this.starEmitter.y = 10;
        this.starEmitter.minParticleSpeed.set(-5, 50);
        this.starEmitter.maxParticleSpeed.set(5, 100);
        
        this.score = 0;
        this.labelScore = this.game.add.text(20, 20, "0",{ font: "30px Arial", fill: "#ffffff" }); 
        
        this.timer = this.game.time.events.loop(1000, this.addRow, this);
    }

    update() {
    	//using overlap() instead of collide() because the collide() applies physics that i don't need.
        this.game.physics.arcade.collide(this.ship, this.motherShip, this.endGame, null, this);
        
        this.motherShip1.forEach(function(alienShip) {
        	this.game.physics.arcade.overlap(this.ship, alienShip.weapon.bullets, this.endGame, null, this);
//        	this.game.physics.arcade.overlap(this.ship.weapon.bullets, alienShip.weapon.bullets, this.removeBullets, null, this);
        },this);
        
        this.motherShip2.forEach(function(alienShip) {
        	this.game.physics.arcade.overlap(this.ship, alienShip.weapon.bullets, this.endGame, null, this);
//        	this.game.physics.arcade.overlap(this.ship.weapon.bullets, alienShip.weapon.bullets, this.removeBullets, null, this);
        },this);
        
        this.game.physics.arcade.overlap(this.ship.weapon.bullets, this.motherShip1, this.hitEnemy, null, this);
        this.game.physics.arcade.overlap(this.ship.weapon.bullets, this.motherShip2, this.hitEnemy, null, this);
        
        this.game.physics.arcade.overlap(this.ship, this.starEmitter, this.collectStar, null, this);
    }
    
    hitEnemy(_bullet, _enemy) {
    	_bullet.kill();
    	_enemy.kill();
    	this.starEmitter.x = _enemy.x;
    	this.starEmitter.y = _enemy.y;
    	this.starEmitter.start(true, 10000, null, 2);
//    	console.log("hit enemy");
    }
    
    endGame() {
        this.game.state.start('GameOver',true,false,this.score);
    }

    collectStar(_ship,_star) {
    	_star.kill();
        this.score += 1;
        this.labelScore.text = this.score;
    }
    
    removeBullets(_bullet1,_bullet2) {
    	_bullet1.kill();
    	_bullet2.kill();
    }
    
    addRow() {
      let ranNum = game.rnd.integerInRange(1, 3);
      if(ranNum == 1)
	      this.motherShip2.addEnemyShip("alien2",1);
      else
    	  this.motherShip1.addEnemyShip("alien1",1);
    }
    
    render() {
//    	if(this.debug){
//    		this.game.debug.body(ship);
    		
//    		this.motherShip.forEachAlive(function(eShip){
//    				this.game.debug.body(eShip);
//    			eShip.weapon.bullets.forEach(function(b){
//    				this.game.debug.body(b);
//    			},this);
//    		},this);
    		
//    	};
    	this.game.debug.text('Debug Info', 30,this.game.world.height-115);
    	this.game.debug.text('fps: ' + (this.game.time.fps), 30,this.game.world.height-100);
    	this.game.debug.text('this.aliens.alive: ' + (this.motherShip1.countLiving() + this.motherShip2.countLiving()), 30,this.game.world.height-85);
    	this.game.debug.text('this.aliens.dead: ' + (this.motherShip1.countDead() + this.motherShip2.countDead()), 30,this.game.world.height-70);
    	this.ship.weapon.debug(30,this.game.world.height-55);
    }    
};