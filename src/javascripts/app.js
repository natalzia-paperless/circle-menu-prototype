var PP = {};
$(function(){
  PP.CircleMenu = {
    lastTransition: "",
    currentHash: "",
    currentIndex: 0,
    states: [],
    canTransition: true,
    createHash: function() {
      return Math.random().toString(36).substring(10);
    },
    saveState: function() {
      var newHash = this.createHash();
      this.states.push({
        content: PP.CircleMenu.currentComponent ? PP.CircleMenu.currentComponent.state : $('.js-viewport-current').html(),
        hash: newHash,
        scroll: $('.js-viewport-current').scrollTop(),
        partial: PP.CircleMenu.currentPartial 
      });
      this.currentHash = newHash;
    },
    saveStateScroll: function() {
      this.states[this.currentIndex].scroll = $('.js-viewport-current').scrollTop();
    },
    saveContent: function() {
      this.states[this.currentIndex].content = $('.js-viewport-current').html();
    }
  };

  PP.CircleMenu.createHash();
  PP.CircleMenu.saveState();

  var hammer = new Hammer(document.querySelector('.js-vpt-ctnr'), {});

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

  $('body').on('click', '.js-slide-change', function() {
    // PP.CircleMenu.currentIndex++;
    // $('.js-circle').removeClass('rotate');
    // $('.js-menu-holder').removeClass('open');
    // //Change based on what is selected
    // PP.CircleMenu.lastTransition = "left";
    // PP.CircleMenu.currentPartial = $(this).data('partial');
    // changeViewport();

    /*if ($('.text-el').length) {
      PP.CircleMenu.reactComponent.setState({
        text: Math.random().toString(36).substring(10)
      });
      $('.text-el').removeClass('text-el').addClass('remove-el');
    } else if ($('.remove-el').length) {
      PP.CircleMenu.reactState = PP.CircleMenu.reactComponent.state;
      React.unmountComponentAtNode(document.getElementById('react-container'));
    } else {
      PP.CircleMenu.reactComponent = React.render(
        React.createElement(ReactComponents.GuestList),
        document.getElementById('react-container')
      );
      if (PP.CircleMenu.reactState) {
        PP.CircleMenu.reactComponent.setState(PP.CircleMenu.reactState);
      }
    }*/

    var key = Math.random().toString(36).substring(10);
    PP.CircleMenu.currentIndex++;
    PP.CircleMenu.currentPartial = key;
    $('.js-circle').removeClass('rotate');
    $('.js-menu-holder').removeClass('open');
    PP.CircleMenu.lastTransition = "left";

    changeViewport();
    
  });

  document.querySelector('.js-vpt-ctnr').addEventListener('webkitTransitionEnd', onTransitionEnd);

  $('.js-viewport-current').on('scroll.saveState', function() {
    PP.CircleMenu.saveStateScroll();
  });

  function changeViewport() {
    if (!PP.CircleMenu.canTransition)
      return;

    PP.CircleMenu.canTransition = false;

    var appendInfo = function(r, s) {
      var jsClass = PP.CircleMenu.lastTransition === "left" ? "js-viewport-next" : "js-viewport-prev";

      $('.viewport').not('.js-viewport-current').scrollTop(0);
      $('.js-viewport-current').off('scroll.saveState')

      var newViewport = $('.'+jsClass);
      var content = r;

      /*if (PP.CircleMenu.lastTransition === "left") {
        newViewport.append(r);
      } else {
        newViewport.prepend(r);
      }*/
      //$('.js-vpt-ctnr').addClass(PP.CircleMenu.lastTransition);
      //testing velocity
      var value = PP.CircleMenu.lastTransition === "left" ? -200 : 0;
      $('.js-vpt-ctnr').velocity({
        left: value + "%"
      }, "ease", 350, onTransitionEnd);
      if (s) {
        newViewport.scrollTop(s);
      }

      PP.CircleMenu.currentComponent = PP.CircleMenu.reactComponent = React.render(
        React.createElement(ReactComponents.GuestList),
        document.querySelector('.'+jsClass)
      );

      PP.CircleMenu.currentComponent.setState(r);
    }

    if (PP.CircleMenu.states[PP.CircleMenu.currentIndex]) {
      appendInfo(PP.CircleMenu.states[PP.CircleMenu.currentIndex].content, PP.CircleMenu.states[PP.CircleMenu.currentIndex].scroll);
    } else {
      var states = PP.CircleMenu.states;
      for (var i = 0; i < states.length; i++) {
        var s = states[i];
        if (s.partial === PP.CircleMenu.currentPartial) {
          if (PP.CircleMenu.currentIndex === i) {
            // if the next index is this partial
            appendInfo(s.content, s.scroll);
            return;
          } else if ((PP.CircleMenu.currentIndex - 1) === i) {
            //you're already on that panel dude
            PP.CircleMenu.currentIndex--;
            PP.CircleMenu.canTransition = true;
            return;
          }
          states.splice(1, PP.CircleMenu.states.length); //remove all but first element
          PP.CircleMenu.currentIndex = 1;
          appendInfo(s.content, s.scroll);
          return;
        }
      }

      PP.CircleMenu.states.splice(PP.CircleMenu.currentIndex, PP.CircleMenu.states.length);

      appendInfo({});

      /*var ajaxUrl = PP.CircleMenu.currentPartial;
      $.ajax({
        url: ajaxUrl,
        type: "GET",
        success: function(r) {
          appendInfo(r);
        }
      });*/
    }
  }

  function onTransitionEnd() {
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
    //testing velocity animation
    $('.js-vpt-ctnr').css('left','-100%');

    PP.CircleMenu.canTransition = true;

    $('.js-viewport-current').on('scroll.saveState', function() {
      PP.CircleMenu.saveStateScroll();
    });
  }

});