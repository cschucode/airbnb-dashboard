import React from 'react'
import FollowerCount from './FollowerCount'
import PercentChange from './PercentChange'
import MockData from './mockData'

// <RecentPostContainer accountID={this.props.accountID} name={this.props.name} />	
// FEED PAGE CONTAINER COMPONENT
var FeedPageContainer = React.createClass({

	getInitialState() {
		return {
			name: this.props.params.name,	
			account_id: this.props.params.account_id
		}
	},

	componentDidMount: function(){
		$('a.bc-' + this.props.name).show();
	},

	render: function(){
		return (
			<div className="feed-page-container">
				<SocialMediaAnalytics name={this.state.name} follower_count={this.state.follower_count}/>
				<RecentPostContainer accountID={this.state.account_id} name={this.state.name} />	
			</div>
		);
	}
});

var SocialMediaAnalytics = React.createClass({

	getInitialState() {
		return {
			account: "airbnb",
			account_id: "",
			fc_month_percent_change: 0,
			fc_week_change: 0,
			fc_week_percent_change: 0,
			follower_count: 0,
			last_week: MockData.mockDataForD3()[this.props.name].lastWeek,
			likes: 0,
			likes_week_change: 0,
			service: null,
			this_week: MockData.mockDataForD3()[this.props.name].thisWeek,
		}
	},

	_getDataFromServer: function(){
		$.ajax({
        	url: '/' + this.props.name + '/airbnb/profile',
        	dataType: 'json',
        	success: function(data){
        		// this.setState(data);
				var incomingData = MockData.mockDataForServices()[this.props.name];
				this.setState( incomingData );

        	}.bind(this),
        	error: function(xhr, status, err){
        		console.log('ERROR:::', err);
          		// this.setState(mockData[this.props.name]);
        	}.bind(this)
      	}); 
	},

	componentWillMount: function(){
		this._getDataFromServer();
		$('.bc-' + this.props.name).show();
	},

	_addCommas: function(num){
		num = num.toString();
		if(Number(num) > 999 || Number(num) < -999){
	        while (/(\d+)(\d{3})/.test(num)) {
                num = num.replace(/(\d+)(\d{3})/, '$1' + ',' + '$2');
            }
        }
        return num;
	},

	render: function(){
		// create a variable for D3 component that doesn't render on mobile
		var d3Component = <D3LineChart 
		 					lastWeekData={this.state.last_week} 
		 					thisWeekData={this.state.this_week} />;

		return (
			<div className="social-media-analytics clearfix">
				<div className="media-box">
					<img className="logo" src={'/images/icons/ic_' + this.props.name + '_logo.png'} />
					<FollowerCount name={this.props.name} count={this.state.follower_count} />
				</div>
				<PercentChange change={this.state.fc_week_percent_change} />
				<Following name={this.props.name} count={this._addCommas(this.state.likes)} />
				<div className="chart-row clearfix">
					<NewFollowers name={this.props.name} likes={this._addCommas(this.state.likes_week_change)} />
					{(window.innerWidth >= 600) ? d3Component : ''}
				</div>
			</div>
		)
	}
});

// TALKING ABOUT YOU CHILD COMPONENT FOR SOCIAL MEDIA ANALYTICS PARENT
var Following = React.createClass({
	_renderDescription: function(){
		if(this.props.name === 'facebook'){
			return 'People Talking About You';
		} else if(this.props.name === 'twitter'){
			return 'Tweets Liked By You';
		} else {
			return 'Number of People You Follow';
		}
	},
	render: function(){
		return (
			<div className="talking-about-you" >
				<h1>{this.props.count}</h1>
				<p>{this._renderDescription()}</p>
			</div>
		);
	}
});

// NEW PAGE LIKES CHILD COMPONENT FOR SOCIAL MEDIA ANALYTICS PARENT
var NewFollowers = React.createClass({
	render: function(){
		return (
			<div className="new-page-likes">
				<h1>{this.props.likes}</h1>
				<p>{this.props.name === 'facebook' ? 'New Page Likes Over Last Week' : 'New Followers Over Last Week'}</p>
			</div>
		);
	}
});

