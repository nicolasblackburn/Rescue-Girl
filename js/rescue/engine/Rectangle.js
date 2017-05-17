define([
	"rescue/utils/mixin"
	
	], function( mixin ) { 
	
	var Rectangle = function(x, y, width, height) {
		var self = this;
		
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	};
	
	mixin(Rectangle.prototype, {
		translate: function(vec) {
			var rect = new Rectangle(this.x, this.y, this.width, this.height);
			rect.x += vec.x;
			rect.y += vec.y;
			return rect;
		}
	});
	
	return Rectangle;
});
