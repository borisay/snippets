/**
 * Created on 2/20/18.
 *
 */
(function ($) {
Drupal.behaviors.combineYears = {
  attach: function (context, settings) {
    var acadYear = $(".views-field-field-academic-year");
    var prefix;
    $.each(acadYear, function(x, y){
      var textYears = $(this).text();
      if(textYears.indexOf(',') !== -1) {
        var str = textYears.substr(textYears.indexOf(2));
        var arr = str.split(",");
        var out = "";
        $.each(arr, function(i, val){
          var indx = val.indexOf(2);
          arr[i] = val.slice(indx, 11+indx);
        });
        arr.sort();
        var arrayOut = [];
        var first = "";
        var second = "";
        $.each(arr, function(i, val){
          if(val.substring(0,4) === second){
            arrayOut[i-1] = first+" - "+val.substring(7,11);
          } else {
            arrayOut[i] = arr[i];
          }
          first = val.substring(0,4);
          second = val.substring(7,11);
        });
        arrayOut = $.grep(arrayOut, function(value) {
          return value;
        });
        out = arrayOut.join(', ');
        prefix = textYears.substr(0, textYears.indexOf(2));
        $(this).text(prefix + out);
      }
    });
  }
};

})(jQuery);