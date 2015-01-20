$(function(){

  var PP = {};
  PP.CircleMenu = {
    lastTransition: "",
    currentHash: "",
    currentIndex: 0,
    states: [],
    createHash: function() {
      return Math.random().toString(36).substring(10);
    },
    saveState: function() {
      var newHash = this.createHash();
      this.states.push({
        content: $('.js-viewport-current').html(),
        hash: newHash,
        scroll: $('.js-viewport-current').scrollTop()
      });
      this.currentHash = newHash;
    },
    saveStateScroll: function() {
      this.states[this.currentIndex].scroll = $('.js-viewport-current').scrollTop();
    }
  };

  PP.CircleMenu.createHash();
  PP.CircleMenu.saveState();

  var hammer = new Hammer(document.querySelector('.js-vpt-ctnr'), {});
  var scaleTimeout;
  $('.js-circle').on('click', function() {
    $('.js-circle').toggleClass('rotate');
    $('.js-menu-holder').toggleClass('open');
  });

  hammer.on('swipeleft', function() {
    console.log('swipeleft');
    if (PP.CircleMenu.currentIndex !== PP.CircleMenu.states.length -1) {
      PP.CircleMenu.currentIndex++;
      PP.CircleMenu.lastTransition = "left";
      changeViewport();
    }
  });

  hammer.on('swiperight', function() {
    console.log('swiperight');
    if (PP.CircleMenu.states.length > 1 && PP.CircleMenu.currentIndex > 0) {
      PP.CircleMenu.currentIndex--;
      PP.CircleMenu.lastTransition = "right";
      changeViewport();
    }
  })

  $('.js-slide-change').on('click', function() {
    PP.CircleMenu.currentIndex++;
    $('.js-circle').toggleClass('rotate');
    $('.js-menu-holder').toggleClass('open');
    PP.CircleMenu.lastTransition = "left";
    changeViewport();
  });

  document.querySelector('.js-vpt-ctnr').addEventListener('webkitTransitionEnd', function() {
    var direction = PP.CircleMenu.lastTransition;
    var jsClass = PP.CircleMenu.lastTransition === "left" ? "js-viewport-next" : "js-viewport-prev";

    $('.js-viewport-current').remove();
    $('.' + jsClass).removeClass('js-viewport-next').addClass('js-viewport-current')

    if (PP.CircleMenu.lastTransition === "left") {
      $('.js-vpt-ctnr').append('<div class="viewport ' + jsClass + '"></div>').removeClass(direction);
    } else {
      $('.js-vpt-ctnr').prepend('<div class="viewport ' + jsClass + '"></div>').removeClass(direction);
    }

    if (!PP.CircleMenu.states[PP.CircleMenu.currentIndex]) {
      PP.CircleMenu.saveState();
    }

    $('.js-viewport-current').on('scroll.saveState', function() {
      PP.CircleMenu.saveStateScroll();
    });
    
  });

  $('.js-viewport-current').on('scroll.saveState', function() {
    PP.CircleMenu.saveStateScroll();
  });

  function changeViewport() {
    var jsClass = PP.CircleMenu.lastTransition === "left" ? "js-viewport-next" : "js-viewport-prev";

    var appendInfo = function(r, s) {
      $('.viewport').not('.js-viewport-current').scrollTop(0);
      $('.js-viewport-current').off('scroll.saveState')

      var newViewport = $('.'+jsClass);
      if (PP.CircleMenu.lastTransition === "left") {
        newViewport.append(r);
      } else {
        newViewport.prepend(r);
      }
      $('.js-vpt-ctnr').addClass(PP.CircleMenu.lastTransition);
      if (s) {
        newViewport.scrollTop(s);
      }
    }

    if (PP.CircleMenu.states[PP.CircleMenu.currentIndex]) {
      appendInfo(PP.CircleMenu.states[PP.CircleMenu.currentIndex].content, PP.CircleMenu.states[PP.CircleMenu.currentIndex].scroll);
    } else {
      $.ajax({
        //replace me with your content
        url: "partials/lorem_ipsum.html",
        type: "GET",
        success: function(r) {
          appendInfo(r);
        }
      });
    }
  }
});