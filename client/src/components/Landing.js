import React from 'react';

const Landing = () => (
  <section className="landing">
    <section className="hero">
      <h1 className="hero-title">Listly</h1>
      <a href="/users/sign_up">
        <button className="hero-button mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
          Sign Up
        </button>
      </a>
      <a href="/users/sign_in">
        <button className="hero-button mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
          Sign In
        </button>
      </a>
    </section>
    <section className="selling-points">
      <div className="point mdl-card mdl-shadow--4dp">
        <div className="mdl-card__supporting-text">
          <i className="point-icon material-icons">list</i>
        </div>
        <div className="mdl-card__title">
          <h2 className="point-title mdl-card__title-text">Lists</h2>
        </div>
        <div className="mdl-card__supporting-text">
          <p className="point-description">Create or Modify Lists</p>
        </div>
        <div className="mdl-card__actions">
          <a href='/lists' className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
            View List
          </a>
        </div>
      </div>
      <div className="point mdl-card mdl-shadow--4dp">
        <div className="mdl-card__supporting-text">
          <i className="point-icon material-icons">group</i>
        </div>
        <div className="mdl-card__title">
          <h2 className="point-title mdl-card__title-text">Groups</h2>
        </div>
        <div className="mdl-card__supporting-text">
          <p className="point-description">Ceate or Modify Groups</p>
        </div>
        <div className="mdl-card__actions">
          <a href='/groups' className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
            View Groups
          </a>
        </div>
      </div>
      <div className="point mdl-card mdl-shadow--4dp">
        <div className="mdl-card__supporting-text">
          <i className="point-icon material-icons">star_rate</i>
        </div>
        <div className="mdl-card__title">
          <h2 className="point-title mdl-card__title-text">Suggestions</h2>
        </div>
        <div className="mdl-card__supporting-text">
          <p className="point-description">Add Suggested Items to your Lists</p>
        </div>
        <div className="mdl-card__actions">
          <a href='/suggestions' className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
            View Suggestions
          </a>
        </div>
      </div>
    </section>
  </section>
);

export default Landing;
