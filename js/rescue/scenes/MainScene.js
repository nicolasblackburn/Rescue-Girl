define([
	"PIXI",
	"rescue/engine/collision/collideAABB", 
	"rescue/engine/Rectangle", 
	"rescue/engine/Scene", 
	"rescue/entities/Enemy1", 
	"rescue/entities/Player", 
	"rescue/utils/mixin"
	
	], function( PIXI, collideAABB, Rectangle, Scene, Enemy1, Player, mixin ) { 
	
	var 
		Text = PIXI.Text;
			
	var MainScene = function(app) {
		Scene.call(this);
		
		this.app = app;
		
		var i, rect;
		
		this.boundary = app.viewport;
		
		this.score = 0;
		
		this.health = 3;
		
		this.enemyCount = 0;
		
		this.sprites = new Scene();
		this.addChild(this.sprites);
		
		this.spawnWave();
		
		this.player = new Player(this);
		this.sprites.addChild(this.player);
		
		let textStyle = {fontFamily : 'serif', fontSize: 16, fill : 0xffffff, align : 'left'};
		
		this.ui = new Scene();
		this.addChild(this.ui);
		
		this.textHealth = new Text("", textStyle);
		this.textHealth.position.set(10, 10);
		
		this.textScore = new Text("", textStyle);
		this.textScore.position.set(10, 10);
		
		this.textGameOver = new Text("GAME OVER", mixin(textStyle, {fontSize: 28}));
		this.textGameOver.position.set(10, 10);
		this.textGameOver.visible = false;
		
		var bounds = this.textGameOver.getBounds();
		this.textGameOver.x = this.boundary.width/2 - bounds.width/2;
		this.textGameOver.y = this.boundary.height/5*2 - bounds.height/2;
		
		this.ui.addChild(this.textHealth);
		this.ui.addChild(this.textScore);
		this.ui.addChild(this.textGameOver);
		
		this.setHealth(3);
		this.setScore(0);
	};
	
	MainScene.prototype = Object.create(Scene.prototype);
	MainScene.prototype.constructor = MainScene;
	
	mixin(MainScene.prototype, {
		setup: function(app) {
			
			//Scene.prototype.setup.call(this, app);
		},
		
		addScore: function(points) {
			this.score += points;
			this.textScore.text = "SCORE: "+this.score;
		},
		
		gameOver: function() {
			this.textGameOver.visible = true;
		},
		
		setScore: function(points) {
			this.score = points;
			this.textScore.text = "SCORE: "+this.score;
		},
		
		subHealth: function(points) {
			this.health -= points;
			this.textHealth.text = "HEALTH: "+this.health;
			var bounds = this.textHealth.getBounds();
			this.textHealth.x = this.boundary.width/2 - bounds.width/2;
		},
		
		setHealth: function(points) {
			this.health = points;
			this.textHealth.text = "HEALTH: "+this.health;
			var bounds = this.textHealth.getBounds();
			this.textHealth.x = this.boundary.width/2 - bounds.width/2;
		},
		
		spawnWave: function() {
			this.enemyCount = 3;
			for (i = 0; i < this.enemyCount; i++) {
				this.sprites.addChild(new Enemy1(this));
			}
		},
		
		sortObjects: function() {
			this.sprites.children.sort(function(obj1, obj2) {
				return obj1.y - obj2.y;
			});
		},
		
		update: function() {
			Scene.prototype.update.call(this);
			
			//this.detectCollisions();
			
			this.sortObjects();
			
			if (this.enemyCount < 1) {
				this.spawnWave();
			}
		}
	});
 
	return MainScene;
	
});
