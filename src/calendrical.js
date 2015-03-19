/*

Calendrical is intended to make building calendar interfaces easier.

Example usage:

var weeks = calendrical.getWeeksInMonth();

Now weeks is an array of weeks, which each are an array of day objects.

The day objects contain a dayOfMonth number (1 to 31) and one of three boolean flags set to true:
inCurrentMonth, trailingDay, or leadingDay.

This should make it easy to build a calendar interface by looping over the weeks, then looping over
the days, and styling each day based on whether it is in the current month, previous month, or next month.

*/

(function() {
	var calendrical = { };

	var dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

	function getBeginningOfMonth(dateInMonth) {
		return new Date(dateInMonth.getFullYear(), dateInMonth.getMonth());
	}

	function getLastDayInMonth(dateInMonth) {
		return getLastDayInPreviousMonth(new Date(dateInMonth.getFullYear(), dateInMonth.getMonth() + 1));
	}

	function getLastDayInPreviousMonth(dateInMonth) {
		var date = new Date(dateInMonth.getFullYear(), dateInMonth.getMonth()); // gets a date at the start of the current month

		date.setDate(0); // Date.setDate(0) moves the date back to the last day of the previous month, modifies the date it is applied to, returns nothing

		return date;
	}

	function getLeadingDays(dateInMonth, weekStartsWith, simple) {
		var leadingDays = [];

		var beginningOfMonth = getBeginningOfMonth(dateInMonth);

		var monthStartsWith = beginningOfMonth.getDay(); // 0:6 for Sunday:Saturday

		var daysNeededFromPreviousMonth = (monthStartsWith - weekStartsWith + 7) % 7;

		var lastDayInPreviousMonth = getLastDayInPreviousMonth(beginningOfMonth);

		var lastDateInPreviousMonth = lastDayInPreviousMonth.getDate(); // 0:31

		for ( var i = lastDateInPreviousMonth - daysNeededFromPreviousMonth + 1;  i <= lastDateInPreviousMonth; ++i ) {
			if ( simple ) {
				leadingDays.push(i);
			} else {
				leadingDays.push({
					dayOfMonth: i,
					leadingDay: true,
                    date: new Date(lastDayInPreviousMonth.getFullYear(), lastDayInPreviousMonth.getMonth(), i)
				});
			}
		}

		return leadingDays;
	}

	function getTrailingDays(dateInCurrentMonth, weekStartsWith, simple) {
		var trailingDays = [];

		var weekEndsWith = (weekStartsWith + 6) % 7;

		var lastDayInMonth = getLastDayInMonth(dateInCurrentMonth);

		var monthEndsWith = lastDayInMonth.getDay();

		var numberOfTrailingDays = (weekEndsWith - monthEndsWith + 7) % 7;

		for ( var i = 1; i <= numberOfTrailingDays; ++i ) {
			if ( simple ) {
				trailingDays.push(i);
			} else {
				trailingDays.push({
					dayOfMonth: i,
					trailingDay: true, // for the date below, JS avoids the 13th month (12 base 0) problem by adjusting the year
                    date: new Date(lastDayInMonth.getFullYear(), lastDayInMonth.getMonth() + 1, i)
                });
			}
		}

		return trailingDays;
	}

	function getWeeksInMonth(dateInMonth, options) {
		var weekStartsWith = 0; // Sunday

		if ( options && options.weekStartsWith ) {
			weekStartsWith = options.weekStartsWith;
		}

		var weeks = [ ],
		    currentWeek;

		// if the beginning of the month isn't the same day that the week starts with, we need to
		// get the days from the previous month until the start of the current month

		var daysInCurrentMonth = getLastDayInMonth(dateInMonth).getDate();

		currentWeek = getLeadingDays(dateInMonth, weekStartsWith);

		for ( var i = 1; i <= daysInCurrentMonth; ++i ) {
			currentWeek.push({
				dayOfMonth: i,
				inCurrentMonth: true
			});

			if ( currentWeek.length === 7 ) {
				weeks.push(currentWeek);
				currentWeek = [];
			}
		}

		currentWeek = currentWeek.concat(getTrailingDays(dateInMonth, weekStartsWith));

		if ( currentWeek.length > 0 ) { // last week of month could have had 7 days and no trailing days
			weeks.push(currentWeek);
		}

		return weeks;
	}


	// expose public functions or functions to be tested


	calendrical = {
		getWeeksInMonth: getWeeksInMonth,
		utility: {
			getLeadingDays: getLeadingDays,
			getTrailingDays: getTrailingDays,
			getLastDayInMonth: getLastDayInMonth
		}
	};


	// expose calendrical through module.exports, define, angular service, or on the global scope


	var globalScope = typeof global !== 'undefined' ? global : this;

	var oldGlobalCalendrical = globalScope.calendrical;

	if (typeof module !== 'undefined' && module.exports) {
		module.exports = calendrical;
	} else if ( typeof define === 'function' && define.amd ) {
		define('calendrical', function(require, exports, module) {
			if ( module.config && module.config() && module.config().noGlobal === true ) {
				globalScope.calendrical = oldGlobalCalendrical;
			}

			return calendrical;
		});
	} else if ( typeof(angular) !== 'undefined' && angular.module ) {
		angular.module('calendrical', []).factory('calendrical', function() {
			return calendrical;
		});
	} else {
		globalScope.calendrical = calendrical;
	}
}).call(this);
