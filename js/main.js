/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items The array containing the items.
 */
function shuffle(a) {
  for (let i = a.length; i; i--) {
    let j = Math.floor(Math.random() * i);
    [a[i - 1], a[j]] = [a[j], a[i - 1]];
  }
}

$(document).ready(function() {

  // Defining items
  var items = [
    {
      title: "HTML5 & semantics",
      img: "./img/01.html5.jpg",
      content: "./data/01.html5.md",
      category: "Front-end",
    },
    {
      title: "CSS3 & animations",
      img: "./img/02.css3.jpg",
      content: "./data/02.css3.md",
      category: "Front-end",
    },
    {
      title: "jQuery",
      img: "./img/03.jquery.jpg",
      content: "./data/03.jquery.md",
      category: "Front-end",
    },
    {
      title: "Angular",
      img: "./img/04.angular.jpg",
      content: "./data/04.angular.md",
      category: "Front-end",
    },
    {
      title: "Grunt",
      img: "./img/05.grunt.jpg",
      content: "./data/05.grunt.md",
      category: "Front-end",
    },
    {
      title: "Less",
      img: "./img/06.less.jpg",
      content: "./data/06.less.md",
      category: "Front-end",
    },
    {
      title: "Responsive",
      img: "./img/07.responsive.jpg",
      content: "./data/07.responsive.md",
      category: "Front-end",
    },
    {
      title: "Wordpress",
      img: "./img/08.wordpress.jpg",
      content: "./data/08.wordpress.md",
      category: "Back-end",
    },
    {
      title: "Drupal",
      img: "./img/09.drupal.jpg",
      content: "./data/09.drupal.md",
      category: "Back-end",
    },
    {
      title: "Bolt",
      img: "./img/10.bolt.jpg",
      content: "./data/10.bolt.md",
      category: "Back-end",
    },
    {
      title: "Yii",
      img: "./img/11.yii.jpg",
      content: "./data/11.yii.md",
      category: "Back-end",
    },
    {
      title: "Rails",
      img: "./img/12.rails.jpg",
      content: "./data/12.rails.md",
      category: "Back-end",
    },
    {
      title: "PHP",
      img: "./img/13.php.jpg",
      content: "./data/13.php.md",
      category: "Back-end",
    },
    {
      title: "Symfony",
      img: "./img/14.symfony.jpg",
      content: "./data/14.symfony.md",
      category: "Back-end",
    },
    {
      title: "NodeJS",
      img: "./img/15.nodejs.jpg",
      content: "./data/15.nodejs.md",
      category: "Back-end",
    },
    {
      title: "Static websites",
      img: "./img/16.statics-websites.jpg",
      content: "./data/16.statics-websites.md",
      category: "Other",
    },
    {
      title: "Messenger bots",
      img: "./img/17.messenger-bots.jpg",
      content: "./data/17.messenger-bots.md",
      category: "Other",
    },
    {
      title: "Datamining",
      img: "./img/18.datamining.jpg",
      content: "./data/18.datamining.md",
      category: "Other",
    },
    {
      title: "Team work",
      img: "./img/19.team.jpg",
      content: "./data/19.team.md",
      category: "Other",
    },
    {
      title: "Freelance",
      img: "./img/20.freelance.jpg",
      content: "./data/20.freelance.md",
      category: "Other",
    },
    {
      title: "Package management",
      img: "./img/21.npm.jpg",
      content: "./data/21.npm.md",
      category: "Other",
    },
    {
      title: "Version control",
      img: "./img/22.git.jpg",
      content: "./data/22.git.md",
      category: "Other",
    },
    {
      title: "Scripting",
      img: "./img/23.scripting.jpg",
      content: "./data/23.scripting.md",
      category: "Other",
    },
    {
      title: "Emailings",
      img: "./img/24.emailings.jpg",
      content: "./data/24.emailings.md",
      category: "Other",
    },
    {
      title: "Photoshop",
      img: "./img/25.photoshop.jpg",
      content: "./data/25.photoshop.md",
      category: "Other",
    },
  ];

  var categories = [];
  $.each(items, function(index, value) {
    if (categories.indexOf(value.category) == -1)
      categories.push(value.category);
  })

  shuffle(items);

  // Creating item nodes
  $.each(items, function(index, value) {
    var elem = $('.grid .grid-item.initial').clone();
    $(elem).removeClass('initial');
    $(elem).attr('data-index', index);
    $(elem).find('h3').text(value.title);
    $(elem).find('img').attr('src', value.img);
    $(elem).attr('data-category', value.category);
    $(elem).appendTo('.grid');
  })
  $('.grid-item.initial').remove();

  $.each(categories, function(index, value) {
    $('#filters').append('<a href="#" data-category="' + value + '">' + value + '</a>');
  });

  // Initializing Isotope
  var $grid = $('.grid').isotope({
    itemSelector: '.grid-item',
    layoutMode: 'masonry',
    masonry: {
      columnWidth: 300,
      gutter: 10,
      isFitWidth: true
    }
  });

  $grid.imagesLoaded().progress( function() {
    $grid.isotope('layout');
  });

  // Adding triggers on filters
  function applyFilters() {
    if (!$('#filters a.active').length)
      $grid.isotope({ filter: '' });
    else {
      var category = $('#filters a.active').data('category');
      $grid.isotope({ filter: '[data-category="' + category + '"]' });
    }
  }

  $('#filters a').click(function(e) {
    e.preventDefault();

    $(this).siblings('a').removeClass('active');
    $(this).toggleClass('active');
    applyFilters();
  });

});
