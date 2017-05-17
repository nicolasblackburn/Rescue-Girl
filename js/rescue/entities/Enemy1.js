define([
	"PIXI", 
	"rescue/animations/Enemy1Animations",
	"rescue/engine/collision/collideAABB",  
	"rescue/engine/GameObject", 
	"rescue/engine/Rectangle", 
	"rescue/engine/Vector2D", 
	"rescue/utils/boundNumber",  
	"rescue/utils/getSound", 
	"rescue/utils/getTicker", 
	"rescue/utils/mixin"
	
	], function( PIXI, Enemy1Animations, collideAABB, GameObject, Rectangle, Vector2D, boundNumber, getSound, getTicker, mixin ) { 
	
	var Enemy1 = function() {
		GameObject.call(this);
	};
	
	Enemy1.prototype = Object.create(GameObject.prototype);
	Enemy1.prototype.constructor = Enemy1;
	
	var boundary = new Rectangle(0, 0, 16*55, 9*55);
	
	mixin(Enemy1.prototype,  {
		
		setup: function(app) {
			
			this.app = app;
			
			this.animations = new Enemy1Animations();
			
			this.animation = null;
			
			this.boundary = app.scene.boundary;
			
			this.collisionShape = new Rectangle(24, 4, 16, 60);
			
			this.direction = "down";
			
			this.hitDeltaTime = 0;
			
			this.hitDuration = 8;
			
			this.hitSound = getSound("sounds/hit-enemy.wav");
			
			this.hitSpeed = 10;
			
			this.overlap = false;
			
			this.overlapDeltaTime = 0;
			
			this.overlapDuration = 10;
			
			this.scoutDeltaTime = 0;
			
			this.scoutDuration = 50;

			this.speed = 1.3;
			
			this.state = null;
			
			var x = this.collisionShape.x;
			var y = this.collisionShape.y;
			var width = this.collisionShape.width;
			var height = this.collisionShape.height;
			this.x = Math.random()*this.boundary.width;
			this.y = Math.random()*this.boundary.height;
			this.x = boundNumber(this.x, this.boundary.x, this.boundary.width - this.width);
			this.y = boundNumber(this.y, this.boundary.y, this.boundary.height - this.height);
			
			this.velocity = new Vector2D(0,0);

			this.setAnimation("walking");
			
			this.setState("scout");
		},
		
		onEndUpdate: function() {
			var x = this.collisionShape.x;
			var y = this.collisionShape.y;
			var width = this.collisionShape.width;
			var height = this.collisionShape.height;
			this.x = boundNumber(this.x, this.boundary.x, this.boundary.width - this.width);
			this.y = boundNumber(this.y, this.boundary.y, this.boundary.height - this.height);
		},

		onEnterHitState: function() {
			var player = this.app.scene.player;
			
			this.hitDeltaTime = 0; 
			
			switch (player.direction) {
				case "left":
					this.velocity = new Vector2D(-1,0).scale(this.hitSpeed);
					break;
				case "up":
					this.velocity = new Vector2D(0,-1).scale(this.hitSpeed);
					break;
				case "right":
					this.velocity = new Vector2D(1,0).scale(this.hitSpeed);
					break;
				case "down":
					this.velocity = new Vector2D(0,1).scale(this.hitSpeed);
					break;
			}
			
			this.hitSound.play();
		},
		
		onUpdateHitState: function() {
			var scene = this.app.scene;
			var ticker = getTicker();
			
			this.hitDeltaTime += ticker.deltaTime;
			if (this.hitDeltaTime > this.hitDuration) {
				scene.removeChild(this);
			}
		},

		onEnterScoutState: function() {
			this.velocity.x = Math.random()*2 - 1;
			this.velocity.y = Math.random()*2 - 1;
			this.velocity = this.velocity.normalize().scale(this.speed);
			
			this.scoutDeltaTime = 0; 
		},
		
		onUpdateScoutState: function() {
			var ticker = getTicker();
			var scene = this.app.scene;
			var player = scene.player;
			
			this.scoutDeltaTime += ticker.deltaTime; 
			
				
			if (player.state === "punch" && player.canHit) {
				
				let punchCollisionShape = player.getPunchCollisionShape();
				if (collideAABB(
					player.getPunchCollisionShape().translate(player.position), 
						this.collisionShape.translate(this.position))) {
				
					player.canHit = false;
					this.setState("hit");
					return;
				}
			
			} else if (!player.tempInvincible) {
			
				if (collideAABB(
					player.collisionShape.translate(player.position), 
						this.collisionShape.translate(this.position))) {
						
					if (! this.overlap) {
						this.overlap = true;
						this.overlapDeltaTime = 0;
					} else {
						this.overlapDeltaTime += ticker.deltaTime;
					}
			
					if (this.overlapDeltaTime > this.overlapDuration) {
						this.overlap = false;
						this.app.scene.player.setState("hitByEnemy");
					}
				
				} else {
					this.overlap = 0;
				}
			}
			
			if (this.scoutDeltaTime > this.scoutDuration) {
				this.setState("scout");
			}
		}
	
	});
 
	return Enemy1;
	
});
