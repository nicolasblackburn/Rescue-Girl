define(["rescue/utils"], function(utils) { 
	var utils = require("rescue/utils");
	
	var
		callIfDefined = utils.callIfDefined,
		log = utils.log,
		mixin = utils.mixin;
		
	var input;
	
	var __module__ = function() {
		var self = this;
		
		function keyboard() {
			return {
				isUp: true,
				isDown: false
			};
		}
		
		this.keyMap = {
			32: "punch",
			37: "left",
			38: "up",
			39: "right",
			40: "down",
			65: "left",
			87: "up",
			68: "right",
			83: "down"
		}
		
		this.keyboard = {
			punch: keyboard(),
			left: keyboard(),
			up: keyboard(),
			right: keyboard(),
			down: keyboard()
		};
		
		this.eventsQueue = [];
		this.listeners = [];
		
		window.addEventListener(
			"keydown", 

			function(event) {
				
				if (self.keyMap[event.keyCode] && self.keyboard[self.keyMap[event.keyCode]]) {
					var key = self.keyboard[self.keyMap[event.keyCode]];
					if (! key.isDown) {
						key.isDown = true;
						key.isUp = false;
						self.eventsQueue.push({
							type: 'keyDown',
							id: self.keyMap[event.keyCode],
							keyCode: event.keyCode,
							key: key
						});
					}
				}
				
			}, 
			
			false);

		window.addEventListener(
			"keyup", 

			function(event) {
				
				if (self.keyMap[event.keyCode] && self.keyboard[self.keyMap[event.keyCode]]) {
					var key = self.keyboard[self.keyMap[event.keyCode]];
					if (key.isDown) {
						key.isDown = false;
						key.isUp = true;
						self.eventsQueue.push({
							type: 'keyUp',
							id: self.keyMap[event.keyCode],
							keyCode: event.keyCode,
							key: key
						});
					}
				}
				
			}, 
			
			false);
	};
	
	mixin(__module__.prototype, {
		
		addListener: function(listener) {
			if (!this.listeners.includes(listener)) {
				this.listeners.push(listener);
			}
			return this;
		},
	
		getInput: function(id) {
			return this.keyboard[id].isDown;
		},
		
		logKeyCode: function() {
			
			var listener = function (event) {
				log(event);
				window.removeEventListener('keydown', listener, false );
			};
			
			window.addEventListener(
				"keydown", listener, false);
				
			return this;
			
		},
		
		processEvents: function() {
			var event, funcName;
			
			while (this.eventsQueue.length) {
				event = this.eventsQueue.shift();
				funcName = "on" + event.type[0].toUpperCase() + event.type.slice(1);
				this.listeners.forEach(function(l) {
					callIfDefined(l, funcName, [event]);
				});
			}
			
			return this;
		},
		
		removeListener: function(listener) {
			var i;
			
			for (i = 0; i < this.listeners.length; i++) {
				if (this.listeners[i] = listeners) {
					this.listeners.splice(i,1);
					break;
				}
			}
			
			return this;
		}
		
	});
	
	mixin(__module__, {
		getInstance: function () {
			if (null == input) {
				input = new __module__();
			}
			return input;
		}
	});
 
	return __module__;
	
});
