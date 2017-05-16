var rescue = rescue || {};
rescue.engine = rescue.engine || {};
var __namespace__ = rescue;

(function(ns) { 
	var 
		callIfDefined = ns.utils.callIfDefined,
		Sprite = PIXI.Sprite,
		mixin = ns.utils.mixin,
		Vector2D = ns.engine.Vector2D;
		
	var __classname__ = "Sprite";
			
	var __class__ = function() {
		Sprite.call(this);
		
		this.acceleration = new Vector2D(0,0);
		this.velocity = new Vector2D(0,0);
	};
	
	__class__.prototype = Object.create(Container.prototype);
	__class__.prototype.constructor = __class__;
	
	mixin(__class__.prototype, {
		
		setAnimation: function(id) {
			if (this.animations && this.animations[id]) {
				this.animation = this.animations[id];
				this.animation.rewind();
				this.texture = TextureCache[this.animation.current()];
			} else {
				this.animation = null;
			}
		},
		
		setState: function(id) {
			var fn, ticker = getTicker();
			
			if (this.state) {
				fn = "onExit" + this.state[0].toUpperCase() + this.state.slice(1) + "State";
				callIfDefined(this, fn);
			}
			
			this.state = id;
			
			if (id) {
				fn = "onEnter" + id[0].toUpperCase() + id.slice(1) + "State";
				callIfDefined(this, fn);
			}
		}
	});
 
	ns.engine = ns.engine || {};
	ns.engine[__classname__] = __class__;
	
	return ns;
	
})(__namespace__);
