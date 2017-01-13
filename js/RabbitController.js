var RabbitController = {
    // Variables
    $background : null,
    $rabbit : null,
    init : function() {
		this.$background = $("#FarBackground");
		this.$rabbit = Object.create(Rabbit);
		this.$rabbit.init(this.$background.width());
		$("body").click( this.$rabbit.jump.bind(this.$rabbit) );
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
		}
    }
};

$(document).ready(function () {
    RabbitController.init();
    RabbitController.draw();
});
