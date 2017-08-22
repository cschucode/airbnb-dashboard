'use strict';

import React from 'react'

class Header extends React.Component {

	componentDidMount(){
		$('a.bc-link').hide();
	}
	
	render (){
		return (
		  <header>
		    <nav>
		      <a href="/" className="home-link">
		        <img src="/images/social_media_icons/home-symbol.svg" className="logo" /> 
		        <span>Home </span>
		      </a>

		      <a href="#" className="bc-link bc-facebook">
		      	<i className="fa icon-chevron-right"></i> Facebook
		      </a>
		      <a href="#" className="bc-link bc-twitter">
		      	<i className="fa icon-chevron-right"></i> Twitter
		      </a>
		      <a href="#" className="bc-link bc-instagram">
		      	<i className="fa icon-chevron-right"></i> Instagram
		      </a>
		      <a href="#" className="bc-link bc-pinterest">
		      	<i className="fa icon-chevron-right"></i> Pinterest
		      </a>
		      
		    </nav>
		  </header>
		)
	}
}

export default Header
