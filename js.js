/**
 * Created by borisayupov on 2/17/17.
 */
(function($) {
  window.onload = function () {
    var $cell = $('.image--cell');
    var $basic = $('.image--basic');
    var $expand = $('.image--expand');
    var $info = $expand.find('.info');
    var count = $cell.length;
    for (var i = 0; i < count; i++) {
      $basic.find('img').attr('id', function (i) {
        return 'expand-jump-' + i;
      });
    }
    $basic.find('img').attr('class', 'basic__img');
    $expand.find('img').attr('class', 'image--large');
    $cell.find('.image--basic').click(function () {
      if ($(this).hasClass('no-mobile')) {
        var expCell = $cell.filter(".is-expanded");
        var colCell = $cell.filter(".is-collapsed");
        var expHgt = expCell.height();
        var $thisCell = $(this).closest('.image--cell');
        var newTop = $(this).offset().top;
        var colHgt = colCell.height();
        if (expHgt !== null) {
          var expTop = expCell.offset().top;
          if ((newTop - expTop) > 10) {
            scrollToImage(newTop - expHgt + colHgt);
          } else {
            scrollToImage(newTop);
          }
        } else {
          scrollToImage(newTop);
        }
        if ($thisCell.hasClass('is-collapsed')) {
          $cell.not($thisCell).removeClass('is-expanded').addClass('is-collapsed');
          $thisCell.removeClass('is-collapsed').addClass('is-expanded');
          topImg();
          checkInfo();

        } else {
          $thisCell.removeClass('is-expanded').addClass('is-collapsed');
        }
      }
    });
    $cell.find('.expand__close').click(function () {
      var $thisCell = $(this).closest('.image--cell');
      $thisCell.removeClass('is-expanded').addClass('is-collapsed');
    });
    $cell.find('.info__close').click(function () {
      var $thisInfo = $(this).closest('.image--cell');
      $thisInfo.find('.info').toggle("slow", function () {
        $thisInfo.find('.image--expand img').hide().fadeIn('fast');
      });
    });
    $cell.find('.arrow-left').click(function () {
      var $curr = $('.image--cell').filter('.is-expanded');
      if ($curr.prev().length > 0) {
        var currTop = $curr.offset().top;
        var prevTop = $curr.prev().offset().top;
        var heightTumb = $curr.find(".image--basic").height();
        $curr
          .removeClass('is-expanded')
          .addClass('is-collapsed')
          .prev()
          .removeClass('is-collapsed')
          .addClass('is-expanded');
        topImg();
        checkInfo();
        if ((prevTop - currTop) < 10) {
          scrollToImage(prevTop);
        } else {
          scrollToImage(currTop);
        }
      } else {
        $(this).hide();
      }
    });
    $cell.find('.arrow-right').click(function () {
      var $curr = $('.image--cell').filter('.is-expanded');
      if ($curr.next().length > 0) {
        var currTop = $curr.offset().top;
        var nextTop = $curr.next().offset().top;
        var heightTumb = $curr.find(".image--basic").height();
        function nextImage() {
          $curr
            .removeClass('is-expanded')
            .addClass('is-collapsed')
            .next()
            .removeClass('is-collapsed')
            .addClass('is-expanded');
          topImg();
          checkInfo();
        }
        nextImage();
        if ((nextTop - currTop) > 10) {
          scrollToImage(currTop + heightTumb);
        } else {
          scrollToImage(currTop);
        }
      } else {
        $(this).hide();
      }
    });
    function checkInfo() {
      if ($cell.filter(".is-expanded").find(".info").text().trim() === "") {
        $expand.find(".info__close").hide();
      } else {
        $expand.find(".info__close").show();
      }
    }
    function scrollToImage(shift) {
      $('html, body').animate({
        scrollTop: shift
      }, 500);
    }
    $(window).ready(function () {
      updateWindow();
    });
    $(window).resize(function () {
      updateWindow();
    });
    function updateWindow(){
      if (window.innerWidth >= 768) {
        $(".image--basic").addClass("no-mobile");
        topImg();
      } else{
        $(".image--basic").removeClass("no-mobile");
        $('.is-expanded').removeClass('is-expanded').addClass('is-collapsed');
      }
    }
    function topImg(){
      var imgTop = ($(".is-expanded .image--expand").height() - $(".is-expanded .image--expand img").height() - 80)/2;
      $(".is-expanded .image--expand img").css({"top": imgTop+"px", "position": "relative"});
    }
  };
})(jQuery);