/*Usage**************************************************************************
tree(2)
tree(2, '1')
creates a tree of depth 2 using default material, 
or (in the second case) using the material '1'=Stone

The maximum depth is 7.
tree(7) takes 547 seconds.
****************************************************************/

var Drone = require('../drone/drone').Drone; 

Drone.extend('makeTree', function(depth, material, length) {
	if (depth == 0 ) {
		this.box(material, 1, 1, 1);
	} else {
		this
			.box(material, length, length, length)
			.up(length).back(length/2).left(length/2).tree(depth-1, material, length/2)
			.right(length+length/2).tree(depth-1, material, length/2)
			.fwd(length+length/2).tree(depth-1, material, length/2)
			.left(length+length/2).tree(depth-1, material, length/2);
		return this.down(length).back(length).right(length/2);
	}
});

Drone.extend('tree', function(depth, material){
	if ( typeof depth == 'undefined') {
        depth = 1;
    }
    if ( typeof material == 'undefined' ) {
        material = '80';
    }
    if (depth < 0 || depth > 7) {
    	this.sign(["Try", "tree(d)", "with", "0<=d<=7"], 63);
    } else {
    	this.makeTree(depth, material, Math.pow(2,depth), this);	
    }
});