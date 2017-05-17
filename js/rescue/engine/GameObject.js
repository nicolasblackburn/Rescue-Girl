define([
	"PIXI", 
	"rescue/engine/Animation", 
	"rescue/engine/Vector2D", 
	"rescue/utils/callIfDefined", 
	"rescue/utils/mixin"
	
	], function( PIXI, Animation, Vector2D, callIfDefined, mixin ) { 
		
	var 
		Container = PIXI.Container,
		Sprite = PIXI.Sprite,
		TextureCache = PIXI.utils.TextureCache;
			
	var GameObject = function() {
		Container.call(this);
		
		this.animation = new Animation();
		this.acceleration = new Vector2D(0,0);
		this.velocity = new Vector2D(0,0);
		
		this.sprite = new Sprite();
		this.addChild(this.sprite);
	};
	
	GameObject.prototype = Object.create(Container.prototype);
	GameObject.prototype.constructor = GameObject;
	
	mixin(GameObject.prototype, {
		update: function() {
			callIfDefined(this, "onStartUpdate");
			
			var fn;
			
			if (this.state) {
				fn = "onUpdate" + this.state[0].toUpperCase() + this.state.slice(1) + "State";
				callIfDefined(this, fn);
			}
			
			this.velocity = this.velocity.add(this.acceleration);
			
			this.position = (new Vector2D(this.x, this.y)).add(this.velocity);
			
			this.animation.update();
			this.setTexture(this.animation.current());
			
			callIfDefined(this, "onEndUpdate");
		},
		
		setAnimation: function(id) {
			if (this.animations && this.animations[id]) {
				this.animation = this.animations[id];
				this.animation.rewind();
				this.setTexture(this.animation.current());
			} else {
				this.animation = null;
			}
		},
		
		setState: function(id) {
			var fn;
			
			if (this.state) {
				fn = "onExit" + this.state[0].toUpperCase() + this.state.slice(1) + "State";
				callIfDefined(this, fn);
			}
			
			this.state = id;
			
			if (id) {
				fn = "onEnter" + id[0].toUpperCase() + id.slice(1) + "State";
				callIfDefined(this, fn);
			}
		},
		
		setTexture: function(id) {
			this.sprite.texture = TextureCache[id];
		}
	});
	
			
			function addRect(rect) {
				var shape = new PIXI.Graphics();
				shape.lineStyle(1, 0x6060F0);
				shape.drawRect(
					rect.x, 
					rect.y, 
					rect.width, 
					rect.height
				);
				self.addChild(shape);
			}
	
	return GameObject;
	
});
