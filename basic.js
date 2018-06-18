(function ($) {
  Drupal.behaviors.combineYears = {
    attach: function (context, settings) {
      var acadYear = $(".view-siepr-person-visitors .views-field-field-academic-year-1");
      $.each(acadYear, function(x, y){
        var textYears = $(this).text();
        var prefix = textYears.substr(0, textYears.indexOf(2));
        if(textYears.indexOf(',') !== -1) {
          var delimiters = ['-', ','];
          var str = textYears.substr(textYears.indexOf(2));
          var arr = str.split(new RegExp(delimiters.join('|'), 'g'));
          var out = "";
          $.each(arr, function(j, val){
            var indx = val.indexOf(2);
            arr[j] = val.slice(indx, 4+indx);
          });
          arr.sort();
          var removed = [];
          for (var i = 0; i < arr.length - 1; i++) {
            if (arr[i + 1] === arr[i]) {
              removed.push(arr[i]);
            }
          }
          arr = $.grep(arr, function(value) {
            return $.inArray(value, removed) < 0;
          });
          var length = arr.length;
          $.each(arr, function(i, val) {
            if (i%2 === 0) {
              if (i !== length - 2) {
                out = out + arr[i] + " - " + arr[i+1] + ", ";
              }
              else {
                out = out + arr[i] + " - " + arr[i+1];
              }
            }
          });
          $(this).text(prefix + out);
        }
      });
    }
  };
})(jQuery);