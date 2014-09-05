// See bottom of the file for command parameter details.

// Dhaka: 
// Location:(23.7000° N, 90.3750° E)
// TimeZone: +6
command: "php -f ./prayer.widget/PrayTime.php calc_method=1 asr_method=1 lat=23.70 lon=90.37 tz=+6",
 
refreshFrequency: 15000,

render: function () {
	return '\
	<div id="widget-title">Prayer Times : Dhaka</div>\
	<table>\
		<thead><tr class="titles"></tr></thead>\
		<tbody><tr class="values"></tr></tbody>\
	</table>';
},

style: "                            		\n\
current-round = 6px											\n\
no-bg = rgba(#000, .0)									\n\
																				\n\
top: 120px															\n\
left: 20px															\n\
width: 350px 														\n\
background: rgba(#7f909e, .3)						\n\
padding: 5px 1px 6px 1px								\n\
border-radius: 8px											\n\
font-family: Helvetica Neue         		\n\
font-size: 12px                     		\n\
text-shadow: 0 1px 0px rgba(#000, .3) 	\n\
																				\n\
#widget-title														\n\
	color: #63bf7a												\n\
	font-size: 14px 											\n\
	padding: 0 0 5px 5px 									\n\
																				\n\
table																		\n\
	font-weight: 400                    	\n\
	width: 100%														\n\
	text-align:center											\n\
	border-collapse:collapse							\n\
																				\n\
td																			\n\
	color: rgba(#fff, 0.8)								\n\
	background: #308c6a										\n\
																				\n\
.titles 																\n\
	font-size: 10px 											\n\
	text-transform: uppercase							\n\
	font-weight: bold											\n\
																				\n\
.values 																\n\
	font-size: 14px 											\n\
	font-weight: 300 											\n\
	color: rgba(#fff, .9) 								\n\
																				\n\
.current																\n\
	color: #f2e49b                      	\n\
	text-shadow: 0 1px 0px rgba(#000, .7) \n\
	background: no-bg											\n\
																				\n\
.titles .passed,														\n\
	border-top-right-radius: current-round 		\n\
																						\n\
.values .passed,														\n\
	border-bottom-right-radius: current-round \n\
																						\n\
.titles .upcoming,													\n\
	border-top-left-radius: current-round 		\n\
																						\n\
.values .upcoming,													\n\
	border-bottom-left-radius: current-round  \n\
",

update: function (output, domEl) {
	var titles = "";
	var values = "";

	var lines = output.split("\n");
	var names = lines[0].split(",");
	var times = lines[1].split(",");

	var curIndex = times.length-1;
	var now = new Date();
	var time = new Date();
	for (var i = 0; i < times.length; i++) {
			var timeComp = times[i].split(":");
			time.setHours(timeComp[0], timeComp[1]);
			if (time.getTime() < now.getTime()) {
					curIndex = i;
			} else {
					break;
			}
	}
	
	for (var i = 0; i < times.length; i++) {
			var className = "normal";
			if(i == curIndex) className = "current";
			else if(i == curIndex-1) className = "passed";
			else if(i == curIndex+1) className = "upcoming"
			titles += '<td class="' + className + '">' + names[i] + '</td>';
			values += '<td class="' + className + '">' + times[i] + '</td>';
	}
	$(domEl).find('.titles').html(titles);
	$(domEl).find('.values').html(values);
}

/*

 COMMAND PARAMETER DETAILS 
---------------------------

1. calc_method : Calculation method
=> Possible values:
	0: Ithna Ashari
  1: University of Islamic Sciences, Karachi
  2: Islamic Society of North America (ISNA)
  3: Muslim World League (MWL)
  4: Umm al-Qura, Makkah
  5: Egyptian General Authority of Survey
  6: Custom Setting
  7: Institute of Geophysics, University of Tehran

2. asr_method : Juristic Methods / Asr Calculation Methods
=> Possible values:
	0: Shafii (standard)
  1: Hanafi

3. lat : Latitude
4. lon : Longitude
5. tz : Timezone

> Note: You can find your latitude/longitude visiting http://freegeoip.net/ or from google map or so.

*/