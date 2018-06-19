# ![iCal](images/iCalendar.png) A way to get iCal (.ics file) from Drupal 8
*Project: Drupal 8, views, event content type, js*

We need to get iCal file to export upcoming events from Drupal 8 website kipac.stanford.edu to the Apple or Google calendar. When we started to do that, we did not have a ready solution in Drupal 8, so we used this way.
## Step 1: Using views module to collect events
The views module lets us easy to collect needed information for `.ics` file and render it in an almost required form using Global custom text to override used fields:
```
<p>BEGIN:VEVENT</p>
<p>UID:{{ field_stanford_event_datetime }}</p>
<p>DTSTART:{{ field_stanford_event_datetime_1 }}</p>
<p>SUMMARY:{{ title }}</p>
<p>LOCATION:{{ field_stanford_event_location }}</p>
<p>DESCRIPTION:Series:{{ field_event_series }}, Speaker:{{ field_event_speaker }}</p>
<p>DTEND:{{ field_stanford_event_datetime_2 }}</p>
<p>DTSTAMP:{{ date().timestamp|date('Ymd\THis') }}</p>
<p>END:VEVENT</p>
``` 
and code for HEADER
```$xslt
<p>BEGIN:VCALENDAR</p>
<p>VERSION:2.0</p>
<p>METHOD:PUBLISH</p>
```
and FOOTER of the view
```$xslt
<p>END:VCALENDAR</p>
```
So for two events it will be something like this:
###iCal events:
```
BEGIN:VCALENDAR
VERSION:2.0
METHOD:PUBLISH
BEGIN:VEVENT
UID:20180619T110000 - 20180619T120000
DTSTART:20180619T110000 - 20180619T120000
SUMMARY:A 1980 Stanford/Ames study on extrasolar planet imaging
LOCATION:Campus, Varian 355
DESCRIPTION:Series:KIPAC Tea Talk, Speaker:Bruce Macintosh
DTEND:20180619T110000 - 20180619T120000
DTSTAMP:20180618PDT185427
END:VEVENT
BEGIN:VEVENT
UID:20181116T103000 - 20181116T113000
DTSTART:20181116T103000 - 20181116T113000
SUMMARY:American Astronomical Society and Public Policy
LOCATION:SLAC, Kavli 3rd Floor Conf. Room
DESCRIPTION:Series:KIPAC Tea Talk, Speaker:Ashlee Wilkins (AAS)
DTEND:20181116T103000 - 20181116T113000
DTSTAMP:20180618PDT185427
END:VEVENT
END:VCALENDAR
```

The full view configuration is given in this [file](views.view.test_event_export.yml).
## Step 2: Finishing .ics with JQuery
JS helps arrange some changes like start and end dates according to [specification](https://en.wikipedia.org/wiki/ICalendar) and get downloaded file. The code to do that [here](ical-export.js). Finally, the file .ics will look like this:
```
BEGIN:VCALENDAR
VERSION:2.0
METHOD:PUBLISH
BEGIN:VEVENT
UID:20180619T110000 - 20180619T120000
DTSTART:20180619T110000
SUMMARY:A 1980 Stanford/Ames study on extrasolar planet imaging
LOCATION:Campus- Varian 355
DESCRIPTION:Series:KIPAC Tea Talk, Speaker:Bruce Macintosh 
DTEND:20180619T120000
DTSTAMP:20180618PDT185427
END:VEVENT
BEGIN:VEVENT
UID:20181116T103000 - 20181116T113000
DTSTART:20181116T103000
SUMMARY:American Astronomical Society and Public Policy
LOCATION:SLAC- Kavli 3rd Floor Conf. Room
DESCRIPTION:Series:KIPAC Tea Talk, Speaker:Ashlee Wilkins (AAS)
DTEND:20181116T113000
DTSTAMP:20180618PDT185427
END:VEVENT
END:VCALENDAR
```