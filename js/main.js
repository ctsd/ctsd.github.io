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
      img: "./img/01.html5.png",
      content: "./data/01.html5.md",
      category: "Front-end",
    },
    {
      title: "CSS3 & animations",
      img: "./img/02.css3.png",
      content: "./data/02.css3.md",
      category: "Front-end",
    },
    {
      title: "jQuery",
      img: "./img/03.jquery.png",
      content: "./data/03.jquery.md",
      category: "Front-end",
    },
    {
      title: "Angular",
      img: "./img/04.angular.png",
      content: "./data/04.angular.md",
      category: "Front-end",
    },
    {
      title: "Grunt",
      img: "./img/05.grunt.png",
      content: "./data/05.grunt.md",
      category: "Front-end",
    },
    {
      title: "Less",
      img: "./img/06.less.png",
      content: "./data/06.less.md",
      category: "Front-end",
    },
    {
      title: "Responsive",
      img: "./img/07.responsive.png",
      content: "./data/07.responsive.md",
      category: "Front-end",
    },
    {
      title: "Wordpress",
      img: "./img/08.wordpress.png",
      content: "./data/08.wordpress.md",
      category: "Back-end",
    },
    {
      title: "Drupal",
      img: "./img/09.drupal.png",
      content: "./data/09.drupal.md",
      category: "Back-end",
    },
    {
      title: "Bolt",
      img: "./img/10.bolt.png",
      content: "./data/10.bolt.md",
      category: "Back-end",
    },
    {
      title: "Yii",
      img: "./img/11.yii.png",
      content: "./data/11.yii.md",
      category: "Back-end",
    },
    {
      title: "Rails",
      img: "./img/12.rails.png",
      content: "./data/12.rails.md",
      category: "Back-end",
    },
    {
      title: "PHP",
      img: "./img/13.php.png",
      content: "./data/13.php.md",
      category: "Back-end",
    },
    {
      title: "Symfony",
      img: "./img/14.symfony.png",
      content: "./data/14.symfony.md",
      category: "Back-end",
    },
    {
      title: "NodeJS",
      img: "./img/15.nodejs.png",
      content: "./data/15.nodejs.md",
      category: "Back-end",
    },
    {
      title: "Static websites",
      img: "./img/16.statics-websites.png",
      content: "./data/16.statics-websites.md",
      category: "Other",
    },
    {
      title: "Messenger bots",
      img: "./img/17.messenger-bots.png",
      content: "./data/17.messenger-bots.md",
      category: "Other",
    },
    {
      title: "Datamining",
      img: "./img/18.datamining.png",
      content: "./data/18.datamining.md",
      category: "Other",
    },
    {
      title: "Team work",
      img: "./img/19.team.png",
      content: "./data/19.team.md",
      category: "Other",
    },
    {
      title: "Freelance",
      img: "./img/20.freelance.png",
      content: "./data/20.freelance.md",
      category: "Other",
    },
    {
      title: "Package management",
      img: "./img/21.npm.png",
      content: "./data/21.npm.md",
      category: "Other",
    },
    {
      title: "Version control",
      img: "./img/22.git.png",
      content: "./data/22.git.md",
      category: "Other",
    },
    {
      title: "Scripting",
      img: "./img/23.scripting.png",
      content: "./data/23.scripting.md",
      category: "Other",
    },
    {
      title: "Emailings",
      img: "./img/24.emailings.png",
      content: "./data/24.emailings.md",
      category: "Other",
    },
    {
      title: "Photoshop",
      img: "./img/25.photoshop.png",
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

  $('.grid-item').click(function() {
    var id = $(this).data('index');
    $.get({
      url: items[id].content,
      cache: false
    }).then(function(data) {
      var converter = new showdown.Converter();
      var html = converter.makeHtml(data);

      $('.overlay .wrapper').html('');
      $('.overlay .wrapper').append('<h2></h2>');
      $('.overlay .wrapper h2').text(items[id].title);

      $('.overlay .wrapper').append(html);
      $('.overlay .wrapper a').attr('rel', 'nofollow');
      $('.overlay .wrapper a').attr('target', '_BLANK');
      $('.overlay').addClass('active');
    });
  });
  $('.overlay .exit').click(function() { $(this).closest('.overlay').removeClass('active') });

});
