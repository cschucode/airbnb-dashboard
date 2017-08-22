exports.helpers = function() {
	return {
		dot_dot_dot: function(str) {
		  if (str && str.length > 10)
		    return str.substring(0,10) + '...';
		  return str;
		},

		number_to_thousands: function(num) {
			num = Number(num) || 0;
			if (num === 0) return num;

		  var si = [
		    { value: 1E9,  symbol: "B" },
		    { value: 1E6,  symbol: "M" },
		    { value: 1E3,  symbol: "K" }
		  ];
		  var symbol = '';
		  var periodsIndex;

		  for (var i = 0; i < si.length; i++) {
		    if (num  >= si[i].value) {
		      num = (num / si[i].value).toString().replace(/\.0+$|(\.[0-9]*[1-9])0+$/, "$1");
		      symbol = si[i].symbol;
		    }
		  }
		  periodsIndex = num.indexOf('.');
		  return num.slice(0, periodsIndex + 2) + symbol;
		},
		
		number_to_percentage: function(num) {
			num = Number(num) || 0;

			if (num >= 0) {
				return "<span class='icon-chevron-up'> " + num + "%</span>";
			} else {
				num = num.toString().slice(1);
				return "<span class='icon-chevron-down'> " + num + "%</span>";
			}
		},
	}
}