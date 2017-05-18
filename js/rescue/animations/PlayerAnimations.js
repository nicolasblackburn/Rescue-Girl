define(["rescue/engine/Animation", "rescue/utils/mixin"], function(Animation, mixin) {
	
	function PlayerAnimations() {
		mixin(this, {
			"dead": new Animation()
				.setLoop(false)
				.addFrame("girl-dead-0-4x.png", 0),

			"idle-left": new Animation()
				.setLoop(false)
				.addFrame("girl-walking-left-0-4x.png", 0),

			"idle-up": new Animation()
				.setLoop(false)
				.addFrame("girl-walking-up-0-4x.png", 0),

			"idle-right": new Animation()
				.setLoop(false)
				.addFrame("girl-walking-right-0-4x.png", 0),

			"idle-down": new Animation()
				.setLoop(false)
				.addFrame("girl-walking-down-0-4x.png", 0),

			"walking-left": new Animation()
				.addFrame("girl-walking-left-1-4x.png", 200)
				.addFrame("girl-walking-left-2-4x.png", 200),

			"walking-up": new Animation()
				.addFrame("girl-walking-up-1-4x.png", 200)
				.addFrame("girl-walking-up-2-4x.png", 200),

			"walking-right": new Animation()
				.addFrame("girl-walking-right-1-4x.png", 200)
				.addFrame("girl-walking-right-2-4x.png", 200),

			"walking-down": new Animation()
				.addFrame("girl-walking-down-1-4x.png", 200)
				.addFrame("girl-walking-down-2-4x.png", 200),

			"punch-left": new Animation()
				.setLoop(false)
				.addFrame("girl-punch-left-0-4x.png", 100)
				.addFrame("girl-punch-left-1-4x.png", 100)
				.addFrame("girl-walking-left-0-4x.png",  50),

			"punch-up": new Animation()
				.setLoop(false)
				.addFrame("girl-punch-up-0-4x.png", 100)
				.addFrame("girl-punch-up-1-4x.png", 100)
				.addFrame("girl-walking-up-0-4x.png",  50),

			"punch-right": new Animation()
				.setLoop(false)
				.addFrame("girl-punch-right-0-4x.png", 100)
				.addFrame("girl-punch-right-1-4x.png", 100)
				.addFrame("girl-walking-right-0-4x.png",  50),

			"punch-down": new Animation()
				.setLoop(false)
				.addFrame("girl-punch-down-0-4x.png", 100)
				.addFrame("girl-punch-down-1-4x.png", 100)
				.addFrame("girl-walking-down-0-4x.png",  50)
		});
	}

	return PlayerAnimations;
});
