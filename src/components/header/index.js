import React, { Component } from 'react';
import './styles.css';

import FormDialog from './../modal';

class Header extends Component {

  render() {
    return(
      <header className="header">
        <span className="search-input-wrapper"><input type="text"/></span>
        <span className="search-status-wrapper">
          <select>
            <option>Interested</option>
            <option>Applying</option>
            <option>Interviewing</option>
            <option>Rejected</option>
            <option>No Response</option>
            <option>Offer</option>
            <option>Accepted</option>
          </select>
        </span>
        <FormDialog/>
      </header>
    )
  }
}

export default Header