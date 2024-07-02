// NewsItem.js

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import GetData from './GetData';



class NewsItem extends  React.Component {
 
  render() {
    const { title, description, imageurl, author, date, source } = this.props;
    const { article } = this.props;
    return (
      <div>
        <div className="card mt-3 mr-4">
          <div style={{ display: 'flex', justifyContent: 'flex-end', position: 'absolute', right: '0' }}>
            <span className="badge rounded-pill bg-danger">{source}</span>
          </div>
          <img
            src={!imageurl ? "https://images.livemint.com/img/2022/04/21/600x338/long_covid_symptoms_1650540839356_1650540839488.jpg" : imageurl}
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">
              {title}... <span className="badge rounded-pill bg-dark">New</span>
            </h5>
            <p className="card-text">{description}</p>
            <p className="card-text">
              <small className="text-muted">By {!author ? "Unknown" : author} On {new Date(date).toGMTString()} </small>
            </p>
            <Link
             
              className="btn btn-dark"
            >
              Read More
            </Link>
          </div>
        </div>
        <div></div>
        
      </div>
    );
  }
}

export default NewsItem;