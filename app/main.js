import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, Link, IndexRoute, IndexLink, hashHistory } from 'react-router'
import Header from './components/Header'
import MediaBoxContainer from './components/MediaBoxContainer'
import FeedPageContainer from './components/FeedPageContainer'

ReactDOM.render(
	<div>
		<Header />
		<Router history={hashHistory}>
			<Route path="/" component={MediaBoxContainer} />
			<Route path="/feed/:name/:account_id" component={FeedPageContainer} />
		</Router>
	</div>,
	document.getElementById('dashboard')
);
