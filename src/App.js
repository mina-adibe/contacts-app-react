import React, { Component } from "react";
import ListContacts from "./ListContacts";
import * as ContactsAPI from "./utils/ContactsAPI";
import CreateContact from "./CreateContact";
import { Route } from "react-router-dom";

class App extends Component {
  state = {
    contacts: []
  };
  componentDidMount = () => {
    ContactsAPI.getAll().then(contacts => {
      this.setState(() => ({ contacts }));
    });
  };
  removeContact = contact => {
    ContactsAPI.remove(contact)
      .then(contact => {
        this.setState(prevState => ({
          contacts: prevState.contacts.filter(c => c.id !== contact.id)
        }));
      })
      .catch(error => console.log("DB error"));
  };
  createContact = contact => {
    // console.log("contact first", contact);
    ContactsAPI.create(contact).then(contact => {
      this.setState(prevState => ({
        contacts: prevState.contacts.concat(contact)
      }));
    });
    // this is test code for something else
    // const response = true;
    // if(response) {
    //   fetch('http://localhost:3000/image', {
    //     method: 'put',
    //     headers: {'Content-Type': 'application/json'},
    //     body: JSON.stringify({
    //       id: this.state.user.id
    //     })
    //   })
    //     .then(response => response.json())
    //     .then(count => {
    //       this.setState(prevState => {
    //         return Object.assign({}, prevState.user, {entries: count})
    //       })
    //     })
    // }
    // this.displayFaceBox(this.calculateFaceLocation(response))
  };
  render() {
    return (
      <div>
        <Route
          exact
          path="/"
          render={() => (
            <ListContacts
              contacts={this.state.contacts}
              onDeleteContact={this.removeContact}
            />
          )}
        />
        <Route
          path="/create"
          render={({ history }) => (
            <CreateContact
              onCreateContact={contact => {
                this.createContact(contact);
                history.push("/");
              }}
            />
          )}
        />
      </div>
    );
  }
}

export default App;
