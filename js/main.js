$(document).ready(function() {

  $('.grid').isotope({
    itemSelector: '.grid-item',
    layoutMode: 'masonry',
    masonry: {
      columnWidth: 250,
      gutter: 25
    }
  });

});
