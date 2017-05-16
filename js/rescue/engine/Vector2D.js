var rescue = rescue || {};
rescue.engine = rescue.engine || {};
var __namespace__ = rescue;

(function(ns) { 
	var
		mixin = ns.utils.mixin;
	
	var __classname__ = "Vector2D";
	
	var __class__ = function(x, y) {
		var self = this;
		
		this.x = x;
		this.y = y;
		
		this._normal = null;
	};
	
	mixin(__class__.prototype, {
		add: function(vec) {
			this.x += vec.x;
			this.y += vec.y;
			this._normal = null;
			return this;
		},
		
		eq: function(vec) {
			return (this.x == vec.x && this.y == vec.y);
		},
		
		normalize: function() {
			if (! this._normal) {
				var norm = Math.sqrt(this.x*this.x+this.y*this.y);
				
				if (0 == norm) {
					this._normal = new __class__(0, 0);
				} else {
					this._normal = new __class__(this.x/norm, this.y/norm);
				}
			}
			return this._normal;
		},
		
		sub: function(vec) {
			this.x -= vec.x;
			this.y -= vec.y;
			this._normal = null;
			return this;
		},
		
		scale: function(s) {
			this.x *= s;
			this.y *= s;
			this._normal = null;
			return this;
		}
	});
 
	ns.engine = ns.engine || {};
	ns.engine[__classname__] = __class__;
	
	return ns;
	
})(__namespace__);
