define([
	"PIXI", 
	"rescue/animations/PlayerAnimations",
	"rescue/engine/GameObject",  
	"rescue/engine/Input", 
	"rescue/engine/Rectangle", 
	"rescue/engine/Vector2D", 
	"rescue/utils/boundNumber", 
	"rescue/utils/getSound", 
	"rescue/utils/getTicker", 
	"rescue/utils/mixin"
	
	], function( PIXI, PlayerAnimations, GameObject, Input, Rectangle, Vector2D, boundNumber, getSound, getTicker, mixin ) { 
			
	var Player = function() {
		GameObject.call(this);
	};
	
	Player.prototype = Object.create(GameObject.prototype);
	Player.prototype.constructor = Player;
	
	var boundary = new Rectangle(0, 0, 16*55, 9*55);
	
	mixin(Player.prototype,  {
		
		setup: function(app) {
			var self = this;
		
			this.animations = new PlayerAnimations();
			
			this.boundary = app.scene.boundary;
			
			this.canHit = true;
			
			this.collisionShape = new Rectangle(20, 4, 26, 60);
			this.punchLeftCollisionShape = new Rectangle(0, 20, 24, 32);
			this.punchUpCollisionShape = new Rectangle(16, 4, 33, 24);
			this.punchRightCollisionShape = new Rectangle(40, 20, 24, 32);
			this.punchDownCollisionShape = new Rectangle(16, 40, 33, 24);
			
			this.direction = "down";
			
			this.hitDeltaTime = 0;
			
			this.hitDuration = 10;
			
			this.hitSound = getSound("sounds/hit-player.wav");
			
			this.hitSpeed = 8;
			
			this.tempInvincibleDeltaTime = 0;
			
			this.tempInvincibleDuration = 0;
			
			this.tempInvincible = false;
			
			this.punchDown = false;

			this.speed = 4;
			
			this.state = null;
			
			this.velocity = new Vector2D(0,0);
			
			this.x = this.boundary.width/2 - 32;
			this.y = this.boundary.height/2 - 32;

			this.setAnimation("idle-down");
			
			this.setState("idle");
		},
		
		getMovementFromInput: function() {
			var input = Input.getInstance();
			
			var v = new Vector2D(0, 0);
			
			if (input.getInput("left")) {
				v.x = -1;
			}
			
			if (input.getInput("up")) {
				v.y = -1;
			}
			
			if (input.getInput("right")) {
				v.x = 1;
			}
			
			if (input.getInput("down")) {
				v.y = 1;
			}
			
			v = v.normalize().scale(this.speed);
			
			return v;
			
		},
		
		getPunchCollisionShape: function() {
			switch (this.direction) {
				case "left":
					return this.punchLeftCollisionShape;
					break;
				case "up":
					return this.punchUpCollisionShape;
					break;
				case "right":
					return this.punchRightCollisionShape;
					break;
				case "down":
					return this.punchDownCollisionShape;
					break;
			}
		},
		
		onEndUpdate: function() {
			var x = this.collisionShape.x;
			var y = this.collisionShape.y;
			var width = this.collisionShape.width;
			var height = this.collisionShape.height;
			this.x = boundNumber(this.x, this.boundary.x, this.boundary.width - this.width);
			this.y = boundNumber(this.y, this.boundary.y, this.boundary.height - this.height);
		},
		
		onEnterHitByEnemyState: function() {
			this.hitDeltaTime = 0;
			this.tempInvincible = true;
			switch (this.direction) {
				case "left":
					this.velocity = new Vector2D(1,0).scale(this.hitSpeed);
					break;
				case "up":
					this.velocity = new Vector2D(0,1).scale(this.hitSpeed);
					break;
				case "right":
					this.velocity = new Vector2D(-1,0).scale(this.hitSpeed);
					break;
				case "down":
					this.velocity = new Vector2D(0,-1).scale(this.hitSpeed);
					break;
			}
			this.hitSound.play();
		},
		
		onUpdateHitByEnemyState: function() {
			var ticker = getTicker();
			
			this.hitDeltaTime += ticker.deltaTime;
			if (this.hitDeltaTime > this.hitDuration) {
				this.setState("idle");
			}
			
		},
		
		onExitHitByEnemyState: function() {
			this.tempInvincible = false;
		},
		
		onEnterIdleState: function() {
			this.setAnimation("idle-"+this.direction);
			this.velocity = new Vector2D(0,0);
		},
		
		onUpdateIdleState: function() {
			var input = Input.getInstance();
			
			if (input.getInput("punch")) {
				this.setState("punch");
				return;
			}
			
			var v = this.getMovementFromInput();
			
			if (v.x !== 0 || v.y !== 0) {
				if (v.x > 0) {
					this.direction = "right";
				} else if (v.x < 0) {
					this.direction = "left";
				} else if (v.y < 0) {
					this.direction = "up";
				} else {
					this.direction = "down";
				}
				
				this.velocity = v;
				
				this.setState("walking");
				
				return;
			}
		},
		
		onEnterPunchState: function() {
			this.canHit = true;
			this.setAnimation("punch-"+this.direction);
			this.velocity = new  Vector2D(0,0);
		},
		
		onUpdatePunchState: function() {
			var input = Input.getInstance();
			if (this.animation.paused && !input.getInput("punch")) {
				this.setState("idle");
			}
		},
		
		onExitPunchState: function() {
			this.canHit = true;
		},
		
		onEnterWalkingState: function() {
			this.setAnimation("walking-"+this.direction);
		},
		
		onUpdateWalkingState: function() {
			var input = Input.getInstance();
			
			if (input.getInput("punch")) {
				this.setState("punch");
				return;
			}
			
			var v = this.getMovementFromInput();
			
			if (v.x == 0 && v.y == 0) {
				this.velocity = v;
				this.setState("idle");
				return;
			}
			
			if (! this.velocity.eq(v) ) {
				if (v.x !== this.velocity.x) {
					if (v.x > 0) {
						this.direction = "right";
						this.setAnimation("walking-"+this.direction);
					} else if (v.x < 0) {
						this.direction = "left";
						this.setAnimation("walking-"+this.direction);
					}
				}
				if (v.y !== this.velocity.y) {
					if (v.y > 0) {
						this.direction = "down";
						this.setAnimation("walking-"+this.direction);
					} else if (v.y < 0) {
						this.direction = "up";
						this.setAnimation("walking-"+this.direction);
					}
				}
			}
				
			this.velocity = v;
			
		}
	
	});
 
	return Player;
	
});
