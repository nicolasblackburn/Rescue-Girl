define([
	"rescue/utils/getTicker", 
	"rescue/utils/mixin"
	
	], function( getTicker, mixin ) { 
	
	function Animation() {
		this.frames = [];
		this.currentFrame = 0;
		this.deltaTime = 0;
		this.paused = false;
		this.loop = true;
	};
	
	mixin(Animation.prototype, {
	
		addFrame: function(obj, duration) {
			this.frames.push({
				object: obj,
				duration: duration
			});
			return this;
		},
		
		current: function() {
			if (this.frames[this.currentFrame]) {
				return this.frames[this.currentFrame].object;
			}
			return null;
		},
		
		rewind: function() {
			this.currentFrame = 0;
			this.deltaTime = 0;
			this.paused = false;
		},
		
		setLoop: function(loop) {
			this.loop = loop;
			return this;
		},
		
		update: function() {
			var ticker = getTicker();
			var i = 1;
			
			var time = ticker.elapsedMS;
				
			if (!this.paused) {
				
				if (this.frames.length <= 1) {
					return;
				}
			
				this.deltaTime += time;
				while (this.deltaTime >= this.frames[this.currentFrame].duration) {
					this.currentFrame++;
					
					if (this.currentFrame >= this.frames.length) {
						if (this.loop) {
							this.currentFrame = 0;
						} else {
							this.currentFrame--;
							this.paused = true;
						}
					} 
					
					this.deltaTime -= this.frames[this.currentFrame].duration;
				};
				
			}
		}
	});
	
	return Animation;
	
});
