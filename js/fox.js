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
    //$('div#Fox').empty().append(this.$sprites['run']);
  }
}
