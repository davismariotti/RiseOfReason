var RabbitController = {
    // Variables
    $background : null,
    $rabbit : null,
    $fox : null,
    $food : [],
    pausedFlag : true,
    wasPaused : true,
    score : 0,
    init : function() {
		this.$background = $("#FarBackground");
		this.$rabbit = Object.create(Rabbit);
		this.$rabbit.init(this.$background.width());
    this.$fox = Object.create(Fox);
    this.$fox.init();
    $('#Score').html("Score: " + this.score);
		$("body").on("keydown", this.KeyPressed.bind(this));
  },
    draw : function() {
      if (this.pausedFlag) {
        return;
      }
      if (this.wasPaused) {
        this.wasPaused = false;
        totalSeconds = 0;
        console.log("UNPAUSED");
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
      if (this.$food.length == 1) {
        if (parseInt($('#food' + this.$food[0].uniqueId).css('right')) > parseInt($('#Background').css('width'))) {
          // Food has left bounds of screen
          this.$food[0].deleteDiv();
          this.$food.shift();
        }
        else {
          $('#food' + this.$food[0].uniqueId).css('right', parseInt($('#food' + this.$food[0].uniqueId).css('right')) + 12);
        }
      }
      else if (parseInt($('#Fox').css('right')) > 150 && parseInt($('#Fox').css('left')) > 150 && this.$food.length < 1) {
        if (Math.random() <= 0.03)
        {
          console.log("SPAWNING FOOD");
          this.$food.push(Object.create(Food));
          this.$food[0].spawn(0);
        }
      }

      // Draw Hit Boxes
      $("#RabbitHitbox").css('left', parseInt($("#Rabbit").css('left')) + 50);
      $("#RabbitHitbox").css('top', parseInt($("#Rabbit").css('top')) + 20);
      $("#FoxHitbox").css('left', parseInt($("#Fox").css('left')) + 20);
      $("#FoxHitbox").css('top', parseInt($("#Fox").css('top')) + 40);
      $("#FoodHitbox").css('left', parseInt($("#food1").css('left')));
      $("#FoodHitbox").css('top', parseInt($("#food1").css('top')));

      /*console.log("Rabbit");
      console.log(this.$rabbit.getBox());
      console.log("Fox");
      console.log(this.$fox.getBox());*/
      //if(this.$rabbit.getBox().overlaps(this.$fox.getBox())) {
      //  console.log("BOOM");
      //}
      if (doTheyCollide($("#RabbitHitbox"), $("#FoodHitbox"))) {
        if (this.$food.length == 1)
        {
          this.$food[0].deleteDiv();
          this.$food.shift();
          $('#Score').html("Score: " + ++this.score);
        }
      }
      if (doTheyCollide($("#RabbitHitbox"), $("#FoxHitbox"))) {
        this.pausedFlag = true;
        this.wasPaused = true;
        if (this.$food.length == 1)
        {
          this.$food[0].deleteDiv();
          this.$food.shift();
        }
        $('#MenuText').html('<h2>You Died</h2>Score: ' + this.score + '</div>');
        $('h2').css('color', 'red');
        $('#Fox').hide();
        $('#StartMenu').show();
        $('#Score').html("Score: " + 0);
        this.score = 0;
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
    $('#Fox').show();
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
