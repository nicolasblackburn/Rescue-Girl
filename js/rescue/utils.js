define(["PIXI"], function(PIXI) { 
	
	var 
		Ticker = PIXI.ticker.Ticker;
	
	var ticker;
	
	function isCallable(v) {  
		return typeof v === 'function';
	}
	
	return {
		boundNumber: function (n, min, max) {
			if (n < min) {
				return min;
			} else if (n > max) {
				return max;
			} else {
				return n;
			}
		},
		
		callIfDefined: function (obj, fn, params) {
			if (obj[fn] && isCallable(obj[fn])) {
				return obj[fn].apply(obj, params);
			}
		},
		
		getTicker: function () {
			if (null == ticker) {
				ticker = new Ticker();
				ticker.stop();
			}
			return ticker;
		},
		
		isCallable: isCallable,
		
		log: function () {
			if (ns.DEBUG) {
				console.log.apply(null, Array.prototype.slice.call(arguments));
			}
		},
			
		mixin: function (target, source) {  
			for (var prop in source) {
				if (source.hasOwnProperty(prop)) {
					target[prop] = source[prop];
				}
			}
			return target;
		}
	};
	
});
