import React, { Component } from 'react';
import JobsList from './../jobList';
import Header from './../header';

import './styles.css';

class Home extends Component {
  render() {
    return (
    <div className="App">
      <Header/>
      <JobsList/>
    </div>
    );
  }
}
export default Home;

