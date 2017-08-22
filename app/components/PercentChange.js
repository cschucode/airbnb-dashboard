import React from 'react'

var PercentChange = React.createClass({

	getDefaultProps(){
		return {
			description: 'Last 7 Days'
		}
	},

	_removeNegativeSign: function(num){
		return num < 0 ? -(num) : num;
	},

	_setGlyph: function(){
		if(this.props.homePage){
			var arrow = this.props.change >= 0 ? "/images/icons/ic_arrow_up.png" :"/images/icons/ic_arrow_down.png";
			return <img src={arrow} className="percent-change-arrow" />	
		} else {
			var iconClass = this.props.change >= 0 ? "icon-chevron-up" : "icon-chevron-down";
			return <i className={iconClass} />;
		}
	},

	render(){
		
		
		return (
			<div className="percent-change">
				<h1>
					{this._setGlyph()}
					{this._removeNegativeSign(this.props.change).toFixed(2) + '%'}
				</h1>
				<p>{this.props.description}</p>
			</div>
		);
	}
})

export default PercentChange