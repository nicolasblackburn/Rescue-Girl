define([
	"rescue/engine", 
	"rescue/entities", 
	"rescue/scenes", 
	"rescue/utils"
	], function(
	engine, 
	entities, 
	scenes, 
	utils
	) { 
	
	return {
		engine: engine,
		entities: entities,
		scenes: scenes,
		utils: utils
	};
	
});
