var rescue = (function(ns) { 
	var
		mixin = ns.utils.mixin;
	
	var __classname__ = "Rectangle";
	
	var __class__ = function(x, y, width, height) {
		var self = this;
		
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	};
 
	ns.engine = ns.engine || {};
	ns.engine[__classname__] = __class__;
	
	return ns;
	
})(rescue || {});
