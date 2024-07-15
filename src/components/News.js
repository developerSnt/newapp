import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';

const News = ({ country, pageSize, category, setProgress }) => {
 
  const [articles, setArticles] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [page, setPage] = React.useState(1);
  const [totalResults, setTotalResults] = React.useState(0);

  React.useEffect(() => {
    document.title = `${capitalize(category)} - NewsHub`;
    updateNews();
  }, [category]);

  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const updateNews = async () => {
    const url = `https://saurav.tech/NewsAPI/top-headlines/category/${category}/in.json`;
    setLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      setArticles(data.articles);
      setTotalResults(data.totalResults);
      setLoading(false);
      await setProgress(100);
    } catch (error) {
      console.error('Error fetching news:', error);
      setLoading(false);
    }
  };

  const fetchMoreData = async () => {
    setPage(page + 1);
    const url = `https://saurav.tech/NewsAPI/top-headlines/category=${category}/in.json`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      setArticles([...articles, ...data.articles]);
      setTotalResults(data.totalResults);
    } catch (error) {
      console.error('Error fetching more news:', error);
    }
  };

  const handlePreviousClick = async () => {
    // Implement your logic here
  };

  const handleNextClick = async () => {
    // Implement your logic here
  };

  return (
    <div>
      <h1 className="text-center mt-4 mb-4">NewsHub - Top Headlines {capitalize(category)}</h1>

      {loading && <Spinner />}

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((element, index) => (
              <div className="col-md-3" key={index}>
                <NewsItem
                  title={element.title ? element.title.slice(0, 45) : ''}
                  description={element.description ? element.description.slice(0, 10000000) : ''}
                  imageurl={element.urlToImage}
                  newurl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source.name}
                />
              </div>
            ))}
          </div>
        </div>
      </InfiniteScroll>
    </div>
  );
};

News.defaultProps = {
  country: 'in',
  pageSize: 8,
  category: 'general',
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  setProgress: PropTypes.func.isRequired,
};

export default News;
