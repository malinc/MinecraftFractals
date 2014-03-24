/*Usage**************************************************************************
koch(4)
koch(4, 41)
creates a horizontal Koch curve of depth 4 using default material, 
or (in the second case) using the material 41 (=Gold)

The maximum depth is 6.
A koch(6) takes approximately 1563 seconds (5^6 tenths of a second) to make.

*******************************************************************************/

var Drone = require('../drone/drone').Drone; 

//the recursive method
Drone.prototype.makeCurve = function(depth, material) {
	if (depth == 0 ) {
		this.box(material, 1, 1, 3).fwd(2);
	} else {
		this
			.makeCurve(depth-1, material)
			.turn(3)
			.makeCurve(depth-1, material)
			.turn(1)
			.makeCurve(depth-1, material)
			.turn(1)
			.makeCurve(depth-1, material)
			.turn(3)
			.makeCurve(depth-1, material);
	}
	return this;
};

Drone.extend('koch', function(depth, material){
	if ( typeof depth == 'undefined') {
        depth = 1;
    }
    if ( typeof material == 'undefined' ) {
        material = '152';
    }
    if (depth < 0 || depth > 6) {
    	this.sign(["Try", "koch(d)", "with", "0<=d<=6"], 63);
    } else {
    	this.makeCurve(depth, material);
    }
});