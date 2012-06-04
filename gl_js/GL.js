var GLace;

(function() {
	'use strict';

	var instance, //for singleton instance
		defaults = {
			canvas: "canvas",
			controls: "controls",
			totalHips: 6,
			radius: 100,
			color: "red",
			interval: 0,
			speed: 0
		};

	GLace = function (options) {
		var controls, startX, startY, animate, canva, context;

		if (instance) { //singleton pattern
			return instance;
		}
		if (!(this instanceof GLace)) { //self creating constructor pattern
			return new GLace;
		}
		instance = this;

		options = options || {};
		for (var key in options) {  //proper for-in pattern
			if ( options.hasOwnProperty(key) ) {
				defaults[key] = options[key];
			}
		}

		controls = document.getElementById(defaults.controls);
		canva = document.getElementById(defaults.canvas);
		context = canva.getContext('2d');  //cache draw context
		startX = context.canvas.width / 2;
		startY = context.canvas.height / 2;
		//setup canvas 
		this.canva.width = document.documentElement.clientWidth;
		this.canva.height = document.documentElement.clientHeight - controls.offsetHeight - 5;
		this.context.moveTo()

		//private methods
		animate = function (speed) {

		}
	}
} ());