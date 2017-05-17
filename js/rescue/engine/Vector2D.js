define([
	"rescue/utils/mixin"
	
	], function( mixin ) { 
	
	var Vector2D = function(x, y) {
		var self = this;
		
		this.x = x;
		this.y = y;
		
		this._normal = null;
	};
	
	mixin(Vector2D.prototype, {
		add: function(vec1) {
			var vec2 = new Vector2D(this.x, this.y);
			vec2.x += vec1.x;
			vec2.y += vec1.y;
			return vec2;
		},
		
		eq: function(vec) {
			return (this.x == vec.x && this.y == vec.y);
		},
		
		normalize: function() {
			if (! this._normal) {
				var norm = Math.sqrt(this.x*this.x+this.y*this.y);
				
				if (0 == norm) {
					this._normal = new Vector2D(0, 0);
				} else {
					this._normal = new Vector2D(this.x/norm, this.y/norm);
				}
			}
			return this._normal;
		},
		
		sub: function(vec1) {
			var vec2 = new Vector2D(this.x, this.y);
			vec2.x -= vec1.x;
			vec2.y -= vec1.y;
			return vec2;
		},
		
		scale: function(s) {
			var vec = new Vector2D(this.x, this.y);
			vec.x *= s;
			vec.y *= s;
			return vec;
		}
	});
 
	return Vector2D;
	
});
