define(["rescue/utils"], function(utils) { 
	var
		mixin = utils.mixin;
	
	var __module__ = function(x, y) {
		var self = this;
		
		this.x = x;
		this.y = y;
		
		this._normal = null;
	};
	
	mixin(__module__.prototype, {
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
					this._normal = new __module__(0, 0);
				} else {
					this._normal = new __module__(this.x/norm, this.y/norm);
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
 
	return __module__;
	
});
