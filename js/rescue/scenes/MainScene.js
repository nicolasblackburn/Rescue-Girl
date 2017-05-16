define(["rescue/engine", "rescue/entities", "rescue/utils"], function(engine, entities, utils) { 
	var 
		mixin = utils.mixin,
		Player = entities.Player,
		Rectangle = engine.Rectangle,
		Scene = engine.Scene;
			
	var __module__ = function() {
		Scene.call(this);
	};
	
	__module__.prototype = Object.create(Scene.prototype);
	__module__.prototype.constructor = __module__;
	
	mixin(__module__.prototype, {
		setup: function(app) {
			this.boundary = new Rectangle(0, 0, window.innerWidth, window.innerHeight);
			
			var player = new Player();
			this.addChild(player);
			
			Scene.prototype.setup.call(this, app);
		}
	});
 
	return __module__;
	
});
