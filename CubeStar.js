/*Usage**************************************************************************
cubeStar(2)
cubeStar(2, 41)
creates a cubeStar of depth 2 using default material, 
or (in the second case) using the material 41 (=Gold)

The maximum depth is 5.
cubeStar(5) takes 934 sec and extends above the maximum altitude of Minecraft.
****************************************************************/

var Drone = require('../drone/drone').Drone; 


//the recursive method
Drone.prototype.makeCubeStar = function(depth, material, length) {
	var step=length/3;
	if (depth == 0 ) {
		this.box(material, 1, 1, 1);
	} else {
		this
			.fwd(step).up(step).right(step).box(material, step, step, step) //middle
			.back(step).makeCubeStar(depth-1, material, step)
			.fwd(2*step).makeCubeStar(depth-1, material, step)
			.back(step).up(step).makeCubeStar(depth-1, material, step)
			.down(2*step).makeCubeStar(depth-1, material, step)
			.up(step).right(step).makeCubeStar(depth-1, material, step)
			.left(2*step).makeCubeStar(depth-1, material, step);
		// return to start position 
		this.down(step).back(step);
	}
	return this;
};

Drone.extend('cubeStar', function(depth, material){
	if ( typeof depth == 'undefined') {
        depth = 1;
    }
    if ( typeof material == 'undefined' ) {
        material = '159:14';
    }
    if (depth < 0 || depth > 5) {
    	this.sign(["Try", "cubeStar(d)", "with", "0<=d<=5"], 63);
    } else {
    	this.makeCubeStar(depth, material, Math.pow(3,depth));
    }
});