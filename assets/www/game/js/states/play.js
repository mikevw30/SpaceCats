'use strict';

class Play extends Phaser.State{
	
	constructor(){
		super();
		this.score = 0;
		this.debug = false;
		this.ship;
		
		return this;
	}

	create() { 
		let starField = new StarField(game, 0, 0, game.width, game.height);

        this.ship = new Ship(this.game, game.world.centerX, game.world.centerY);

        this.enemyGroup = new EnemyGroup(this.ship);
        
        this.starEmitter = new StarEmitter();
        
        this.score = 0;
        this.labelScore = this.game.add.text(20, 20, "0",{ font: "30px Arial", fill: "#ffffff" }); 
        
        let timer = this.game.time.events.loop(1000, this.addRow, this);
    }

    update() {
    	this.enemyGroup.forEach(function(enemyList){
    		this.game.physics.arcade.overlap(this.ship, enemyList, this.endGame, null, this);
    		this.game.physics.arcade.overlap(this.ship.weapon.bullets, enemyList, this.hitEnemy, null, this);
    		enemyList.forEach(function(enemy){
    			this.game.physics.arcade.overlap(this.ship, enemy.weapon.bullets, this.endGame, null, this);
    		},this)
    	},this)
        this.game.physics.arcade.overlap(this.ship, this.starEmitter, this.collectStar, null, this);
    }
    
    hitEnemy(_bullet, _enemy) {
    	_bullet.kill();
    	_enemy.kill();
//    	this.starEmitter.setLocation(_enemy.x,_enemy.y);
//    	this.starEmitter.startEmitter();
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
    	this.enemyGroup.spawnEnemy();
    }
    
    render() {
//    	this.game.debug.text('Debug Info', 30,this.game.world.height-115);
    	this.game.debug.text('fps: ' + (this.game.time.fps), 30,this.game.world.height-100);
//    	this.game.debug.text('aliens.alive: ' + (this.enemyGroup.getAlive()), 30,this.game.world.height-85);
//    	this.game.debug.text('aliens.dead: ' + (this.enemyGroup.getDead()), 30,this.game.world.height-70);
//    	this.ship.weapon.debug(30,this.game.world.height-55);
    }    
};