import React, { Component } from 'react';

import'./styles.css';

class JobsList extends Component {
  constructor(props){
    super(props)
    this.state = {
      jobs: []
    }
  }

  componentDidMount() {
    this.getJobs();
  }

  handleChange = (e) => {
    console.log({[e.target.name] : e.target.value})
  }

  getJobs = () => {
    fetch('http://localhost:8000/api/getJobs')
    .then(res => res.json())
    .then(data => this.setState({jobs: data}))
    .catch(err => console.log(err))
  }

  render () {
    const { jobs } = this.state;

    console.log(jobs);
    
    return (
      <div className="jobs-list-wrapper">
        {jobs.length ? (
          <div>
            {jobs.map((item) => {
              return(
                <div className="job-container" key={item._id}>
                  <div className="logo-container"></div>
                  <div className="details-container">
                    <p>{item.title}</p>
                    <p>{item.compensation}</p>
                    <select defaultValue='true' onChange={this.handleChange}>
                      <option value='false'>option 1</option>
                      <option value='true'>Option 2</option>
                      <option value='false'>option 3</option>
                    </select>
                  </div>
                  <div className="desc-container">{item.description}</div>
                </div>
              )
            })}
          </div>
        ) : (
          <div>
            <h2>Could not retrive Jobs</h2>
          </div>
        )}
      </div>
    )
  }
}

export default JobsList;