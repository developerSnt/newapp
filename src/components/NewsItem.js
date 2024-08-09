import React from 'react';
import { Link } from 'react-router-dom';
import defaultImage from '../assets/img1.jpg'; 

const NewsItem = ({ title, description, imageurl, author, date, source, newurl }) => {
  const isLoggedIn = sessionStorage.getItem('firstname') !== '' && sessionStorage.getItem('firstname') !== null;

   
  const handleImageError = (e) => {
 
    e.target.src =   defaultImage; 
  };

  return (
    <div>
      <div className="card mt-3 mr-4">
        <div style={{ display: 'flex', justifyContent: 'flex-end', position: 'absolute', right: '0' }}>
          <span className="badge rounded-pill bg-danger">{source}</span>
        </div>
        <img
          src={imageurl} 
          className="card-img-top"
          alt="Article"
          onError={handleImageError } 
        />
        <div className="card-body">
          <h5 className="card-title">
            {title}... <span className="badge rounded-pill bg-dark">New</span>
          </h5>
          <p className="card-text">{description}</p>
          <p className="card-text">
            <small className="text-muted">By {author || "Unknown"} On {new Date(date).toGMTString()}</small>
          </p>
          <Link
            className="bg-color btn btn-dark"
            to={isLoggedIn
              ? `/Desc?url=${encodeURIComponent(newurl)}&name=${encodeURIComponent(source)}&title=${encodeURIComponent(title)}&img=${encodeURIComponent(imageurl)}&date1=${encodeURIComponent(date)}`
              : `/login`
            }
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
