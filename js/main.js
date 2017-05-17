require([
	"PIXI", 
	"soundjs",
	"rescue/utils/callIfDefined",
	"rescue/utils/getTicker", 
	"rescue/engine/Input", 
	"rescue/engine/Rectangle", 
	"rescue/scenes/MainScene", 
	"polyfill/Array.prototype.includes"
	
	], function( PIXI, howler, callIfDefined, getTicker, Input, Rectangle, MainScene ) {
		
	var
		autoDetectRenderer = PIXI.autoDetectRenderer,
		loader = PIXI.loader;

	var viewport = new Rectangle(0, 0, 16*55, 9*55);

	var renderer = autoDetectRenderer(viewport.width, viewport.height);

	document.body.appendChild(renderer.view);

	var game = window.game = {
		input: Input.getInstance(),
		renderer: renderer,
		scene: null,
		ticker: getTicker(),
		viewport: viewport,

		start: function() {
			var self = this;
			
			//this.lastTime = performance.now();
			//this.deltaTime = 0;
			
			sounds.whenLoaded = function() {
				Object.keys(sounds).forEach(function(id) {
					loader.resources[id] = sounds[id];
				});
				//loader.resources[]
				loader
					.add("textures/sprites.json")
					.on("progress", this.onProgress)
					.load(function() {
						self.setup();
					}
				);
			};
			sounds.load([
				"sounds/hit-enemy.wav",
				"sounds/hit-player.wav"
			]);
		},

		onProgress: function(loader, resource) {
			//log("loading: " + resource.name + ", " + resource.url); 
			//log("progress: " + loader.progress + "%"); 
		},

		render: function() {
			this.renderer.render(this.scene);
		},

		setup: function() {
			var self = this;
			
			var scene = new MainScene(this);

			this.scene = scene;
			
			callIfDefined(scene, "setup", [this]);

			this.input.addListener(scene);

			this.render();
			
			this.ticker.add(function() {
				self.update();
			});

			this.ticker.start();
		},

		update: function() {
			
			//this.deltaTime = performance.now() - this.lastTime;
			//this.lastTime += this.deltaTime;
			
			//var self = this;
  			//requestAnimationFrame(function() {self.update()});

			this.input.processEvents();

			callIfDefined(this.scene, "update");

			this.render();

		}
	};

	game.start();
});
