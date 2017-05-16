define(["PIXI", "rescue/engine/Vector2D", "rescue/utils"], function(PIXI, Vector2D, utils) { 
	var 
		callIfDefined = utils.callIfDefined,
		Sprite = PIXI.Sprite,
		mixin = utils.mixin,
		TextureCache = PIXI.utils.TextureCache;
			
	var __module__ = function() {
		Sprite.call(this);
		
		this.acceleration = new Vector2D(0,0);
		this.velocity = new Vector2D(0,0);
	};
	
	__module__.prototype = Object.create(Sprite.prototype);
	__module__.prototype.constructor = __module__;
	
	mixin(__module__.prototype, {
		
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
		}
	});
	
	return __module__;
	
});
