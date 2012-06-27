var GLace, $;

(function () {
	'use strict';

	var instance, //for singleton instance
		defaults = {
			canvas: "canvas",
			controls: "controls",
			totalHips: 10,
			radius: 300,
			color: "red",
			interval: 0,
			speed: 0
		},
		extend;


	//utils
	extend = function (obj1, obj2) {
        var key;
		for (key in obj1) {  //proper for-in pattern
			if (obj1.hasOwnProperty(key)) {
				obj2[key] = obj1[key];
			}
		}
	};
    
	if (typeof Function.prototype.bind === "undefined") {
		Function.prototype.bind = function (thisArg) {
			var fn = this,
                slice = Array.prototype.slice,
                args = slice.call(arguments, 1);

			return function () {
				return fn.apply(thisArg, args.concat(slice.call(arguments)));
			};
		};
	}
    
	$ = function (id) {
		return document.getElementById(id);
	};

	GLace = function (options) {
		var controls,  //single var instruction pattern
			startX,
			startY,
			canva,
			context,
			timers,
			animate,
			showLine,
			clearTimers,
			stroke;

		if (instance) { //singleton pattern
			return instance;
		}
		if (!(this instanceof GLace)) { //self creating constructor pattern
			return new GLace();
		}
		instance = this;

		options = options || {};
		extend(options, defaults);

		this.iterations = 0;
		timers = [];
		controls = $(defaults.controls);
		canva = $(defaults.canvas);
		context = canva.getContext('2d');  //cache draw context
		//setup canvas 
		canva.width = document.documentElement.clientWidth;
		canva.height = document.documentElement.clientHeight - controls.offsetHeight - 5;
		startX = canva.width / 2;
		startY = canva.height / 2;
		context.moveTo(startX, startY);


		//private methods
		stroke = function (color) {
			context.strokeStyle = color;
			context.stroke();
		};
        
		animate = function (speed, fX, fY, toX, toY) { //facade example
			if (speed === 0) {
				context.moveTo(fX, fY);
				context.lineTo(toX, toY);
			}
		};
        
		showLine = function (fX, fY, toX, toY) {
			animate(defaults.speed, fX, fY, toX, toY);
		};
        
		clearTimers = function () {
            var i;
			if (timers.length > 0) {
				for (i = timers.length; i--;) {
					clearInterval(timers[i]);
				}
			}
			timers = [];
		}

		//working methods
		this.draw = function (options) {
			var hipsAngle,
				totalHips,
				hipCoords = [];
			this.clear();
			context.beginPath();
			options = options || {};
			extend(options, defaults);
			hipsAngle = (360 / defaults.totalHips) * Math.PI / 180;
			totalHips = defaults.totalHips;

			//drowing logic
			for (var currentHip = 0; currentHip < totalHips; currentHip++) {
				var currHipCoords = {
					x : startX + defaults.radius * Math.sin(currentHip * hipsAngle),
					y : startY + defaults.radius * Math.cos(currentHip * hipsAngle)
				}

				for(var subHip = 0, currHipsCount = hipCoords.length; subHip < currHipsCount; subHip++) {
					if (defaults.interval == 0) {
						showLine(currHipCoords.x, currHipCoords.y, hipCoords[subHip].x, hipCoords[subHip].y);
						this.iterations++;
					}
				}

				hipCoords.push(currHipCoords);
            }

			stroke(defaults.color);

		}.bind(this);

		this.clear = function () {
			clearTimers();
			context.clearRect(0, 0, canva.width, canva.height);
		}.bind(this);
	}
} ());