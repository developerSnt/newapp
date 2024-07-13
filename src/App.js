// App.js
import React, { Component } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import News from './components/News';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';
import About from './components/About';
import Registaration from './components/Registaration';
import Regis1 from './components/Regis1';
import Login1 from './components/Login1';
import Red from './components/Red';
import TabalData from './components/TabalData';

export default class App extends Component {
  state = {
    progress: 0,
    firstName: "", // Initialize firstName state
  };

  setProgress = (progress) => {
    this.setState({ progress });
  };

  setFirstName = (firstName) => {
    this.setState({ firstName });
  };

  render() {
    return (
      <div>
        <Router>
          <NavBar user={this.state.firstName} /> {/* Pass firstName as user prop */}
          <LoadingBar
            height={3}
            color='#FF3377'
            progress={this.state.progress}
          />
          <Routes>
            <Route path='/' element={<News setProgress={this.setProgress} key='general' pageSize={8} country='us' category='general' />} />
            <Route path='/about' element={<About />} />
            <Route path='/business' element={<News setProgress={this.setProgress} key='business' pageSize={8} country='us' category='business' />} />
            <Route path='/entertainment' element={<News setProgress={this.setProgress} key='entertainment' pageSize={8} country='us' category='entertainment' />} />
            <Route path='/health' element={<News setProgress={this.setProgress} key='health' pageSize={8} country='us' category='health' />} />
            <Route path='/science' element={<News setProgress={this.setProgress} key='science' pageSize={8} country='us' category='science' />} />
            <Route path='/sports' element={<News setProgress={this.setProgress} key='sports' pageSize={8} country='us' category='sports' />} />
            <Route path='/technology' element={<News setProgress={this.setProgress} key='technology' pageSize={8} country='us' category='technology' />} />
            <Route path='/regis' element={<Registaration />} />
            <Route path='/regis1' element={<Regis1 />} />
            <Route path='/login' element={<Login1 setFirstName={this.setFirstName} />} /> {/* Pass setFirstName as prop */}
            <Route path='/login11' element={<Red />} />
            <Route path='/Data' element={<TabalData />} />
          </Routes>
        </Router>
      </div>
    );
  }
}
