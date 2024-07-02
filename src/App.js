
import './App.css';

import React, { Component } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import {
  BrowserRouter as  Router,
  Routes,
  Route,   
 
 Link
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'
import NewsItem from './components/NewsItem';
import About from './components/About';
import GetData from './components/GetData';
import Registaration from './components/Registaration';
import Regis1 from './components/Regis1';
export default class App extends Component {
  state = {
    progress:0
  }
  setprogress = (progress) => {
     this.setState({progress: progress})
  }
  // apikey = process.env.REACT_APP_NEWS_API
  render() {
   
    return (
    
      
      <div>
         
      
      <Router>
          <NavBar />
          <LoadingBar
          height={3}
        color='#FF3377'
        progress={this.state.progress}
        
      />
          <Routes>
          <Route path='/about' element={<About></About>}></Route>
            <Route path='/' element={<News setprogress={this.setprogress} key='general'  pageSize={8} country='us' category='general' />}></Route>
            <Route path='/business' element={<News setprogress={this.setprogress} key='business'  pageSize={8} country='us' category='business' />}></Route>
            <Route path='/entertainment' element={<News setprogress={this.setprogress} key='entertainment' pageSize={8} country='us' category='entertainment' />}></Route>
            <Route path='/health' element={<News setprogress={this.setprogress} key='health' pageSize={8}  country='us' category='health' />}></Route>
            <Route path='/science' element={<News setprogress={this.setprogress} key='science' pageSize={8}  country='us' category='science' />}></Route>
            <Route path='/sports' element={<News setprogress={this.setprogress} key='sports' pageSize={8}  country='us' category='sports' />}></Route>
            <Route path='/technology' element={<News setprogress={this.setprogress} key='technology'  pageSize={8} country='us' category='technology' />}></Route>
            <Route path='/about' element={<About></About>}></Route>
            {/* <Route path='/getdata' element={<GetData></GetData>}></Route> */}
            <Route path='/regis' element={<Registaration></Registaration>}></Route>
            <Route path='/regis1' element={<Regis1></Regis1>}></Route>
          </Routes>
        </Router>
      </div>


      
    )
  }
}
