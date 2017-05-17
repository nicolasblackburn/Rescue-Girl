define(["rescue/engine/Animation", "rescue/utils/mixin"], function(Animation, mixin) {
	
	function PlayerAnimations() {
		mixin(this, {
			"idle": new Animation()
				.setLoop(false)
				.addFrame("enemy-1-walking-down-0-4x.png", 0)
			,
			
			"walking": new Animation()
				.addFrame("enemy-1-walking-down-1-4x.png", 200)
				.addFrame("enemy-1-walking-down-2-4x.png", 200)
		});
	}

	return PlayerAnimations;
});
