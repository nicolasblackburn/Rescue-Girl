define(["PIXI"], function(PIXI) { 
	
	var 
		Ticker = PIXI.ticker.Ticker;
	
	var ticker;
	
	function getTicker() {
		if (null == ticker) {
			ticker = new Ticker();
			ticker.stop();
		}
		return ticker;
	}
	
	return getTicker;
	
});
