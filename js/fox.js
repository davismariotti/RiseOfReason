var Fox = {
  x : 0,
  y : 0,
  spawned : false,
  $sprites: null,
  images : {
		run : "img/fox.gif",
	},
  init : function() {
    this.y = $('#Fox').css('top');
  },
  getBox : function() {
    return new Box($('#FoxHitbox').css('left'), $('#FoxHitbox').css('top'), 200, 200);
  }
}
