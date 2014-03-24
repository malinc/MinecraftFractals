/*Usage**************************************************************************
mc(2)
mc(2, '41', '42')
creates the complement of a Menger sponge of depth 2 using default materials, 
or (in the second case) using the materials 41 (=Gold ) and 42 (=Iron)

The maximum depth is 4.
mc(4) takes approximately 5895 sec.
mc(0) is empty.
****************************************************************/

var Drone = require('../drone/drone').Drone; 

//the recursive method
Drone.prototype.makeComplement = function(depth, material1, material2, length) {
	if (depth > 0) {
		var mat = (depth==1) ? material1 : material2;
		for(var k=0; k<3; k++) {
			for(var i=0; i<3; i++) {
				for (var j=0; j<3; j++) {
					if ( (i==1 && j==1) || (i==1 && k==1) || (j==1 && k==1)) {
						this.box(mat, length, length, length).fwd(length);
					} else {
						this.makeComplement(depth-1, material1, material2, length/3).fwd(length);
					}

				}
				this.back(3*length).right(length);
			}
			this.left(3*length).up(length);
		}
		this.down(3*length);
	}
	return this;
};

Drone.extend('mc', function(depth, material1, material2){
	if ( typeof depth == 'undefined') {
        depth = 1;
    }
    if ( typeof material1 == 'undefined') {
        material1 = 79;  //ice
    }
    if ( typeof material2 == 'undefined') {
        material2 = 152;  //redstone block;
    }
     if (depth < 0 || depth > 4) {
    	this.sign(["Try", "mc(d)", "with", "0<=d<=4"], 63);
    } else {
    	this.makeComplement(depth, material1, material2, Math.pow(3,depth-1), this);
    }
});