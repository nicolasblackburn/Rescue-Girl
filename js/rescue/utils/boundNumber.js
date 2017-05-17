define(["PIXI"], function(PIXI) { 
	
	function boundNumber(n, min, max) {
		if (n < min) {
			return min;
		} else if (n > max) {
			return max;
		} else {
			return n;
		}
	}
	
	return boundNumber;
	
});
