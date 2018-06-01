import React, { Component } from 'react';
import './styles/List.css';

class List extends Component {
  constructor() {
    super();
    this.state = {
      list: []
    }
  }

  componentWillMount() {
    fetch(`/api/lists/${this.props.match.params.id}/show`, {
            method: 'GET',
            credentials: 'include'
          })
          .then((response) => {
            if (response.status !== 200) {
              console.log('Looks like there was a problem. Status Code: ' + response.status);
              return;
            }

            response.json().then((data) => {
              this.setState({ list: data });
              console.log(data);
            });
          }
        )
        .catch((err) => {
          console.log('Fetch Error :-S', err)
        });

  }

  handleChange(e) {
    fetch(`/api/lists/${this.props.match.params.id}/items/update`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({itemId: e.target.name, checked: e.target.checked}),
        credentials: 'include'
      })
      .catch((err) => {
        console.log('Fetch Error :-S', err)
      });
  }

  render() {
    return(
      <div className="list-card list-card mdl-card mdl-shadow--4dp">
        <div className="list-card-supporting mdl-card__supporting-text">
          <table className="list-table mdl-data-table mdl-js-data-table">
            <thead>
              <tr>
                <th>Purchased</th>
                <th className="mdl-data-table__cell--non-numeric">Item</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.list.map((item, index) =>
                  <tr key={index}>
                    <td>
                      <input type="checkbox" name={item.id} defaultChecked={item.checked} onChange={(e) => this.handleChange(e)}/>
                    </td>
                    <td className="mdl-data-table__cell--non-numeric">{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>{item.price}</td>
                    <td>
                      <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
                        Delete
                      </button>
                    </td>
                  </tr>
                )
              }

            </tbody>
          </table>
        </div>
        <div className="new-item-block mdl-card__supporting-text">
          <form id="list" action={`/api/lists/${this.props.match.params.id}/create`} method="post">
            <div className="new-item-input mdl-textfield mdl-js-textfield">
              <input className="new-item-input mdl-textfield__input" type="text" name="name" id="item" placeholder="Item"/>
            </div>
            <div className="new-item-input mdl-textfield mdl-js-textfield">
              <input className="new-item-input mdl-textfield__input" type="text" name="quantity" id="quantity" placeholder="Quantity"/>
            </div>
            <div className="new-item-input mdl-textfield mdl-js-textfield">
              <input className="new-item-input mdl-textfield__input" type="text" name="price" id="price" placeholder="Price"/>
            </div>
          </form>
        </div>
        <div className="mdl-card__actions">
          <button ype="submit" form="list" className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
            Add Item
          </button>
        </div>
      </div>
    );
  }
}

export default List;
