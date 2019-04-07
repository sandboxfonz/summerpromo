(function() {
  // Private: Helper to shuffle things. No one knows how it works.
  //
  // array - an array to be shuffled
  //
  // Returns a new shuffled array (does not modify the original argument)
  function shuffle(array) {
    if (document.hidden) {
      console.log('hidden')
      return;
    }else{
    array = array.slice(0);
    for(var j, x, i = array.length; i; j = parseInt(Math.random() * i), x = array[--i], array[i] = array[j], array[j] = x);
    return array;
    }
  }

  // Private: Helper to set objects on page prior to animation
  //
  // originalPositions - an array of items in their original positions
  // newPositions - an array of shuffle items
  // durations(optional) - an array of integers that determines the speed at which the items move
  //
  // Animates the items to a new location by copying the css properties from the object in the newPositions array with the same index
  function animate(originalPositions, newPositions, durations) {
    originalPositions.each(function(index){
      var animationDuration = durations[Math.floor(Math.random() * durations.length)];
      $(this).animate({ top: newPositions[index].style.top, left: newPositions[index].style.left }, {
        duration: animationDuration, // randomly pick a duration. results in a sleek random shuffling animation
        queue: true // if you don't queue the items will do all the animations at once and things get weird
      });


    })
  }

  // Private: Helper to set objects on page prior to animation
  //
  // container - Jquery object of the containing element of the boxes that are going to be moved
  //
  // Takes the original responsive inline-blocks and positions them absolutely so the boxes can move to set coordinates
  function setExplicitCSSProperties(container) {
    container = $(container);
    container.css('height', container.height());

    var children = container.children();
    children.each(function() {
      $(this).css({
        top: $(this).position().top,
        left: $(this).position().left,
        width: $(this).width(),
        // height: $(this).height()
      });
    })

    children.css({ position: 'absolute' });
  }

  // Public: Shuffle
  $.fn.shuffle = function (options) {

    options = options || {}
    var times = options.times || 1; // Default to 4
    var durations = options.durations || [500, 650, 750, 500, 900]; //default variety of animation times

    //Set coordinates for the moving items so they keep a grid shape
    setExplicitCSSProperties(this);

    return this.each(function(){
      var items = $(this).children();

      //repeat animation multiple times for a shuffle effect
      for(var i = 0; i < times; i++){
        var newItems = shuffle(items);
        animate(items, newItems, durations);
      }


    });

  }
})();

//$(document).ready(function() {
//  setInterval("$('.scontainer').shuffle()",2000);

//});

