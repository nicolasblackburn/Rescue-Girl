define(["PIXI"], function(PIXI) { 
	
	var 
		resources = PIXI.loader.resources;
	
	function getSound(id) {
		return resources[id];
	}
	
	return getSound;
	
});
