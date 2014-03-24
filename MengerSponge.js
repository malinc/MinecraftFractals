/*Usage**************************************************************************
menger(2)
menger(2, 41)
creates a Menger sponge of depth 2 using default material, 
or (in the second case) using the material 41 (=Gold)

The maximum depth is 4.
A menger(4) takes approximately 16,000 seconds (20^4 tenths of a second) to make.

*******************************************************************************/
var Drone = require('../drone/drone').Drone; 

//the recursive method
Drone.prototype.makeSponge = function(depth, material) {
	var step = Math.pow(3, depth-1);
	if (depth == 0 ) {
		this.box(material, 1, 1, 1);
	} else {
		this
			.makeSponge(depth-1, material)
			.right(step).makeSponge(depth-1, material)
			.right(step).makeSponge(depth-1, material)
			.up(step).makeSponge(depth-1, material)
			.up(step).makeSponge(depth-1, material)
			.left(step).makeSponge(depth-1, material)
			.left(step).makeSponge(depth-1, material)
			.down(step).makeSponge(depth-1, material)
			.down(step).fwd(step).makeSponge(depth-1, material)
			.right(2*step).makeSponge(depth-1, material)
			.up(2*step).makeSponge(depth-1, material)
			.left(2*step).makeSponge(depth-1, material)
			.fwd(step).makeSponge(depth-1, material)
			.right(step).makeSponge(depth-1, material)
			.right(step).makeSponge(depth-1, material)
			.down(step).makeSponge(depth-1, material)
			.down(step).makeSponge(depth-1, material)
			.left(step).makeSponge(depth-1, material)
			.left(step).makeSponge(depth-1, material)
			.up(step).makeSponge(depth-1, material); 
		/* return to start position */
		this.down(step).back(2*step);
	}
	return this;
};


Drone.extend('menger', function(depth, material){
	if ( typeof depth == 'undefined') {
        depth = 1;
    }
    if ( typeof material == 'undefined' ) {
        material = '133';
    }
    if (depth < 0 || depth > 4) {
    	this.sign(["Try", "menger(d)", "with", "0<=d<=4"], 63);
    } else {
    	this.makeSponge(depth, material);
    }
});