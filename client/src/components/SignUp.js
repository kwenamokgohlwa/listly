import React, { Component } from 'react';
import './styles/SignUp.css';

class SignUp extends Component {

  render() {
    return(
  		<div className="sign-up-card mdl-card mdl-shadow--6dp">
  			<div className="sign-up-title mdl-card__title mdl-color-text--white">
  				<h2 className="mdl-card__title-text">Sign Up</h2>
  			</div>
  	  	<div className="mdl-card__supporting-text">
  				<form id="sign-up" action="/api/users/sign_up" method="post">
  					<div className="mdl-textfield mdl-js-textfield">
  						<input className="mdl-textfield__input" type="text" name="name" id="name" placeholder="Name"/>
  					</div>
            <div className="mdl-textfield mdl-js-textfield">
  						<input className="mdl-textfield__input" type="text" name="surname" id="surname" placeholder="Surname"/>
  					</div>
            <div className="mdl-textfield mdl-js-textfield">
  						<input className="mdl-textfield__input" type="email" name="email" id="email" placeholder="Email"/>
  					</div>
  					<div className="mdl-textfield mdl-js-textfield">
  						<input className="mdl-textfield__input" type="password" name="password" id="password" placeholder="Password"/>
  					</div>
  				</form>
  			</div>
  			<div className="mdl-card__actions mdl-card--border">
  				<button type="submit" form="sign-up" className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">Sign Up</button>
  			</div>
  		</div>
    );
  }
}

export default SignUp;
