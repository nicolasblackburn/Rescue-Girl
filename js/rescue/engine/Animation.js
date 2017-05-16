define(["rescue/utils"], function(utils) { 
	var 
		getTicker = utils.getTicker,
		mixin = utils.mixin;
	
	var __module__ = function() {
		this.frames = [];
		this.currentFrame = 0;
		this.startTime = null;
		this.ellapsedTime = null;
		this.paused = false;
		this.loop = true;
	};
	
	mixin(__module__.prototype, {
	
		addFrame: function(obj, duration) {
			this.frames.push({
				object: obj,
				duration: duration
			});
			return this;
		},
		
		current: function() {
			return this.frames[this.currentFrame].object;
		},
		
		rewind: function() {
			this.currentFrame = 0;
			this.startTime = null;
			this.ellapsedTime = 0;
			this.paused = false;
		},
		
		setLoop: function(loop) {
			this.loop = loop;
			return this;
		},
		
		update: function() {
			var
				ticker = getTicker();
			
			var time = ticker.lastTime;
				
			if (!this.paused) {
			
				if (null == this.startTime) {
					this.startTime = time;
					this.ellapsedTime = 0;
				} else {
					this.ellapsedTime = time - this.startTime;
					while (this.ellapsedTime >= this.frames[this.currentFrame].duration) {
						this.currentFrame++;
						if (this.currentFrame >= this.frames.length) {
							if (this.loop) {
								this.currentFrame = 0;
							} else {
								this.currentFrame--;
								this.paused = true;
							}
						} 
						this.startTime += this.frames[this.currentFrame].duration;
						this.ellapsedTime -= this.frames[this.currentFrame].duration;
					}
				}
			}
		}
	});
	
	return __module__;
	
});
