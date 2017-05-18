define([
	"PIXI", 
	"rescue/utils/callIfDefined", 
	"rescue/utils/mixin"
	
	], function( PIXI, callIfDefined, mixin ) { 
		
	var 
		Container = PIXI.Container;
	
	var Scene = function() {
		Container.call(this);
	};
	
	Scene.prototype = Object.create(Container.prototype);
	Scene.prototype.constructor = Scene;
	
	mixin(Scene.prototype, {
		onKeyDown: function(event) {
			this.children.forEach(function(o) {
				callIfDefined(o, "onKeyDown", [event]);
			});	
		},
		
		onKeyUp: function(event) {
			this.children.forEach(function(o) {
				callIfDefined(o, "onKeyUp", [event]);
			});	
		},
		
		update: function() {
			this.children.forEach(function(o) {
				callIfDefined(o, "update");
			});	
		}
	});
 
	return Scene;
	
});
