var rescue = rescue || {};

(function(PIXI, ns) {
	var
		autoDetectRenderer = PIXI.autoDetectRenderer,
		callIfDefined = ns.utils.callIfDefined,
		getInput = ns.utils.getInput,
		getTicker = ns.utils.getTicker,
		loader = PIXI.loader,
		MainScene = ns.scenes.MainScene,
		resources = PIXI.loader.resources,
		Rectangle = ns.engine.Rectangle,
		Ticker = PIXI.ticker.Ticker;

	var DEBUG = ns.DEBUG = true;
	var VIEWPORT = ns.VIEWPORT = new Rectangle(0, 0, 16*55, 9*55);

	var renderer = autoDetectRenderer(VIEWPORT.width, VIEWPORT.height);

	document.body.appendChild(renderer.view);

	var game = window.game = {
		input: getInput(),
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
})(PIXI, rescue);
