define(["PIXI"], function(PIXI) { 
		
	function log() {
		console.log.apply(null, Array.prototype.slice.call(arguments));
	}
	
	return log;
	
});
