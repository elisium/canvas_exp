var GLace;

(function() {
	'use strict';

	var instance, //for singleton instance
		defaults: {
			canvas: "canvas",
			totalHips: 6,
			radius: 100,
			color: "red",
			interval: 0,
			speed: 0
		};

	GLace = function (options) {
		if (instance) { //singleton pattern
			return instance;
		}
		instance = this;

		for (var key in options) {  //proper for-in pattern
			if ( options.hasOwnProperty(key) ) {
				defaults[key] = options[key];
			}
		}

		this.canvas = document.getElementById(defaults.canvas);
		this.context = this.canvas.getContext('2d');  //cache draw context
	}
} ())