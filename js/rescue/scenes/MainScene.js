define([
	"rescue/engine/collision/collideAABB", 
	"rescue/engine/Rectangle", 
	"rescue/engine/Scene", 
	"rescue/entities/Enemy1", 
	"rescue/entities/Player", 
	"rescue/utils/mixin"
	
	], function( collideAABB, Rectangle, Scene, Enemy1, Player, mixin ) { 
			
	var MainScene = function() {
		Scene.call(this);
	};
	
	MainScene.prototype = Object.create(Scene.prototype);
	MainScene.prototype.constructor = MainScene;
	
	mixin(MainScene.prototype, {
		setup: function(app) {
			var i, enemy1, rect;
			
			this.boundary = app.viewport;
			
			for (i = 0; i < 10; i++) {
				enemy1 = new Enemy1();
				this.addChild(enemy1);
			}
			
			var player = new Player();
			this.addChild(player);
			
			this.player = player;
			
			Scene.prototype.setup.call(this, app);
		},
		
		detectCollisions: function() {
			var player = this.player;
			
			this.children.forEach(function(obj) {
				if (obj !== player) {
					if (collideAABB(player, obj)) {
						player.onCollideWithEnemy(obj);
					}
				}
			});
		},
		
		sortObjects: function() {
			this.children.sort(function(obj1, obj2) {
				return obj1.y - obj2.y;
			});
		},
		
		update: function() {
			Scene.prototype.update.call(this);
			
			//this.detectCollisions();
			
			this.sortObjects();
		}
	});
 
	return MainScene;
	
});
