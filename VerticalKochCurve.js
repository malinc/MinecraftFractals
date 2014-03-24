/*Usage**************************************************************************
vertKoch(4)
vertKoch(4, '1')
creates a vertical Koch curve of depth 4 using default material, or using the
material '1'=Stone

The maximum depth is 5, vertKoch(5) extends above the maximum altitude of Minecraft.

*******************************************************************************/

var Drone = require('../drone/drone').Drone; 

Drone.extend('makeVertCurve', function(depth, material, verticalDir) {
	if (depth == 0 ) {
		if (verticalDir == 'forward') {
			this.box(material, 1, 1, 3).fwd(2);
		} else if (verticalDir == 'back') {
			this.back(2).box(material, 1, 1, 3);
		} else if (verticalDir == 'up') {
			this.box(material, 1, 3, 1).up(2);
		} else {
			this.down(2).box(material, 1, 3, 1);
		}
	} else {
		if (verticalDir == 'forward') {
			this
				.makeVertCurve(depth-1, material, 'forward')
				.makeVertCurve(depth-1, material, 'up')
				.makeVertCurve(depth-1, material, 'forward')
				.makeVertCurve(depth-1, material, 'down')
				.makeVertCurve(depth-1, material, 'forward');
		} else if (verticalDir == 'back') {
			this
				.makeVertCurve(depth-1, material, 'back')
				.makeVertCurve(depth-1, material, 'down')
				.makeVertCurve(depth-1, material, 'back')
				.makeVertCurve(depth-1, material, 'up')
				.makeVertCurve(depth-1, material, 'back');
		} else if (verticalDir == 'up') {
			this
				.makeVertCurve(depth-1, material, 'up')
				.makeVertCurve(depth-1, material, 'back')
				.makeVertCurve(depth-1, material, 'up')
				.makeVertCurve(depth-1, material, 'forward')
				.makeVertCurve(depth-1, material, 'up');
		} else {
			this
				.makeVertCurve(depth-1, material, 'down')
				.makeVertCurve(depth-1, material, 'forward')
				.makeVertCurve(depth-1, material, 'down')
				.makeVertCurve(depth-1, material, 'back')
				.makeVertCurve(depth-1, material, 'down');
		} 
	}
	return this;
});

Drone.extend('vertKoch', function(depth, material){
	if ( typeof depth == 'undefined') {
        depth = 1;
    }
    if ( typeof material == 'undefined' ) {
        material = '152';
    }
    if (depth < 0 || depth > 5) {
    	this.sign(["Try", "vertKoch(d)", "with", "0<=d<=5"], 63);
    } else {
    	this.makeVertCurve(depth, material, 'forward');
    }
});