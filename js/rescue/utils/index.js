var rescue = rescue || {};
var __namespace__ = rescue;

(function(ns) { 
	
	var ticker;
	var input;
	
	function boundNumber(n, min, max) {
		if (n < min) {
			return min;
		} else if (n > max) {
			return max;
		} else {
			return n;
		}
	}
	
	function callIfDefined(obj, fn, params) {
		if (obj[fn] && isCallable(obj[fn])) {
			return obj[fn].apply(obj, params);
		}
	}
	
	function getInput() {
		if (null == input) {
			input = new ns.engine.Input();
		}
		return input;
	}
	
	
	function getTicker() {
		if (null == ticker) {
			ticker = new PIXI.ticker.Ticker();
			ticker.stop();
		}
		return ticker;
	}
	
	function isCallable(v) {  
		return typeof v === 'function';
	}
	
	function log() {
		if (ns.DEBUG) {
			console.log.apply(null, Array.prototype.slice.call(arguments));
		}
	}
		
	function mixin(target, source) {  
		for (var prop in source) {
			if (source.hasOwnProperty(prop)) {
				target[prop] = source[prop];
			}
		}
		return target;
	}
 
	ns.utils = ns.utils || {};
	ns.utils.boundNumber = boundNumber;
	ns.utils.callIfDefined = callIfDefined;
	ns.utils.getInput = getInput;
	ns.utils.getTicker = getTicker;
	ns.utils.isCallable = isCallable;
	ns.utils.log = log;
	ns.utils.mixin = mixin;
	
	return ns;
	
})(__namespace__);
