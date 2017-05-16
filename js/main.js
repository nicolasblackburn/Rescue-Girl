require(["PIXI", "rescue"], function(PIXI, rescue) {
	var
		autoDetectRenderer = PIXI.autoDetectRenderer,
		callIfDefined = rescue.utils.callIfDefined,
		getTicker = rescue.utils.getTicker,
		Input = rescue.engine.Input,
		loader = PIXI.loader,
		MainScene = rescue.scenes.MainScene,
		resources = PIXI.loader.resources,
		Rectangle = rescue.engine.Rectangle,
		Ticker = PIXI.ticker.Ticker;

	var DEBUG = rescue.DEBUG = true;
	var VIEWPORT = rescue.VIEWPORT = new Rectangle(0, 0, 16*55, 9*55);

	var renderer = autoDetectRenderer(VIEWPORT.width, VIEWPORT.height);

	document.body.appendChild(renderer.view);

	var game = window.game = {
		input: Input.getInstance(),
		renderer: null,
		scene: null,
		ticker: getTicker(),

		start: function() {
			var self = this;

			this.renderer = renderer;

			loader
				.add("girl", "textures/sprites.json")
				.on("progress", this.onProgress)
				.load(function() {
					self.setup();
			});
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
			callIfDefined(scene, "setup", [this]);

			scene.boundary = VIEWPORT;

			this.scene = scene;

			this.input.addListener(scene);

			this.render();
			
			this.ticker.add(function(time) {
				self.update(time);
			});

			this.ticker.start();
		},

		update: function(time) {

			this.input.processEvents();

			callIfDefined(this.scene, "update", [time]);

			this.render();

		}
	};

	game.start();
});
