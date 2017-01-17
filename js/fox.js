var Fox = {
  x : 0,
  y : 0,
  spawned : false,
  $sprites: null,
  images : {
		run : "img/fox.gif",
	},
  init : function() {
    this.$sprites = $.preload(this.images);
    this.y = $('#Fox').css('top');
    //$('div#Fox').empty().append(this.$sprites['run']);
  },
  getBox : function() {
    return new Box($('#FoxHitbox').css('left'), $('#FoxHitbox').css('top'), 200, 200);
  }
}
