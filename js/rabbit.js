/**
 * Created by kjones on 12/18/2014.
 */
var Rabbit = {
	prev_state : 'right', // Stores the previous state
	state : 'right', // run, jump;
	maxy : 10,
	y : -200,   // y position for jump
	vy_start: 18, // initial velocity in vy
	vy : 0,  // velocity for jump in y
	vymax : 52, // max velocity in y
	a : -0.75,  // Acceleration for jump
  x : 0, // position in x
  vx : -12,  // velocity in x
  images : {
		run : "img/rabbit.gif",
		jump : "img/rabbit.gif",
	},
  $sprites: null,
	width: null,
	init : function( width ) {
        // Put the coyote on the screen
		this.width = width;
		this.$sprites = $.preload( this.images );
    $('div#Rabbit').empty().append(this.$sprites['right']);
  },
	change_image : function( img ) {
		var last;
		if ( img !== last )
			$('div#Rabbit').empty().append(this.$sprites[img]);
		last = img;
	},
	right : function () { this.state = 'right'},
	jump : function() {
		if ( this.state !== 'jump' && this.vy <= this.vymax ) {
			this.state = 'jump';
			this.vy += this.vy_start;
			this.jump();
		}
	},
  run : function() {
    if ( this.state === 'jump' ) {
			this.vy += this.a;
      this.y += this.vy;
      // limit y value for jump
      // if ( this.y > this.maxy ) this.y = this.maxy; //I commented out this to get the y-position that I wanted
      // Check to see if the jump is finished
      if ( this.y < -200  && this.state === 'jump' ) {
        this.vy = 0;
				this.y = -200;
        this.right();
      }
    }
    // Check to see if all the background images have wrapped around
    if (this.x * (1.0 / 100.0) <= -this.width) {
      this.x = 0;
    }

    // update the x position of the coyote
    this.x = this.x + this.vx;
		console.log(this.x);

    // Switch to the appropriate image based on the state of the coyote
    this.change_image( this.state );

    // move the current coyote image into position
    $('#Rabbit').css('top', (-this.y) );
  },
  getBox : function() {
		//console.log(this.y);
    return new Box($('#RabbitHitbox').css('left'), $('#RabbitHitbox').css('top'), 200, 200);
  }

}
