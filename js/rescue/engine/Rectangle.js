define(["rescue/utils"], function(utils) { 
	var
		mixin = utils.mixin;
	
	var __module__ = function(x, y, width, height) {
		var self = this;
		
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	};
	
	return __module__;
});