// D3 LINE CHART CHILD COMPONENT FOR SOCIAL MEDIA ANALYTICS PARENT
var D3LineChart = React.createClass({
	_renderNVD3: function(lastWeekData, thisWeekData){
		nv.addGraph(function() {
	        var chart = nv.models.lineChart()
	        var fitScreen = false;
	        var width = 800;
	        var height = 225;
	        var zoom = 1;

	        chart.tooltip
	        	.enabled()
	        	.interactiveLayer

	        function epochToNiceDate(epoch) {
	            var date = new Date(epoch);
	            var day = date.getDate();
	            var month = date.getMonth() + 1;
	            var year = date.getFullYear();
	            return month + "/" + day + "/" + year;
	        }

	        chart.tooltip.contentGenerator(function (d) {
	        	var tooltipTitle = epochToNiceDate(d.value);
	        	var tooltip = "";

	        	tooltip += "<table>";
	        	tooltip += "<thead>";
	        	tooltip += "</thead>";
	        	tooltip += "<tbody sytle='text-align: left'>"

	        	for(var i in d.series) {
	        	    var currentSeries = d.series[i];
	        	    var color = currentSeries.color;
	        	    var key = currentSeries.key;
	        	    var value = currentSeries.value;

	        	    tooltip += "<tr>";
	        	    tooltip += "   <td class='legend-color-guide'>";
	        	    tooltip += "      <span style='background-color: " + color + "; width: 10px; height: 10px; margin-top: 7px; padding: 0; margin: 0'></span>";
	        	    tooltip += "   		<span class='key'>" + key + "</span>";
	        	    tooltip += "   </td>";
	        	    tooltip += "</tr>";
	        	    tooltip += "<tr>"
	        	    tooltip += "	<td colspan='3'>"
	        	    tooltip += "		<strong class='x-value'>" + tooltipTitle + "</strong>"
	        	    tooltip += "	</td>"
			        	tooltip += "</tr>";
	        	    tooltip += "<tr>"
	        	    tooltip += "	<td colspan='3'>"
	        	    tooltip += "		<strong class='x-value'>Total: " + value + "</strong>"
	        	    tooltip += "	</td>"
			        	tooltip += "</tr>";
	        	}

	        	tooltip += "</tbody>";
	        	tooltip += "</table>";

	        	return tooltip;
	        });


	        // work around for x-axis tick values to display properly
	        var tickDates = thisWeekData.map(function(date){
	        	return new Date(date.month + '/' + date.day + '/' + date.year);
	        });

	        chart.xAxis
	        	.showMaxMin(false)
	        	.tickValues(tickDates)
            	.tickFormat(function(d) {
                	return d3.time.format('%m/%e' )(new Date(d));
            	});

	        chart.yAxis
	            .showMaxMin(false)
	            .tickFormat(function(d) {
	            	d = Number(d) || 0;
	            	if (d === 0) return d;

	              var si = [
	                { value: 1E9,  symbol: "B" },
	                { value: 1E6,  symbol: "M" },
	                { value: 1E3,  symbol: "K" }
	              ];

	              var symbol = '';
	              var periodsIndex;

	              for (var i = 0; i < si.length; i++) {
	                if (d  >= si[i].value) {
	                  d = (d / si[i].value)
					  			.toString()
					  			.replace(/\.0+$|(\.[0-9]*[1-9])0+$/, "$1");
	                  symbol = si[i].symbol;
	                }
	              }
	              periodsIndex = d.indexOf('.');
	              return d.slice(0, periodsIndex + 2) + symbol;
	            });

	        d3.select('.svg-container svg')
	            .attr('perserveAspectRatio', 'xMinYMid')
	            .attr('width', width)
	            .attr('height', height)
	            .datum(transformData());

	        setChartViewBox();
	        resizeChart();

	        nv.utils.windowResize(resizeChart);

	        d3.select('.nv-series')
	        	.attr('transform', 'translate(0 , 5)');

	        function setChartViewBox() {
	            var w = width * zoom,
	                h = height * zoom;

	            chart
	                .width(w)
	                .height(h);

	            d3.select('.svg-container svg')
	                .attr('viewBox', '0 0 ' + w + ' ' + h)
	                .transition().duration(500)
	                .call(chart);
	        }

	        // This resize simply sets the SVG's dimensions, without a need to recall the chart code
	        // Resizing because of the viewbox and perserveAspectRatio settings
	        // This scales the interior of the chart unlike the above
	        function resizeChart() {
	            var container = d3.select('.svg-container');
	            var svg = container.select('svg');

	            if (fitScreen) {
	                // resize based on container's width AND HEIGHT
	                var windowSize = nv.utils.windowSize();
	                svg.attr("width", windowSize.width);
	                svg.attr("height", windowSize.height);
	            } else {
	                // resize based on container's width
	                var aspect = chart.width() / chart.height();
	                var targetWidth = parseInt(container.style('width'));
	                svg.attr("width", targetWidth);
	                svg.attr("height", Math.round(targetWidth / aspect));
	            }
	        };

	        // sorts incoming data from one week ago to current date
	        function sortData(weeksArray){
	        	weeksArray.forEach(function(week){
	        		week.sort(function(a, b){
						var aDate = new Date(a.month + '/' + a.day + '/' + a.year);
		        		var bDate = new Date(b.month + '/' + b.day + '/' + b.year);

						return aDate - bDate;
		        	});
	        	})
	        }

	        function transformData(){

	        	// calling the sort data function
	        	sortData([lastWeekData, thisWeekData]);

	        	var lastWeek = lastWeekData.map(function(obj){
	        		var currentDate = new Date(obj.month + '/' + obj.day + '/' + obj.year);
	        		var oneWeekInMs = 7 * 24 * 60 * 60 * 1000;

					var result = {
						x: new Date(currentDate.getTime() + oneWeekInMs),
						y: obj.follower_count
					};

					return result; 
	        	});

	        	// this week data
	        	var thisWeek = thisWeekData.map(function(obj){
	        		var currentDate = new Date(obj.month + '/' + obj.day + '/' + obj.year);
					return {
						x: currentDate.getTime(),
						y: obj.follower_count
					};
				});

				return [
					{
						values: thisWeek,
						key: 'This Week',
						color: '#ff5a5f'
					},
					// {
					// 	values: lastWeek,
					// 	key: 'Last Week',
					// 	color: '#555'
					// }			
				];
	        }
	            
	        return chart;
	    });
	},

	render: function(){
		this._renderNVD3(this.props.lastWeekData, this.props.thisWeekData);

		return (
			<div className="svg-container">
				<svg id="d3-line-chart"></svg>
			</div>
		);
	}
});

