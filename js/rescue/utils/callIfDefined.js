define(["PIXI", "rescue/utils/isCallable"], function(PIXI, isCallable) {
	
	function callIfDefined(obj, fn, params) {
		if (obj[fn] && isCallable(obj[fn])) {
			return obj[fn].apply(obj, params);
		}
	}
	
	return callIfDefined;
	
});
