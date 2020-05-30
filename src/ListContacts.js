import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class ListContacts extends Component {
  static propTypes = {
    contacts: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        handle: PropTypes.string.isRequired,
        avatarURL: PropTypes.string.isRequired
      })
    ),
    onDeleteContact: PropTypes.func.isRequired
  };
  state = {
    query: ""
  };
  updateQuery = e => {
    const query = e.target.value;
    this.setState(() => ({
      query: query.trim()
    }));
  };
  clearQuery = () => {
    this.setState(() => ({
      query: ""
    }));
  };
  render() {
    const { query } = this.state;
    const { contacts, onDeleteContact, onNavigate } = this.props;

    const showingContacts =
      query === ""
        ? contacts
        : contacts.filter(contact =>
            contact.name.toLowerCase().includes(query.toLowerCase())
          );

    return (
      <div className="list-contacts">
        <div className="list-contacts-top">
          <input
            className="search-contacts"
            type="text"
            placeholder="Search Contacts"
            value={query}
            onChange={this.updateQuery}
          />
          <Link to="create" className="add-contact">
            Add Contact
          </Link>
        </div>
        {showingContacts.length !== contacts.length && (
          <div className="showing-contacts">
            <span>
              Now showing {showingContacts.length} of {contacts.length}
            </span>
            <button onClick={this.clearQuery}>Show all</button>
          </div>
        )}
        <ol className="contact-list">
          {showingContacts.map(contact => (
            <li key={contact.id} className="contact-list-item">
              <div
                className="contact-avatar"
                style={{
                  backgroundImage: `url(${contact.avatarURL})`
                }}
              />
              <div className="contact-details">
                <p>{contact.name}</p>
                <p>{contact.handle}</p>
              </div>
              <button
                className="contact-remove"
                onClick={() => onDeleteContact(contact)}
              >
                Remove
              </button>
            </li>
          ))}
        </ol>
      </div>
    );
  }
}

export default ListContacts;
