/*Usage**************************************************************************
cubeStar(2)
cubeStar(2, '1', '2')
creates a cubeStar of depth 2 using default material, or using the
material '1'=Stone

The maximum depth is 5.
cubeStar(5) takes 934 sec and extends above the maximum altitude of Minecraft.
****************************************************************/

var Drone = require('../drone/drone').Drone; 

Drone.extend('makeCubeStar', function(depth, material, length) {
	var step=length/3;
	if (depth == 0 ) {
		this.box(material, 1, 1, 1);
	} else {
		this
			.fwd(step).up(step).right(step).box(material, length/3, length/3, length/3) //middle
			.back(step).makeCubeStar(depth-1, material, length/3)
			.fwd(2*step).makeCubeStar(depth-1, material, length/3)
			.back(step).up(step).makeCubeStar(depth-1, material, length/3)
			.down(2*step).makeCubeStar(depth-1, material, length/3)
			.up(step).right(step).makeCubeStar(depth-1, material, length/3)
			.left(2*step).makeCubeStar(depth-1, material, length/3);
		// return to start position 
		return this.down(step).back(step);
	}
});

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
    	this.makeCubeStar(depth, material, Math.pow(3,depth), this);
    }
});