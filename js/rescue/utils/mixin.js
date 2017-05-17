define(["PIXI"], function(PIXI) { 
	
	function mixin(target, source) {  
		for (var prop in source) {
			if (source.hasOwnProperty(prop)) {
				target[prop] = source[prop];
			}
		}
		return target;
	};

	return mixin;
	
});
