describe('calendrical', function() {

	it('should export calendrical', function() {
		expect(calendrical).toBeDefined();
	});

	describe('getLeadingDays', function() {
		it('should return the days from the last week of the previous month, starting from the day the week starts with, until the first day of the current month', function() {			
			expect(calendrical.utility.getLeadingDays(new Date(2014, 10, 7), 0, true)).toEqual([26, 27, 28, 29, 30, 31]);	
			expect(calendrical.utility.getLeadingDays(new Date(2014, 10), 1, true)).toEqual([27, 28, 29, 30, 31]);
			expect(calendrical.utility.getLeadingDays(new Date(2014, 10), 2, true)).toEqual([28, 29, 30, 31]);
			expect(calendrical.utility.getLeadingDays(new Date(2014, 10), 3, true)).toEqual([29, 30, 31]);
			expect(calendrical.utility.getLeadingDays(new Date(2014, 10), 4, true)).toEqual([30, 31]);
			expect(calendrical.utility.getLeadingDays(new Date(2014, 10), 5, true)).toEqual([31]);
			expect(calendrical.utility.getLeadingDays(new Date(2014, 10), 6, true)).toEqual([]);

			expect(calendrical.utility.getLeadingDays(new Date(2014, 10), 5)).toEqual([{dayOfMonth: 31, leadingDay: true}]);
		});
	});

	describe('getLastDayInMonth', function() {
		it('should return the last day in the month', function() {
			expect(calendrical.utility.getLastDayInMonth(new Date(2014, 10))).toEqual(new Date(2014, 10, 30));
		});
	});

	describe('getTrailingDays', function() {
		it('should return the days from the last week of the previous month, starting from the day the week starts with, until the first day of the current month', function() {			
			expect(calendrical.utility.getTrailingDays(new Date(2014, 10, 7), 1, true)).toEqual([]);
			expect(calendrical.utility.getTrailingDays(new Date(2014, 10), 2, true)).toEqual([1]);
			expect(calendrical.utility.getTrailingDays(new Date(2014, 10), 3, true)).toEqual([1, 2]);
			expect(calendrical.utility.getTrailingDays(new Date(2014, 10), 4, true)).toEqual([1, 2, 3]);
			expect(calendrical.utility.getTrailingDays(new Date(2014, 10), 5, true)).toEqual([1, 2, 3, 4]);
			expect(calendrical.utility.getTrailingDays(new Date(2014, 10), 6, true)).toEqual([1, 2, 3, 4, 5]);
			expect(calendrical.utility.getTrailingDays(new Date(2014, 10), 0, true)).toEqual([1, 2, 3, 4, 5, 6]);	

			expect(calendrical.utility.getTrailingDays(new Date(2014, 10), 2)).toEqual([{dayOfMonth: 1, trailingDay: true}]);
		});
	});

	describe('getWeeksInMonth', function() {
		it('should return a weekly calendar for the given month', function() {
			expect(calendrical.getWeeksInMonth(new Date(2014, 10, 7))).toEqual([
				[ { dayOfMonth : 26, leadingDay : true }, { dayOfMonth : 27, leadingDay : true }, { dayOfMonth : 28, leadingDay : true }, { dayOfMonth : 29, leadingDay : true }, { dayOfMonth : 30, leadingDay : true }, { dayOfMonth : 31, leadingDay : true }, { dayOfMonth : 1, inCurrentMonth : true } ], 
				[ { dayOfMonth : 2, inCurrentMonth : true }, { dayOfMonth : 3, inCurrentMonth : true }, { dayOfMonth : 4, inCurrentMonth : true }, { dayOfMonth : 5, inCurrentMonth : true }, { dayOfMonth : 6, inCurrentMonth : true }, { dayOfMonth : 7, inCurrentMonth : true }, { dayOfMonth : 8, inCurrentMonth : true } ], 
				[ { dayOfMonth : 9, inCurrentMonth : true }, { dayOfMonth : 10, inCurrentMonth : true }, { dayOfMonth : 11, inCurrentMonth : true }, { dayOfMonth : 12, inCurrentMonth : true }, { dayOfMonth : 13, inCurrentMonth : true }, { dayOfMonth : 14, inCurrentMonth : true }, { dayOfMonth : 15, inCurrentMonth : true } ], 
				[ { dayOfMonth : 16, inCurrentMonth : true }, { dayOfMonth : 17, inCurrentMonth : true }, { dayOfMonth : 18, inCurrentMonth : true }, { dayOfMonth : 19, inCurrentMonth : true }, { dayOfMonth : 20, inCurrentMonth : true }, { dayOfMonth : 21, inCurrentMonth : true }, { dayOfMonth : 22, inCurrentMonth : true } ], 
				[ { dayOfMonth : 23, inCurrentMonth : true }, { dayOfMonth : 24, inCurrentMonth : true }, { dayOfMonth : 25, inCurrentMonth : true }, { dayOfMonth : 26, inCurrentMonth : true }, { dayOfMonth : 27, inCurrentMonth : true }, { dayOfMonth : 28, inCurrentMonth : true }, { dayOfMonth : 29, inCurrentMonth : true } ], 
				[ { dayOfMonth : 30, inCurrentMonth : true }, { dayOfMonth : 1, trailingDay : true }, { dayOfMonth : 2, trailingDay : true }, { dayOfMonth : 3, trailingDay : true }, { dayOfMonth : 4, trailingDay : true }, { dayOfMonth : 5, trailingDay : true }, { dayOfMonth : 6, trailingDay : true } ] 
			]);
		});

		it('should return a weekly calendar for the given month, with weeks starting on an arbitrary day', function() {
			expect(calendrical.getWeeksInMonth(new Date(2014, 10, 7), { weekStartsWith: 3 })).toEqual([
				[ { dayOfMonth : 29, leadingDay : true }, { dayOfMonth : 30, leadingDay : true }, { dayOfMonth : 31, leadingDay : true }, { dayOfMonth : 1, inCurrentMonth : true }, { dayOfMonth : 2, inCurrentMonth : true }, { dayOfMonth : 3, inCurrentMonth : true }, { dayOfMonth : 4, inCurrentMonth : true } ], 
				[ { dayOfMonth : 5, inCurrentMonth : true }, { dayOfMonth : 6, inCurrentMonth : true }, { dayOfMonth : 7, inCurrentMonth : true }, { dayOfMonth : 8, inCurrentMonth : true }, { dayOfMonth : 9, inCurrentMonth : true }, { dayOfMonth : 10, inCurrentMonth : true }, { dayOfMonth : 11, inCurrentMonth : true } ], 
				[ { dayOfMonth : 12, inCurrentMonth : true }, { dayOfMonth : 13, inCurrentMonth : true }, { dayOfMonth : 14, inCurrentMonth : true }, { dayOfMonth : 15, inCurrentMonth : true }, { dayOfMonth : 16, inCurrentMonth : true }, { dayOfMonth : 17, inCurrentMonth : true }, { dayOfMonth : 18, inCurrentMonth : true } ], 
				[ { dayOfMonth : 19, inCurrentMonth : true }, { dayOfMonth : 20, inCurrentMonth : true }, { dayOfMonth : 21, inCurrentMonth : true }, { dayOfMonth : 22, inCurrentMonth : true }, { dayOfMonth : 23, inCurrentMonth : true }, { dayOfMonth : 24, inCurrentMonth : true }, { dayOfMonth : 25, inCurrentMonth : true } ], 
				[ { dayOfMonth : 26, inCurrentMonth : true }, { dayOfMonth : 27, inCurrentMonth : true }, { dayOfMonth : 28, inCurrentMonth : true }, { dayOfMonth : 29, inCurrentMonth : true }, { dayOfMonth : 30, inCurrentMonth : true }, { dayOfMonth : 1, trailingDay : true }, { dayOfMonth : 2, trailingDay : true } ] 
			]);
		});
	});
});