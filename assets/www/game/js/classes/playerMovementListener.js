class PlayerMovementListener {
	
	constructor(player){
		this.player = player;
		
		return this;
	}
	
	listen(){
		var gX = (gyro.getOrientation().x + gyro.getOrientation().x + gyro.getOrientation().x) / 3;
		var gY = (gyro.getOrientation().y + gyro.getOrientation().y + gyro.getOrientation().y) / 3;

		var accFilter = 1;
		
		if(Math.abs(gX) >= accFilter){
			if(gX<0)
				this.player.body.velocity.x += 15;
			else
				this.player.body.velocity.x -= 15;
		}
		else{
			this.player.body.velocity.x = 0;
		}
		if(Math.abs(gY) >= accFilter){
			if(gY<0)
				this.player.body.velocity.y -= 15;
			else
				this.player.body.velocity.y += 15;
		}
		else{
			this.player.body.velocity.y = 0;
		}
		
		if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
	    {
			this.player.x -= 4;
	    }
	    else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
	    {
	    	this.player.x += 4;
	    }

	    if (game.input.keyboard.isDown(Phaser.Keyboard.UP))
	    {
	    	this.player.y -= 4;
	    }
	    else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN))
	    {
	    	this.player.y += 4;
	    }
	}
};