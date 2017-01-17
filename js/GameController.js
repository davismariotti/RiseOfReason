var RabbitController = {
    // Variables
    $background : null,
    $rabbit : null,
    $fox : null,
    init : function() {
		this.$background = $("#FarBackground");
		this.$rabbit = Object.create(Rabbit);
		this.$rabbit.init(this.$background.width());
    this.$fox = Object.create(Fox);
    this.$fox.init();
		$("body").on("keydown", this.rabbitJump.bind(this));
  },
    draw : function() {
      requestAnimFrame( RabbitController.draw.bind(this), 25);
  		if ( typeof this.$rabbit != "undefined" ) {
  			this.$rabbit.run();
  			var xpos = this.$rabbit.x;
  			var ypos = this.$rabbit.y;
  			$('#Clouds').css('background-position', (xpos * (1.0 / 6.0)));
  			$('#Background').css('background-position', (xpos * (1.0 / 3.0)));
  			$('#Midground').css('background-position', (xpos * (2.0 / 3.0)));
  			$('#Foreground').css('background-position', (xpos * (1.0)));
      if (typeof this.$fox != "undefined") {
        //console.log(this.$rabbit.x);
        //console.log(this.$rabbit.x * (2.0 / 3.0));
        $('#Fox').css('right', (-(this.$rabbit.x) % $(document).width()));
        this.$fox.x = parseInt($('#Fox').css('left'));
        //console.log($('#fox').css('right'));
      }

      console.log("Rabbit");
      console.log(this.$rabbit.getBox());
      console.log("Fox");
      console.log(this.$fox.getBox());
      if(this.$rabbit.getBox().contains(this.$fox.getBox())) {
        console.log("BOOM");
      }

		}
  },
  rabbitJump: function(e) {
    console.log(e);
    console.log(this);
    if (e.which == 32) {
      this.$rabbit.jump();
    }
  },
  spawnFox: function() {
    this.$fox.x = this.$background.width();
  }
};

$(document).ready(function () {
    RabbitController.init();
    RabbitController.draw();
});
