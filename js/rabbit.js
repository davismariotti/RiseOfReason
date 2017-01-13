(function($){

    var position = 0;
    var speed = 6;
    var $background = $("#FarBackground");

    var requestAnimFrame = (function(){
        if (window.requestAnimationFrame) return window.requestAnimationFrame;
        if (window.webkitRequestAnimationFrame) return window.webkitRequestAnimationFrame;
        if (window.mozRequestAnimationFrame) return window.mozRequestAnimationFrame;
        if (window.oRequestAnimationFrame) return window.oRequestAnimationFrame;
        if (window.msRequestAnimationFrame) return window.msRequestAnimationFrame;
        else return  function( callback, element ){
            window.setTimeout(callback, element);
        };
    })();

    function draw() {
      requestAnimFrame(draw,25);

      // Update the position of each background layer
      $('#Clouds').css('background-position', (position * (1.0/6.0)) );
      $('#Background').css('background-position', (position * (1.0/3.0)) );
      $('#Midground').css('background-position', (position * (2.0/3.0)) );
      $('#Foreground').css('background-position', (position * (1.0))  );

      // Update position
      position = position - speed;

      // Once the slowest moving background has wrapped, reset position
      if ( position* (1.0/12.0) < -$background.width() ) {
          position = 0;
      }
    }

    // Start the animation
    draw();
})(jQuery);
