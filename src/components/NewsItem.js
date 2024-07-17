import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NewsItem = ({ title, description, imageurl, author, date, source, newurl }) => {
 
  return (
    <div>
      <div className="card mt-3 mr-4">
        <div style={{ display: 'flex', justifyContent: 'flex-end', position: 'absolute', right: '0' }}>
          <span className="badge rounded-pill bg-danger">{source}</span>
        </div>
        <img
          src={!imageurl ? "https://images.livemint.com/img/2022/04/21/600x338/long_covid_symptoms_1650540839356_1650540839488.jpg" : imageurl}
          className="card-img-top"
          alt="Article"
        />
        <div className="card-body">
          <h5 className="card-title">
            {title}... <span className="badge rounded-pill bg-dark">New</span>
          </h5>
          <p className="card-text">{description}</p>
          <p className="card-text">
            <small className="text-muted">By {!author ? "Unknown" : author} On {new Date(date).toGMTString()}</small>
          </p>
          <Link to={`/Desc?url=${encodeURIComponent(newurl)}&name=${encodeURIComponent(source)}&tital=${encodeURIComponent(title)}&img=${encodeURIComponent(imageurl)}&date1=${encodeURIComponent(date)}`} className="btn btn-dark">
            Read More
          </Link>
            {/* <Link to={newurl} className="btn btn-dark">
            Read More
          </Link> */}
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
