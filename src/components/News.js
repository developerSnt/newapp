import React, { Component } from 'react'
import PropTypes from 'prop-types'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';

import About from './About';
import GetData from './GetData';



export default class News extends Component {
   static defaultProps = {
     country: 'in',
     pageSize: 8,
     category: 'general',
   }
   
   static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
   }
   Capitalize = (str)=>{
    return str.charAt(0).toUpperCase() + str.slice(1);
    }
 constructor(props){
     super(props);
     console.log("Hello Iam a constructor from News component");
     this.state ={
        articles:[],
        loading: true,
        page:1,
        totalResults:0
        
     }
     document.title = `${this.Capitalize(this.props.category)} - NewsHub`;
 }
 async UpdateNews(){

 

  
  let url = `https://saurav.tech/NewsAPI/top-headlines/category/${this.props.category}/in.json`;
 
  this.setState({loading : true});
  let data = await fetch(url);
  let parsedData = await data.json()
  console.log(parsedData);
  this.setState({articles: parsedData.articles, totalResults : parsedData.totalResults,loading:false})
 }
async componentDidMount(){
  this.props. setprogress(10)
    console.log("cmd");
    let url = `https://saurav.tech/NewsAPI/top-headlines/category/${this.props.category}/in.json`;
    this.setState({loading : true});
    let data = await fetch(url);
    
    this.props. setprogress(30)
    let parsedData = await data.json()
    console.log(parsedData);
    this.props. setprogress(70)
    this.setState({articles: parsedData.articles, totalResults : parsedData.totalResults,loading:false})
    this.props. setprogress(100)
  }
 handlePreviesClick =  async ()=>{
   console.log("previous")
   let url = `https://saurav.tech/NewsAPI/top-headlines/category/${this.props.category}/in.json`;
   
  this.setState({loading : true});
   let data = await fetch(url);
  let parsedData = await data.json()
  
  this.setState({
    page: this.state.page - 1,
    articles: parsedData.articles,
    loading: false
    })

 }
 handleNextClick = async()=>{
  console.log("Next")
  if(! (this.state.page+1 > Math.ceil (this.state.totalResults/this.props.pageSize)))
    {
      let url = `https://saurav.tech/NewsAPI/top-headlines/category/${this.props.category}/in.json`;
      this.setState({loading: true});
      let data = await fetch(url);
    let parsedData = await data.json()
    
    this.setState({
      page: this.state.page + 1,
      articles: parsedData.articles,
      loading: false
      })
    }
  

}
 fetchMoreData = async() => {
 this.setState({page: this.state.page + 1})
 const url = `https://saurav.tech/NewsAPI/top-headlines/category=${this.props.category}/in.json`;
 
 let data = await fetch(url);
 let parsedData =await data.json()
  console.log(parsedData);
 console.log(data);

 this.setState({articles: this.state.articles.concat(parsedData.articles), totalResults : parsedData.totalResults})
};
  render() {
    return (
      <div>
        <h1 className="text-center mt-4 mb-4 "> NewsHub - Top Headlines {this.Capitalize(this.props.category)} </h1>
       
       {this.state.loading && <Spinner />} 
      <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={this.state.loading && <Spinner />}
        >
          <div className="container">
       <div className="row">
       {/* {!this.state.loading && this.state.articles.map((element)=>{  */}
        {this.state.articles.map((element)=>{ 
        return <div className="col-md-3"  key={element.url}>
    
        <NewsItem  title={element.title?element.title.slice(0, 45):""} description={element.description?element.description.slice(0, 10000000):""} imageurl={element.urlToImage} newurl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}></NewsItem>
     
        </div>
      
       })}

</div>
        
       
        </div> 
        </InfiniteScroll>
        {/* <div className="container">
       
        <div className="d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark"  onClick={this.handlePreviesClick}>&larr; Previes</button>
        <button type="button" disabled={this.state.page+1 > Math.ceil (this.state.totalResults/this.props.pageSize)} className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
          </div>
        </div> */}
        

      </div>
      
    )
  }
}

    