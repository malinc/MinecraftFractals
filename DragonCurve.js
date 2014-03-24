/*Usage**************************************************************************
dragon(2)
dragon(2, 41, 42)
create a right & left dragon curve, each of depth 2, starting 
at the same point, using default material, 
or (in the second case) using the materials 41 (=Gold ) and 42 (=Iron)

dr(2)	
dr(2, '1')
dl(2)	
dl(2, '1')
create either a right or a left dragon curve
		
The maximum depth is 7. 
dragon(7) takes approximately 3277 seconds (2*4^7 tenths of a second) to make.
2*depth corresponds to the number of foldings when compared to
folding a paper. A curve created with depth = 7 is the curve you would 
get if keep folding a paper (to the right or to the left) 14 times, 
and then unfolding it to right angles.
*************************************************************/

var Drone = require('../drone/drone').Drone; 


//the recursive method
Drone.prototype.dragonRight = function(depth, length, material) {
	if (depth == 0 ) {
		this.box(material, 1, 1, length);
		return this.fwd(length);
	} else {
		this
			.turn(3)
			.dragonRight(depth-1, length/2, material)
			.turn(1)
			.dragonLeft(depth-1, length/2, material)
			.turn(1)
			.dragonRight(depth-1, length/2, material)
			.turn(3)
			.dragonLeft(depth-1, length/2, material); 
		return this;
	}
};

//the recursive method
Drone.prototype.dragonLeft = function(depth, length, material) {
	if (depth == 0 ) {
		this.box(material, 1, 1, length);
		return this.fwd(length);;
	} else {
		this
			.dragonRight(depth-1, length/2, material)
			.turn(1)
			.dragonLeft(depth-1, length/2, material)
			.turn(3)
			.dragonRight(depth-1, length/2, material)
			.turn(3)
			.dragonLeft(depth-1, length/2, material) 
			.turn(1);
		return this;
	}
};

Drone.extend('dr', function(depth, material){
	if ( typeof depth == 'undefined') {
        depth = 1;
    }
    if ( typeof material == 'undefined' ) {
        material = '41';
    }
    if (depth < 0 || depth > 7) {
    	this.sign(["Try", "dr(d)", "with", "0<=d<=7"], 68);
    } else {
    	this.dragonRight(depth, Math.pow(2, depth+1), material);
    }
});

Drone.extend('dl', function(depth, material){
	if ( typeof depth == 'undefined') {
        depth = 1;
    }
    if ( typeof material == 'undefined' ) {
        material = '41';
    }
    if (depth < 0 || depth > 7) {
    	this.sign(["Try", "dl(d)", "with", "0<=d<=7"], 68);
    } else {
    	this.dragonLeft(depth, Math.pow(2, depth+1), material);
    }
});



Drone.extend('dragon', function(depth, material1, material2){
	if ( typeof depth == 'undefined') {
        depth = 1;
    }
    if ( typeof material1 == 'undefined' ) {
        material1 = '41';
    }
    if ( typeof material2 == 'undefined' ) {
        material2 = '42';
    }
    if (depth < 0 || depth > 7) {
    	this.sign(["Try", "dragon(d)", "with", "0<=d<=7"], 63);
    } else {
    	var dr1 = new Drone();
	    var dr2 = new Drone();
	    dr1.dragonRight(depth, Math.pow(2, depth+1), material1);
	    dr2.dragonLeft(depth, Math.pow(2, depth+1), material2);
    }
});