// RECENT POST PARENT COMPONENT
var RecentPostContainer = React.createClass({
	getInitialState: function(){
		return {
			posts: []	
		}
	},
	_getDataFromServer: function(){
		
		// $.ajax({
        // 	url: '/' + this.props.name + '/recent-feeds/' + this.props.accountID,
        // 	dataType: 'json',
        // 	success: function(data){
        // 		// get copy of incoming data
        // 		data = data || MockData.getMockPosts();

        // 		var lastSixPosts = data.slice(0,6);
        // 		this.setState({ posts: lastSixPosts });

        // 	}.bind(this),
        // 	error: function(xhr, status, err){
        // 		console.log('ERROR:::', err);
        //   		//this.setState({ posts: MockData.getMockPosts() });
        // 	}.bind(this)
      	// }); 
		var posts = MockData.getMockPosts();

		function getThreeRandomPosts(selection){
			var result = [];
			var count = 0;

			while(count < 3){
				var randomNum = Math.floor(Math.random() * selection.length);
				result.push( selection[randomNum] );
				selection.splice(randomNum, 1);
				count++;
			}
			return result;
		}	

      	this.setState({ posts: getThreeRandomPosts(posts) });
	},
	componentDidMount: function(){
		this._getDataFromServer();
	},
	render: function(){
		var self = this;

		var posts = this.state.posts.map(function(post, idx){
			return (
				<Post service={self.props.name} key={idx} data={post} />
			);
		});

		return (
		  <div className="recent-post-container">
		    <p>Most Recent Posts</p>
		    <div className="post-flex-container">
			    {posts}
			</div>
		  </div>      
		)
	}
})

// POST CHILD COMPONENT FOR RECENT POST CONTAINER COMPONENT
var Post = React.createClass({
  getDefaultProps: function(){
  	return {
  		author: 'Airbnb',
  		date: new Date().toTimeString()
  	}
  },

  render: function(){
  	var retweets, 
  		favorites, 
  		comments, 
		shares,
  		likes;

  	var likeIcon;
	
  	if(this.props.service === 'facebook' || this.props.service === 'pinterest'){
  		likes = this.props.data.counts.like_count;
  		likeIcon = <img className="post-icon" src="/images/post-icons/facebook-like.png" />
		shares = this.props.data.counts.share_count;
		var shareIcon = <img className='post-icon' src='/images/post-icons/facebook-share.png' />
  	} else if(this.props.service === 'instagram'){
  		comments = this.props.data.counts.comments_count;
  		var commentIcon = <img className="post-icon" src="/images/post-icons/comment-icon.png" />
  		likes = this.props.data.counts.likes;
  		likeIcon = <img className="post-icon heart" src="/images/post-icons/twitter-heart-icon.png" />
  	} else if(this.props.service === 'twitter'){
  		retweets = this.props.data.counts.retweet_count;
  		var retweetIcon = <img className="post-icon" src="/images/post-icons/twitter-retweet.png" />
  		favorites = this.props.data.counts.favorite_count;
  		var favoritesIcon = <img className="post-icon heart" src="/images/post-icons/twitter-heart-icon.png" />
  	}

  	// truncate message to 140 characters
  	var truncatedMessage = this.props.data.message.length > 0 ? this.props.data.message.slice(0, 140) + '...' : '';

    return (
      <div className="recent-post">
        <img className="post-avatar" src="/images/airbnb-logo.png" />
        <a><h4>{this.props.author}</h4></a>
        <h5>{this.props.data.created_on || this.props.date}</h5>
        <p className="social">{likes ? likeIcon : ''}{likes ? ' ' + likes : ''}</p>
        <p className="social">{retweets ? retweetIcon : ''}{retweets ? ' ' + retweets : ''}</p>
		<p className="social">{shares ? shareIcon : ''}{shares ? ' ' + shares : ''}</p>
        <p className="social">{comments ? commentIcon : ''}{comments ? ' ' + comments : ''}</p>
        <p className="social">{favorites ? favoritesIcon : ''}{favorites ? ' ' + favorites : ''}</p>
        <div className="embed"><img className="post-image" src={this.props.data.image} /></div>
        <p>{truncatedMessage}</p>
      </div>
    )
  }
});

export default FeedPageContainer
