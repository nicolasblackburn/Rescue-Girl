define(["PIXI", "rescue/utils"], function(PIXI, utils) { 
	var 
		callIfDefined = utils.callIfDefined,
		Container = PIXI.Container,
		mixin = utils.mixin;
			
	var __module__ = function() {
		Container.call(this);
	};
	
	__module__.prototype = Object.create(Container.prototype);
	__module__.prototype.constructor = __module__;
	
	mixin(__module__.prototype, {
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
		
		setup: function(app) {
			this.children.forEach(function(o) {
				callIfDefined(o, "setup", [app]);
			});	
		},
		
		update: function(time) {
			this.children.forEach(function(o) {
				callIfDefined(o, "update", [time]);
			});	
		}
	});
 
	return __module__;
	
});
