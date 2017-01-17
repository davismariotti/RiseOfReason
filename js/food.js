var Food = {
  x : 0,
  y : 0,
  uniqueId : null,
  spawn : function(count) {
    this.uniqueId = count + 1;
    $('.container').append('<div class="food" id="food' + this.uniqueId + '"></div>');
    if (Math.random() >= 0.5) {
      $('#food' + this.uniqueId).css('top', 250);
    }
    else {
      $('#food' + this.uniqueId).css('top', 100);
    }
    $('#food' + this.uniqueId).css('right', 0);
    console.log(parseInt($('#Fox').css('right')));
  },
  deleteDiv : function() {
    $('#food' + this.uniqueId).remove();
  },
  getBox : function() {
    return new Box($('#FoxHitbox').css('left'), $('#FoxHitbox').css('top'), 200, 200);
  }
}
