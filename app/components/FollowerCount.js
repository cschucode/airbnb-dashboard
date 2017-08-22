import React from 'react'

var FollowerCount = React.createClass({
	getDefaultProps(){
		return {
			description: 'followers',
		};
	},

	_setDescription(name){
		return name === 'facebook' ? 'page likes' : 'followers';
	},

	_formatCount(num){
		// format number into a readable string
		if(num < 1000){ return num }

		var si = [
	        { value: 1E9,  symbol: " Billion" },
	        { value: 1E6,  symbol: " Million" },
	        { value: 1E3,  symbol: " K" }
	    ];

	    var symbol = '';
	    var periodsIndex;

	    for (var i = 0; i < si.length; i++) {
	      if (num  >= si[i].value) {
	        num = (num / si[i].value).toString().replace(/\.0+$|(\.[0-9]*[1-9])0+$/, "$1");
	        symbol = si[i].symbol;
	      }
	    }

	    num = num.toString();
	    periodsIndex = num.toString().indexOf('.');

	    return num.slice(0, periodsIndex + 2) + symbol;
	},

	render(){
		var count = this.props.count;
		return (
			<div className="follower-count">
				<h1>{this._formatCount(count) || 'NO DATA'}</h1>
				<p>{this._setDescription(this.props.name)}</p>
			</div>
		);
	}
})

export default FollowerCount