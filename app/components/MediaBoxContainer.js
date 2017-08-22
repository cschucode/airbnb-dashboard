import React from 'react'
import FollowerCount from './FollowerCount'
import PercentChange from './PercentChange'
import { hashHistory } from 'react-router'
import mockData from './mockData'

// MEDIA BOX CONTAINER COMPONENT
class MediaBoxContainer extends React.Component {
	render() {
		return (
			<div className="media-box-container">
				<MediaBox name="facebook" />
				<MediaBox name="twitter" />
				<MediaBox name="instagram" />
				<MediaBox name="pinterest"/>
			</div>
		)
	}
}

var MediaBox = React.createClass({

	 getInitialState(){
		return {
	 		follower_count: 0,
	 		fc_week_percent_change: 0
	 	}	
	 },

	_getDataFromServer(){

		$.ajax({
        	url: '/' + this.props.name + '/airbnb/profile',
        	dataType: 'json',
        	success: function(data){
        		// this.setState(data);
				this.setState( mockData.mockDataForServices()[this.props.name] );
        	}.bind(this),
        	error: function(xhr, status, err){
        		console.log('ERROR:::', err);
          		this.setState( mockData.mockDataForServices()[this.props.name] );
        	}.bind(this)
      	}); 
	},

	componentWillMount(){
		this._getDataFromServer();
		$('.bc-link').hide();
	},

	renderFeed() {
		hashHistory.push('/feed/' + this.props.name + '/' + this.state.account_id);
	},	

	render(){
		return (
			<div name={this.props.name} className="media-box" onClick={this.renderFeed}>
				<img src={'/images/icons/ic_' + this.props.name + '_logo.png'} className="logo" />
				<FollowerCount name={this.props.name} count={this.state.follower_count} />
				<PercentChange homePage={true} change={this.state.fc_week_percent_change} />
			</div>
		)
	}
})

export default MediaBoxContainer
