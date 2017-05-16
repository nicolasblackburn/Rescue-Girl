var rescue = rescue || {};
rescue.entities = rescue.entities || {};
var __namespace__ = rescue;

(function(ns) { 
	var 
		Animation = ns.engine.Animation,
		boundNumber = ns.utils.boundNumber,
		callIfDefined = ns.utils.callIfDefined,
		getInput = ns.utils.getInput,
		getTicker = ns.utils.getTicker,
		mixin = ns.utils.mixin,
		Sprite = ns.engine.Sprite,
		TextureCache = PIXI.utils.TextureCache
		Vector2D = ns.engine.Vector2D;
		
	var __classname__ = "Player";
			
	var __class__ = function() {
		Sprite.call(this);
	};
	
	__class__.prototype = Object.create(Sprite.prototype);
	__class__.prototype.constructor = __class__;
	
	mixin(__class__.prototype,  {
		
		setup: function(app) {
			this.speed = 4;
			
			this.animations = {
				"idle-left": new Animation()
					.addFrame("girl-walking-left-0-4x.png", 1000),
				"idle-up": new Animation()
					.addFrame("girl-walking-up-0-4x.png", 1000),
				"idle-right": new Animation()
					.addFrame("girl-walking-right-0-4x.png", 1000),
				"idle-down": new Animation()
					.addFrame("girl-walking-down-0-4x.png", 1000),
				"walking-left": new Animation()
					.addFrame("girl-walking-left-1-4x.png", 200)
					.addFrame("girl-walking-left-2-4x.png", 200),
				"walking-up": new Animation()
					.addFrame("girl-walking-up-1-4x.png", 200)
					.addFrame("girl-walking-up-2-4x.png", 200),
				"walking-right": new Animation()
					.addFrame("girl-walking-right-1-4x.png", 200)
					.addFrame("girl-walking-right-2-4x.png", 200),
				"walking-down": new Animation()
					.addFrame("girl-walking-down-1-4x.png", 200)
					.addFrame("girl-walking-down-2-4x.png", 200),
				"punch-left": new Animation()
					.setLoop(false)
					.addFrame("girl-punch-left-0-4x.png", 100)
					.addFrame("girl-punch-left-1-4x.png", 100)
					.addFrame("girl-walking-left-0-4x.png",  50),
				"punch-up": new Animation()
					.setLoop(false)
					.addFrame("girl-punch-up-0-4x.png", 100)
					.addFrame("girl-punch-up-1-4x.png", 100)
					.addFrame("girl-walking-up-0-4x.png",  50),
				"punch-right": new Animation()
					.setLoop(false)
					.addFrame("girl-punch-right-0-4x.png", 100)
					.addFrame("girl-punch-right-1-4x.png", 100)
					.addFrame("girl-walking-right-0-4x.png",  50),
				"punch-down": new Animation()
					.setLoop(false)
					.addFrame("girl-punch-down-0-4x.png", 100)
					.addFrame("girl-punch-down-1-4x.png", 100)
					.addFrame("girl-walking-down-0-4x.png",  50)
			};
			
			this.velocity = new Vector2D(0,0);
			
			this.direction = "down";
			
			this.animation = null;
			
			this.punchDown = false;
			
			this.state = null;
			
			this.setState("idle");
		},
		
		getMovementFromInput: function() {
			var input = getInput();
			
			var v = new ns.engine.Vector2D(0, 0);
			
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
		
		onEnterIdleState: function() {
			this.setAnimation("idle-"+this.direction);
			this.velocity = new  Vector2D(0,0);
		},
		
		onUpdateIdleState: function() {
			var input = getInput();
			
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
			this.setAnimation("punch-"+this.direction);
			this.velocity = new  Vector2D(0,0);
		},
		
		onUpdatePunchState: function() {
			var input = getInput();
			if (this.animation.paused && !input.getInput("punch")) {
				this.setState("idle");
			}
		},
		
		onEnterWalkingState: function() {
			this.setAnimation("walking-"+this.direction);
		},
		
		onUpdateWalkingState: function() {
			var input = getInput();
			
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
			
		},
		
		update: function() {
			
			switch (this.state) {
				case "idle":
					this.onUpdateIdleState();
					break
				case "punch":
					this.onUpdatePunchState();
					break
				case "walking":
					this.onUpdateWalkingState();
					break
			}
			
			var p = (new Vector2D(this.x, this.y)).add(this.velocity);
			
			var boundary = this.parent.boundary;
			
			this.x = boundNumber(p.x, boundary.x, boundary.x + boundary.width - this.width);
			this.y = boundNumber(p.y, boundary.y, boundary.y + boundary.height - this.height);
			
			this.animation.update();
			this.texture = TextureCache[this.animation.current()];
			
		},
	
	});
 
	ns.entities[__classname__] = __class__;
	
	return ns;
	
})(__namespace__);
