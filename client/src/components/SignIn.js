import React, { Component } from 'react';
import './styles/SignIn.css';

class SignIn extends Component {

  render() {
    return(
      <div className="sign-in-card mdl-card mdl-shadow--6dp">
  			<div className="sign-in-title mdl-card__title mdl-color-text--white">
  				<h2 className="mdl-card__title-text">Sign In</h2>
  			</div>
  	  	<div className="mdl-card__supporting-text">
  				<form id="sign-in" action="/api/users/sign_in" method="post">
            <div className="mdl-textfield mdl-js-textfield">
  						<input className="mdl-textfield__input" type="email" name="email" id="email" placeholder="Email"/>
  					</div>
  					<div className="mdl-textfield mdl-js-textfield">
  						<input className="mdl-textfield__input" type="password" name="password" id="password" placeholder="Password"/>
  					</div>
  				</form>
  			</div>
  			<div className="mdl-card__actions mdl-card--border">
  				<button type="submit" form="sign-in" className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">Sign In</button>
  			</div>
  		</div>
    );
  }
}

export default SignIn;
