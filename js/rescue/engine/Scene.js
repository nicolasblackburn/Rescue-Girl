var rescue = rescue || {};
rescue.engine = rescue.engine || {};
var __namespace__ = rescue;

(function(ns) { 
	var 
		callIfDefined = ns.utils.callIfDefined,
		Container = PIXI.Container,
		mixin = ns.utils.mixin;
		
	var __classname__ = "Scene";
			
	var __class__ = function() {
		Container.call(this);
	};
	
	__class__.prototype = Object.create(Container.prototype);
	__class__.prototype.constructor = __class__;
	
	mixin(__class__.prototype, {
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
 
	ns.engine = ns.engine || {};
	ns.engine[__classname__] = __class__;
	
	return ns;
	
})(__namespace__);
