import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import Landing from './components/Landing';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import ListIndex from './components/ListIndex';
import List from './components/List';
import GroupIndex from './components/GroupIndex';
import Group from './components/Group';
import Suggestion from './components/Suggestion';
import ComingSoon from './components/ComingSoon';

class App extends Component {
  state = {
    response: ''
  };

  // componentDidMount() {
  //   this.callApi()
  //     .then(res => this.setState({ response: res.express }))
  //     .catch(err => console.log(err));
  // }
  //
  // callApi = async () => {
  //   const response = await fetch('/api/hello'

  //   const body = await response.json();
  //
  //   if (response.status !== 200) throw Error(body.message);
  //
  //   return body;
  // };

  render() {
    return (
        <div className="App mdl-layout mdl-js-layout mdl-layout--fixed-header">
          <header className="mdl-layout__header">
            <div className="mdl-layout-icon"></div>
            <div className="mdl-layout__header-row">
              <span>Listly</span>
              <div className="mdl-layout-spacer"></div>
            </div>
          </header>
          <div className="mdl-layout__drawer">
            <nav className="mdl-navigation">
              <Link to='/' className="mdl-navigation__link">Home</Link>
              <Link to='/users/sign_up' className="mdl-navigation__link" style={{color: 'rgb(62, 126, 255)'}}>Sign Up</Link>
              <Link to='/users/sign_in' className="mdl-navigation__link" style={{color: 'rgb(62, 126, 255)'}}>Sign In</Link>
              <Link to='/lists' className="mdl-navigation__link">Lists</Link>
              <Link to='/groups' className="mdl-navigation__link">Groups</Link>
              <Link to='/suggestions' className="mdl-navigation__link">Suggestions</Link>
            </nav>
          </div>
          <main className="mdl-layout__content">
            <Route exact path="/" component={Landing} />
            <Route path="/users/sign_up" component={SignUp} />
            <Route path="/users/sign_in" component={SignIn} />
            <Route exact path="/lists" component={ListIndex} />
            <Route path="/lists/:id" component={List} />
            <Route exact path="/groups" component={ComingSoon} />
            <Route path="/groups/:id" component={ComingSoon} />
            <Route path="/suggestions" component={ComingSoon} />
          </main>
        </div>

    );
  }
}

export default App;
