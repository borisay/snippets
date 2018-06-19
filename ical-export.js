/**
 * Created by borisayupov on 02/15/18.
 */
(function ($, Drupal) {
  var file_text = '';
  var delim = "\n";
  $('.ical-link').click(function () {
    $(".ical-events").load("/events/feed/ical .ical-events p", function () {
      $(".ical-events p").each(function () {
        var five = $(this).text().substring(0, 6);
        switch (five) {
          case "DTSTAR":
            var start_time = $(this).text().substring(0, 23);
            file_text += start_time + delim;
            break;
          case "DTEND:":
            var end_time = $(this).text().substring(0, 6) + $(this).text().substring(24, 39)
            file_text += end_time + delim;
            break;
          case "LOCATI":
            var locate = $(this).text().replace(",", "-");
            file_text += locate + delim;
            break;
          case "DTSTAM":
            var stamp = $(this).text().replace("PST", "T");
            file_text += stamp + delim;
            break;
          default:
            file_text += $(this).text() + delim;
        }
      });
      download("events.ics", file_text);
      $(this).fadeOut();
    });
  });
  function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:application/octet-stream,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }
})(jQuery, Drupal);
