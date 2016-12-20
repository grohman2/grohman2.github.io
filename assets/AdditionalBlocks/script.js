(function($) {

  var slideEventFlag = false;
  $(document).on('add.cards change.cards', function(event) {
    if (!$(event.target).hasClass('mbr-slider-ext')) return;

    $(this).on('slid.bs.carousel', function(par1, par2) {
      if ($(par1.relatedTarget).closest('section').hasClass('mbr-slider-ext')) {
        $(par1.relatedTarget).parent().find('.carousel-item').not('.prev.right').removeClass('kenberns');
        $(par1.relatedTarget).addClass('kenberns');
      }
    })
  });


  // IN BUILDER
  if ($('html').hasClass('is-builder')) {
    $(document).on('add.cards change.cards', function(event) {
      if ((!$(event.target).hasClass('extTestimonials1')) &&
        (!$(event.target).hasClass('extTestimonials3'))) return;

      setTimeout(function(){$(window).trigger('resize');},100);

      if ($(event.target).hasClass('extTestimonials3')) {

        // Show multiple slides at once
        var visibleSlides = $(event.target).find('.carousel-inner').attr('data-visible');

        $(event.target).find('.carousel-inner').attr('class', 'carousel-inner slides' + visibleSlides);
        $(event.target).find('.clonedCol').remove();
        $(event.target).find('.carousel-item .col-md-12').each(function() {
          if (visibleSlides < 2) {
            $(this).attr('class', 'col-md-12');
          } else if (visibleSlides == 5) {
            $(this).attr('class', 'col-md-12 col-lg-15');
          } else {
            $(this).attr('class', 'col-md-12 col-lg-' + 12/visibleSlides);
          }
        });

        $(event.target).find('.carousel-item').each(function() {
          var itemToClone = $(this);

          for (var i = 1; i < visibleSlides; i++) {
            itemToClone = itemToClone.next();

            // wrap around if at end of item collection
            if (!itemToClone.length) {
              itemToClone = $(this).siblings(':first');
            }

            var index = itemToClone.index();
            // grab item, clone, add marker class, add to collection
            itemToClone.find('.col-md-12:first').clone(true)
              .addClass("cloneditem-"+(i)).addClass("clonedCol").attr('data-cloned-index',index)
              .appendTo($(this).children().eq(0));
          }
        });
      }

      var _this = this;
      if ($(event.target).hasClass('extTestimonials3')&&!slideEventFlag) {
        slideEventFlag =true;

        $(this).on('slide.bs.carousel', 'section.extTestimonials3', function(event) {
          var visibleSlides = $(event.target).find('.carousel-inner').attr('data-visible');
          // Refresh all slides
          $(event.target).find('.clonedCol').remove();
          $(event.target).find('.carousel-item').each(function() {
            var itemToClone = $(this);

            for (var i = 1; i < visibleSlides; i++) {
              itemToClone = itemToClone.next();

              // wrap around if at end of item collection
              if (!itemToClone.length) {
                itemToClone = $(this).siblings(':first');
              }

              var index = itemToClone.index();
              // grab item, clone, add marker class, add to collection
              itemToClone.find('.col-md-12:first').clone(true)
                .addClass("cloneditem-"+(i)).addClass("clonedCol").attr('data-cloned-index',index)
                .appendTo($(this).children().eq(0));
            }
          });
        });
      }
    });
  }


  // AFTER PUBLISH
  if (!$('html').hasClass('is-builder')) {
    // extTestimonials cards height fix
    if ($('section.extTestimonials1:not(.extTestimonials5)').length > 0) {
      $(window).on('resize', function() {
        var sections = $('section.extTestimonials1:not(.extTestimonials5)');
        sections.each(function() {
          var _this = this;
          var slideHeight = [];
          var index = $(this).find('.carousel-item.active').index();
          $(this).find('.carousel-item .card-block').css('min-height', '0');
          $(this).find('.carousel-item').addClass('active');
          $(this).find('.carousel-item').each(function() {
            slideHeight.push($(this).find('.card-block')[0].offsetHeight);
          })
          $(this).find('.carousel-item').removeClass('active').eq(index).addClass('active');
          var maxHeight = Math.max.apply(null, slideHeight);
          $(this).find('.carousel-item').each(function() {
            $(this).find('.card-block').css('min-height', maxHeight + 'px');
          })
        })
      })
      setTimeout(function() {
        $(window).trigger('resize');
      }, 100)
    }

    $(document).on('add.cards change.cards', function(event) {
      if ((!$(event.target).hasClass('extTestimonials1')) &&
        (!$(event.target).hasClass('extTestimonials3'))) return;

      if (isIE()) {
        // Fix smooth slide change in IE
        $(event.target).find('.card-block').each(function() {
          $(this).css('display', 'block');
        })
      }

      if ($(event.target).hasClass('extTestimonials3')) {
        // Show multiple slides at once
        var visibleSlides = $(event.target).find('.carousel-inner').attr('data-visible');

        if (visibleSlides < 2) return;

        $(event.target).find('.carousel-inner').attr('class', 'carousel-inner slides' + visibleSlides);
        $(event.target).find('.carousel-item .col-md-12').each(function() {
          if (visibleSlides == 5) {
            $(this).attr('class', 'col-md-12 col-lg-15');
          } else {
            $(this).attr('class', 'col-md-12 col-lg-' + 12/visibleSlides);
          }
        });
        $(event.target).find('.carousel-item').each(function() {
          var itemToClone = $(this);

          for (var i = 1; i < visibleSlides; i++) {
            itemToClone = itemToClone.next();

            // wrap around if at end of item collection
            if (!itemToClone.length) {
              itemToClone = $(this).siblings(':first');
            }

            // grab item, clone, add marker class, add to collection
            itemToClone.find('.col-md-12:first').clone()
              .addClass("cloneditem-"+(i))
              .appendTo($(this).children().eq(0));
          }
        });
      }
    });


    // Counters
    $(document).ready(function() {
      if ($('.counters').length) {
        $('.counters').viewportChecker({
          offset: 200,
          callbackFunction: function(elem, action) {
            $('#' + elem.attr('id') + ' .count').each(function() {
              $(this).prop('Counter', 0).animate({
                Counter: $(this).text()
              }, {
                duration: 3000,
                easing: 'swing',
                step: function(now) {
                  $(this).text(Math.ceil(now));
                }
              });
            });
          }
        });
      }
    });


    // MODAL HEADER'S VIDEO
    $(document).ready(function() {
      if ($('.modalWindow-video iframe').length) {
        var iframe = $('.modalWindow-video iframe')[0].contentWindow;
        var modal = function() {
          $('.modalWindow').css('display', 'table').click(function() {
            $('.modalWindow').css('display', 'none');
            iframe.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}','*');
          });
        };
        $('.intro-play-btn').click(function() {
          modal();
          iframe.postMessage('{"event":"command","func":"' + 'playVideo' + '","args":""}','*');
        });
        $('.intro-play-btn-figure').click(function(event) {
          event.preventDefault();
          modal();
          iframe.postMessage('{"event":"command","func":"' + 'playVideo' + '","args":""}','*');
        });
      }
    });


    // ACCORDION
    $('.panel-group').find('.panel-heading').each(function(target) {
      $(this).click(function() {
        var spanItem = $(this).children('span');
        if($(spanItem).hasClass('pseudoMinus') ) {
          $(spanItem).removeClass('pseudoMinus').addClass('pseudoPlus').parent().css('border', '');
        } else {
          $('.panel-group').find('.signSpan').each(function() {
            $(this).removeClass('pseudoMinus').addClass('pseudoPlus').parent().css('border', '');
          });
          $(spanItem).removeClass('pseudoPlus').addClass('pseudoMinus');
          $(spanItem).parent().css('border', '1px solid #c39f76');
        }
      });
    });

    $(document).find('.panel-group').each(function() {
      $(this).find('.signSpan:eq(0)').parent().css('border', '1px solid #c39f76');
    });


    // TOGGLE
    $('.toggle-panel').find('.panel-heading').each(function(target) {
      $(this).click(function() {
        var spanItem = $(this).children('span');
        if($(spanItem).hasClass('pseudoMinus')) {
          $(spanItem).removeClass('pseudoMinus').addClass('pseudoPlus').parent().css('border', '');
        } else {
          $(spanItem).removeClass('pseudoPlus').addClass('pseudoMinus').parent().css('border', '');
        }
      });
    });


    // Google-map
    var loadGoogleMap = function() {
      var $this = $(this), markers = [], coord = function(pos) {
        return new google.maps.LatLng(pos[0], pos[1]);
      };
      var params = $.extend({
        zoom       : 14,
        type       : 'ROADMAP',
        center     : null,
        markerIcon : null,
        showInfo   : true
      }, eval('(' + ($this.data('google-map-params') || '{}') + ')'));
      $this.find('.mbr-google-map__marker').each(function() {
        var coord = $(this).data('coordinates');
        if (coord) {
          markers.push({
            coord    : coord.split(/\s*,\s*/),
            icon     : $(this).data('icon') || params.markerIcon,
            content  : $(this).html(),
            template : $(this).html('{{content}}').removeAttr('data-coordinates data-icon')[0].outerHTML
          });
        }
      }).end().html('').addClass('mbr-google-map--loaded');
      if (markers.length) {
        var map = this.Map = new google.maps.Map(this, {
          scrollwheel : false,
          // prevent draggable on mobile devices
          draggable   : !$.isMobile(),
          zoom        : params.zoom,
          mapTypeId   : google.maps.MapTypeId[params.type],
          center      : coord(params.center || markers[0].coord)
        });
        $(window).smartresize(function() {
          var center = map.getCenter();
          google.maps.event.trigger(map, 'resize');
          map.setCenter(center);
        });
        map.Geocoder = new google.maps.Geocoder;
        map.Markers = [];
        $.each(markers, function(i, item) {
          var marker = new google.maps.Marker({
            map       : map,
            position  : coord(item.coord),
            icon      : item.icon,
            animation : google.maps.Animation.DROP
          });
          var info = marker.InfoWindow = new google.maps.InfoWindow();
          info._setContent = info.setContent;
          info.setContent = function(content) {
            return this._setContent(content ? item.template.replace('{{content}}', content) : '');
          };
          info.setContent(item.content);
          google.maps.event.addListener(marker, 'click', function() {
            if (info.anchor && info.anchor.visible) info.close();
            else if (info.getContent()) info.open(map, marker);
          });
          if (item.content && params.showInfo) {
            google.maps.event.addListenerOnce(marker, 'animation_changed', function() {
              setTimeout(function() {
                info.open(map, marker);
              }, 350);
            });
          }
          map.Markers.push(marker);
        });
      }
    };
    $(document).on('add.cards', function(event) {
      if (window.google && google.maps) {
        $(event.target).outerFind('.mbr-google-map').each(function() {
          loadGoogleMap.call(this);
        });
      }
    });
  }


  // For countdown blocks
  initCountdown = function() {
    $(".countdown:not(.countdown-inited)").each(function() {
      $(this).addClass('countdown-inited').countdown($(this).attr('data-end'), function(event) {
        $(this).html(
          event.strftime([
            '<div class="row">',
            '<div class="col-xs-12 col-sm-3">',
            '<span class="number-wrap">',
            '<span class="number">%D</span>',
            '<span class="period">Days</span>',
            '<div class="bottom1"></div>',
            '<div class="bottom2"></div>',
            '<span class="dot">:</span>',
            '</span>',
            '</div>',
            '<div class="col-xs-12 col-sm-3">',
            '<span class="number-wrap">',
            '<span class="number">%H</span>',
            '<span class="period">Hours</span>',
            '<div class="bottom1"></div>',
            '<div class="bottom2"></div>',
            '<span class="dot">:</span>',
            '</span>',
            '</div>',
            '<div class="col-xs-12 col-sm-3">',
            '<span class="number-wrap">',
            '<span class="number">%M</span>',
            '<span class="period">Minutes</span>',
            '<div class="bottom1"></div>',
            '<div class="bottom2"></div>',
            '<span class="dot">:</span>',
            '</span>',
            '</div>',
            '<div class="col-xs-12 col-sm-3">',
            '<span class="number-wrap">',
            '<span class="number">%S</span>',
            '<span class="period">Seconds</span>',
            '<div class="bottom1"></div>',
            '<div class="bottom2"></div>',
            '</span>',
            '</div>',
            '</div>'
          ].join(''))
        );
      });
    });

    $(".countdown:not(.countdown-inited)").each(function() {
      $(this).countdown($(this).attr('data-end'), function(event) {
        $(this).text(
          event.strftime('%D days %H:%M:%S')
        );
      });
    });
  }

  if ($('.countdown').length != 0) {
    initCountdown();
  }

  // Checks if the browser is Internet Explorer
  function isIE() {
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");

    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
      return true;
    }

    return false;
  }


  // bgText Animation //
  move = function(className) {
    var clientWidth = window.screen.width,
        x = clientWidth/2;
    setInterval(function() {
      x -= 1;
      if( parseInt($(className).css('left')) <=  parseInt($(className).css('width'))*(-1) ){ x = clientWidth };
      $(className).css('left', x +'px');
    }, 10);
  };
  for(var i=0; i<2; i++) {
    $(".bgTextP").each(function() {
      $(this).clone().appendTo($(this).parent())
    });
  };
  $('.bgTextP').css('padding-left', window.screen.width/2 + 'px');
  $('.wrapper-absolute').each(function() {
    move($(this));
  });


  // Typed //
  initTyped = function(a, b, c, el) {
    $(el).typed({
      strings: [a, b, c],
      typeSpeed: parseInt($(el).attr('typeSpeed')),
      backSpeed: parseInt($(el).attr('typeSpeed')),
      loop: true,
      backDelay: 1000
    });
  };
  if($('.element').length != 0) {
    $('.element').each(function() {
      initTyped($(this).attr('firstel'), $(this).attr('secondel'), $(this).attr('thirdel'), '.'+$(this).attr('adress'));
    });
  };

})(jQuery);