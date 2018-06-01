import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './styles/ListIndex.css';

class ListIndex extends Component {
  constructor() {
    super();
    this.state = {
      lists: [{name:"", id: 0}]
    }
  }

  componentWillMount() {
    fetch('/api/lists/show', {
            method: 'GET',
            credentials: 'include'
          })
          .then((response) => {
            if (response.status !== 200) {
              console.log('Looks like there was a problem. Status Code: ' + response.status);
              return;
            }

            response.json().then((data) => {
              this.setState({ lists: data });
            });
          }
        )
        .catch((err) => {
          console.log('Fetch Error :-S', err)
        });

  }

  render() {
    console.log(this.state.lists);
    return(
      <div className="list-card mdl-card mdl-shadow--4dp">

        <div className="mdl-card__supporting-text">
          <div className="list-action mdl-list">
            {
              this.state.lists.map((list, index) =>
                <div className="mdl-list__item" key={index}>
                  <span className="mdl-list__item-primary-content">
                    <i className="list-icon material-icons">list</i>
                    <span className="list">{list.name}</span>
                  </span>
                  <Link to={`/lists/${list.id}`}>
                    <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
                      View List
                    </button>
                  </Link>
                </div>
              )
            }
          </div>
        </div>

        <div className="new-list-block mdl-card__supporting-text">
          <form id="list-index" action="/api/lists/create" method="post">
            <div className="new-list-input mdl-textfield mdl-js-textfield">
              <input className="new-list-input mdl-textfield__input" type="text" name="name" id="name" placeholder="New List"/>
            </div>
          </form>
        </div>
        <div className="mdl-card__actions">
          <button type="submit" form="list-index" className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
            Add List
          </button>
        </div>

      </div>
    );
  }
}



export default ListIndex;
