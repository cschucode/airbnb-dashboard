const mockData = {

mockDataForServices: function() {
	return  {
		'facebook': {
	      	service: 'facebook', 
			account_id: '57e983cdcc0d5c8155c5532e',
			account: 'airbnb',
			fc_month_percent_change: -4.3,
			fc_week_change: -2229654,
			fc_week_percent_change: .80,
	      	follower_count: 5431345, 
	      	likes: 5732,
	      	likes_week_change: 43451
		},
		'twitter': {
	      	service: 'twitter', 
			account_id: '57e9842ecc0d5c8155c5532f',
			account: 'airbnb',
			fc_month_percent_change: -4.3,
			fc_week_change: -2229654,
			fc_week_percent_change: .16,
	      	follower_count: 580477, 
	      	likes: 573,
	      	likes_week_change: 929
		},
	   	'instagram': {
	      	service: 'instagram', 
			account_id: '57e99726cc0d5c8155c55331',
			account: 'airbnb',
			fc_month_percent_change: -4.3,
			fc_week_change: -2229654,
			fc_week_percent_change: -.39,
	      	follower_count: 1634777, 
	      	likes: 573,
	      	likes_week_change: -27791
		},
		'pinterest': {
	      	service: 'pinterest', 
			account_id: '57e98465cc0d5c8155c55330',
			account: 'airbnb',
			fc_month_percent_change: -4.3,
			fc_week_change: -2229654,
			fc_week_percent_change: .20,
	      	follower_count: 43197, 
	      	likes: 573,
	      	likes_week_change: 86
		}
	};
},

mockDataForD3: function(){
	return {
		facebook: {
			lastWeek: [
				{ day: 10, month: 3, year: 2017, likes: 35366, follower_count: 5200100 },
				{ day: 11, month: 3, year: 2017, likes: 34656, follower_count: 5222432 },
				{ day: 12, month: 3, year: 2017, likes: 48769, follower_count: 5192323 },
				{ day: 13, month: 3, year: 2017, likes: 52345, follower_count: 5212555 },
				{ day: 14, month: 3, year: 2017, likes: 55754, follower_count: 5232477 },
				{ day: 15, month: 3, year: 2017, likes: 49876, follower_count: 5267298 },
				{ day: 16, month: 3, year: 2017, likes: 47875, follower_count: 5253835 }
			],
			thisWeek:[
				{ day: 17, month: 3, year: 2017, likes: 42345, follower_count: 5387894 },
				{ day: 18, month: 3, year: 2017, likes: 46456, follower_count: 5399321 },
				{ day: 19, month: 3, year: 2017, likes: 53567, follower_count: 5417664 },
				{ day: 20, month: 3, year: 2017, likes: 42678, follower_count: 5405987 },
				{ day: 21, month: 3, year: 2017, likes: 65432, follower_count: 5416444 },
				{ day: 22, month: 3, year: 2017, likes: 51345, follower_count: 5429121 },
				{ day: 23, month: 3, year: 2017, likes: 68765, follower_count: 5431345 }
			]
		},
		twitter: {
			lastWeek: [
				{ day: 10, month: 3, year: 2017, likes: 35366, follower_count: 530111 },
				{ day: 11, month: 3, year: 2017, likes: 34656, follower_count: 542677 },
				{ day: 12, month: 3, year: 2017, likes: 48769, follower_count: 559998 },
				{ day: 13, month: 3, year: 2017, likes: 52345, follower_count: 542222 },
				{ day: 14, month: 3, year: 2017, likes: 55754, follower_count: 547899 },
				{ day: 15, month: 3, year: 2017, likes: 49876, follower_count: 550123 },
				{ day: 16, month: 3, year: 2017, likes: 47875, follower_count: 552614 }
			],
			thisWeek:[
				{ day: 17, month: 3, year: 2017, likes: 42345, follower_count: 579548 },
				{ day: 18, month: 3, year: 2017, likes: 46456, follower_count: 579789 },
				{ day: 19, month: 3, year: 2017, likes: 53567, follower_count: 580121 },
				{ day: 20, month: 3, year: 2017, likes: 42678, follower_count: 580233 },
				{ day: 21, month: 3, year: 2017, likes: 65432, follower_count: 580243 },
				{ day: 22, month: 3, year: 2017, likes: 51345, follower_count: 580452 },
				{ day: 23, month: 3, year: 2017, likes: 68765, follower_count: 580477 }
			]
		},
		instagram: {
			lastWeek: [
			{ day: 10, month: 3, year: 2017, likes: 35366, follower_count: 1650005 },
			{ day: 11, month: 3, year: 2017, likes: 34656, follower_count: 1652567 },
			{ day: 12, month: 3, year: 2017, likes: 48769, follower_count: 1656989 },
			{ day: 13, month: 3, year: 2017, likes: 52345, follower_count: 1654100 },
			{ day: 14, month: 3, year: 2017, likes: 55754, follower_count: 1659666 },
			{ day: 15, month: 3, year: 2017, likes: 49876, follower_count: 1662895 },
			{ day: 16, month: 3, year: 2017, likes: 47875, follower_count: 1664568 }
			],
			thisWeek:[
				{ day: 17, month: 3, year: 2017, likes: 42345, follower_count: 1641153 },
				{ day: 18, month: 3, year: 2017, likes: 46456, follower_count: 1642433 },
				{ day: 19, month: 3, year: 2017, likes: 53567, follower_count: 1643898 },
				{ day: 20, month: 3, year: 2017, likes: 42678, follower_count: 1640012 },
				{ day: 21, month: 3, year: 2017, likes: 65432, follower_count: 1631799 },
				{ day: 22, month: 3, year: 2017, likes: 51345, follower_count: 1632555 },
				{ day: 23, month: 3, year: 2017, likes: 68765, follower_count: 1634777 }
			]
		},
		pinterest: {
			lastWeek: [
			{ day: 10, month: 3, year: 2017, likes: 35366, follower_count: 38111 },
			{ day: 11, month: 3, year: 2017, likes: 34656, follower_count: 36775 },
			{ day: 12, month: 3, year: 2017, likes: 48769, follower_count: 37665 },
			{ day: 13, month: 3, year: 2017, likes: 52345, follower_count: 39889 },
			{ day: 14, month: 3, year: 2017, likes: 55754, follower_count: 41119 },
			{ day: 15, month: 3, year: 2017, likes: 49876, follower_count: 40500 },
			{ day: 16, month: 3, year: 2017, likes: 47875, follower_count: 42851 }
			],
			thisWeek:[
				{ day: 17, month: 3, year: 2017, likes: 42345, follower_count: 43111 },
				{ day: 18, month: 3, year: 2017, likes: 46456, follower_count: 43120 },
				{ day: 19, month: 3, year: 2017, likes: 53567, follower_count: 43119 },
				{ day: 20, month: 3, year: 2017, likes: 42678, follower_count: 43133 },
				{ day: 21, month: 3, year: 2017, likes: 65432, follower_count: 43135 },
				{ day: 22, month: 3, year: 2017, likes: 51345, follower_count: 43170 },
				{ day: 23, month: 3, year: 2017, likes: 68765, follower_count: 43197 }
			]
		}
	};
},

getMockPosts: function(){
	return [
		{
			message: "The Last Mile brings coding to San Quentin.  Inmates in the Code.7370 program learn to become software engineers.",
			image: '/images/mock/originals.jpg',
			created_on: new Date().toTimeString(),
			counts: { 
				// facebook and pinterest
				like_count: 222,
				// instagram
				likes: 333,
				comments_count: 44,
				// twitter
				retweet_count: 55, 	
				favorite_count: 66
			 }
		},
		{
			message: 'At the 2014 San Quentin Day of Peace inmates show their love through music, art, and building community.',
			image: '/images/mock/bucci.jpg',
			created_on: new Date().toTimeString(),
			counts: { 
				// facebook and pinterest
				like_count: 111,
				// instagram
				likes: 222,
				comments_count: 33,
				// twitter
				retweet_count: 44, 	
				favorite_count: 55
			 }
		},
		{
			message: 'The graduates of Code.7370 led by Jon Gripshover are gaining marketable skills by the megabyte and preparing for successful reentries back into society.',
			image: '/images/mock/grip_grad.jpg',
			created_on: new Date().toTimeString(),
			counts: { 
				// facebook and pinterest
				like_count: 333,
				// instagram
				likes: 444,
				comments_count: 55,
				// twitter
				retweet_count: 66, 	
				favorite_count: 77
			 }
		},
		{
			message: 'Beverly Parenti and Shawn Drost presenting presenting certificates to graduates of the Code.7370 program.',
			image: '/images/mock/erinandbev.jpg',
			created_on: new Date().toTimeString(),
			counts: { 
				// facebook and pinterest
				like_count: 333,
				// instagram
				likes: 444,
				comments_count: 55,
				// twitter
				retweet_count: 66, 	
				favorite_count: 77
			 }
		},{
			message: 'Students of the Code.7370 program learn how to turn their entrepreneurial aspirations into working apps and websites.',
			image: '/images/mock/damonandjon.jpg',
			created_on: new Date().toTimeString(),
			counts: { 
				// facebook and pinterest
				like_count: 333,
				// instagram
				likes: 444,
				comments_count: 55,
				// twitter
				retweet_count: 66, 	
				favorite_count: 77
			 }
		},
		{
			message: 'The Last Mile alumni Tommy Winfrey takes a break with some friends at the San Quentin Day of Peace.',
			image: '/images/mock/duaneandtommy.jpg',
			created_on: new Date().toTimeString(),
			counts: { 
				// facebook and pinterest
				like_count: 111,
				// instagram
				likes: 222,
				comments_count: 33,
				// twitter
				retweet_count: 44, 	
				favorite_count: 55
			 }
		},
		{
			message: "Jorge Heredia, founder of the Funky Onion, and Chris Schuhmacher, founder of Fitness Monkey, collaborate at San Quentin's Day of Peace for their next venture 'Funky Monkey'.",
			image: '/images/mock/jorgeandchris.jpg',
			created_on: new Date().toTimeString(),
			counts: { 
				// facebook and pinterest
				like_count: 111,
				// instagram
				likes: 222,
				comments_count: 33,
				// twitter
				retweet_count: 44, 	
				favorite_count: 55
			 }
		},
		{
			message: 'At the 2014 San Quentin Day of Peace inmates show their love through music, art, and building community.',
			image: '/images/mock/peaceday.jpg',
			created_on: new Date().toTimeString(),
			counts: { 
				// facebook and pinterest
				like_count: 111,
				// instagram
				likes: 222,
				comments_count: 33,
				// twitter
				retweet_count: 44, 	
				favorite_count: 55
			 }
		},
		{
			message: 'Mayor of Richmond, Gail Mclachlan speaks at the Day of Peace about how members of the San Quentin community have a responsibility to be change.',
			image: '/images/mock/mayorofrichmond.jpg',
			created_on: new Date().toTimeString(),
			counts: { 
				// facebook and pinterest
				like_count: 111,
				// instagram
				likes: 222,
				comments_count: 33,
				// twitter
				retweet_count: 44, 	
				favorite_count: 55
			 }
		},
		{
			message: 'San Quentin rap duo Maverick and Banks performing at the San Quentin Day of Peace.',
			image: '/images/mock/maverickandbanks.jpg',
			created_on: new Date().toTimeString(),
			counts: { 
				// facebook and pinterest
				like_count: 111,
				// instagram
				likes: 222,
				comments_count: 33,
				// twitter
				retweet_count: 44, 	
				favorite_count: 55
			 }
		},
		{
			message: 'Sane You and Charlie Thao take a break from coding to show off their artistic talents at the Day of Peace.',
			image: '/images/mock/saneandcharlie.jpg',
			created_on: new Date().toTimeString(),
			counts: { 
				// facebook and pinterest
				like_count: 111,
				// instagram
				likes: 222,
				comments_count: 33,
				// twitter
				retweet_count: 44, 	
				favorite_count: 55
			 }
		},
	];
	}
}

export default mockData;