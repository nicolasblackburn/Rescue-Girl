var rescue = rescue || {};
rescue.scenes = rescue.scenes || {};
var __namespace__ = rescue;

(function(ns) { 
	var 
		mixin = ns.utils.mixin,
		Player = ns.entities.Player,
		Rectangle = ns.engine.Rectangle,
		Scene = ns.engine.Scene;
		
	var __classname__ = "MainScene";
			
	var __class__ = function() {
		Scene.call(this);
	};
	
	__class__.prototype = Object.create(Scene.prototype);
	__class__.prototype.constructor = __class__;
	
	mixin(__class__.prototype, {
		setup: function(app) {
			this.boundary = new Rectangle(0, 0, window.innerWidth, window.innerHeight);
			
			ns.utils.log(this.boundary);
			
			var player = new Player();
			this.addChild(player);
			
			Scene.prototype.setup.call(this, app);
		}
	});
 
	ns.scenes = ns.scenes || {};
	ns.scenes[__classname__] = __class__;
	
	return ns;
	
})(__namespace__);
