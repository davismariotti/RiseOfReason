var RabbitController = {
    // Variables
    $background : null,
    $rabbit : null,
    $fox : null,
    pausedFlag : true,
    testFlag : false,
    init : function() {
		this.$background = $("#FarBackground");
		this.$rabbit = Object.create(Rabbit);
		this.$rabbit.init(this.$background.width());
    this.$fox = Object.create(Fox);
    this.$fox.init();
		$("body").on("keydown", this.KeyPressed.bind(this));
  },
    draw : function() {
      if (this.pausedFlag) {
        return;
      }
      //console.log("hi");
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

      // Draw Hit Boxes
      $("#RabbitHitbox").css('left', parseInt($("#Rabbit").css('left')) + 50);
      $("#RabbitHitbox").css('top', parseInt($("#Rabbit").css('top')) + 20);
      $("#FoxHitbox").css('left', parseInt($("#Fox").css('left')) + 20);
      $("#FoxHitbox").css('top', parseInt($("#Fox").css('top')) + 40);

      /*console.log("Rabbit");
      console.log(this.$rabbit.getBox());
      console.log("Fox");
      console.log(this.$fox.getBox());*/
      //if(this.$rabbit.getBox().overlaps(this.$fox.getBox())) {
      //  console.log("BOOM");
      //}
      if (doTheyCollide($("#RabbitHitbox"), $("#FoxHitbox"))) {
        this.pausedFlag = true;
        $('#StartMenu').show();
      }
		}
  },
  KeyPressed: function(e) {
    if (this.pausedFlag) {
      console.log('JUMP');
      this.pausedFlag = false;
      $('#StartMenu').hide();
      this.resetGame();
      this.draw();
    }
    else {
      console.log(e);
      console.log(this);
      if (e.which == 32) {
        this.$rabbit.jump();
      }
    }
  },
  resetGame: function() {
    //$('#Fox').css('right', 0);
    $('#Rabbit').css('top', 200);
    this.$rabbit.state = "right";
    this.$rabbit.vy = 0;
    this.$rabbit.y = -200;
    this.$rabbit.x = 0;
  }
};

$(document).ready(function () {
    RabbitController.init();
    RabbitController.draw();
});
