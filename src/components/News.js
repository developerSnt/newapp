import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';

export default class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general',
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
    };
    document.title = `${this.capitalize(this.props.category)} - NewsHub`;
  }

  // Function to capitalize the first letter of a string
  capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  // Function to fetch initial news data
  updateNews = async () => {
    let url = `https://saurav.tech/NewsAPI/top-headlines/category/${this.props.category}/in.json`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
  };

  async componentDidMount() {
    await this.props.setProgress(10);
    this.updateNews();
    await this.props.setProgress(100);
  }

  // Function to handle previous button click
  handlePreviousClick = async () => {
    // Implement your logic here
  };

  // Function to handle next button click
  handleNextClick = async () => {
    // Implement your logic here
  };

  // Function to fetch more data for infinite scroll
  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    const url = `https://saurav.tech/NewsAPI/top-headlines/category=${this.props.category}/in.json`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
    });
  };

  render() {
    return (
      <div>
        <h1 className="text-center mt-4 mb-4">NewsHub - Top Headlines {this.capitalize(this.props.category)}</h1>

        {this.state.loading && <Spinner />}
        
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map((element, index) => (
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
  }
}
