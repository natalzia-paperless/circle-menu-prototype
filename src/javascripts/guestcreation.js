if (!$('.guest-cntr').length) {
  $.ajax({
    url: "http://api.randomuser.me/?results=20",
    type: "GET",
    success: function(r) {
      var results = r.results;
      for (var i = 0; i < results.length; i++) {
        var user = results[i].user;
        var fn = user.name.first;
        var ln = user.name.last;
        var profpic = user.picture.medium;

        var container = $('<div class="guest-cntr js-slide-change" data-partial="partials/messages_panel.html"></div>');
        var picEl = $('<img class="guest-pic" src="' + profpic + '" />');
        var nameEl = $('<div class="guest-name">' + fn + " " + ln + '</div>');

        container.append(nameEl);
        container.append(picEl);
        $('.js-loading').remove();
        $('.js-guest-list').append(container);
        if ($('.js-guest-list').length)
          PP.CircleMenu.saveContent();
      }
    }
  });  
}