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
import Desc from './components/Desc';
import NewsList from './components/NewsList';
import Insertdata from './components/Insertdata';
import Update from './components/Update';
import NewsDetails from './components/NewsDetails';
import InsertNewsData from './components/InsertNewsData';
import UpdateNewsData from './components/Updatenewsdata';
import AdminNav from './components/AdminNav';
import ProtectedRoute from './components/ProtectedRoute'; 
import ProtectedRoute1 from './components/ProtectedRoute1'; 
import Demo from './components/Demo';
export default class App extends Component {

  state = {
    progress: 0,
    firstName: sessionStorage.getItem('firstname') || '',
    role: sessionStorage.getItem('role') || '' // Add role to state
  };

  setProgress = (progress) => {
    this.setState({ progress });
  };

  setFirstName = (firstName) => {
    this.setState({ firstName });
  };

  setRole = (role) => {
    this.setState({ role });
  };

  handleLogout = () => {
    sessionStorage.clear();
    this.setState({ firstName: '', role: '' }); // Clear state on logout
  };

  render() {
    const { firstName, role } = this.state;
    const isLoggedIn = sessionStorage.getItem('firstname') !== '' && sessionStorage.getItem('firstname') !== null;
    return (
      
        <Router>
      
          <NavBar user={firstName} onLogout={this.handleLogout} userRole={role} />
       
        <LoadingBar
          height={3}
          color='#FF3377'
          progress={this.state.progress}
        />
        <Routes>
          <Route path='/login' element={<Login1 setFirstName={this.setFirstName} setRole={this.setRole} />} />
          
          {/* Public Routes */}
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
          <Route path='/login11' element={<Red />} />
          <Route path='/demo' element={<Demo />} />
         
          {/* Protected Routes */}
          <Route path='/Data' element={<ProtectedRoute element={TabalData} userRole={role} />} />
          <Route path='/Desc' element={<ProtectedRoute element={Desc} userRole={role} />} />
          {/* <Route path="/desc" element={<ProtectedRoute1 element={Desc} userRole={role}/>} /> */}
          <Route path='/NewsList' element={<ProtectedRoute element={NewsList} userRole={role} />} />
          <Route path='/insertdata' element={<ProtectedRoute element={Insertdata} userRole={role} />} />
          <Route path='/Updatedata/:id' element={<ProtectedRoute element={Update} userRole={role} />} />
          <Route path='/NewsData' element={<ProtectedRoute element={NewsDetails}  userRole={role} />} />
          <Route path='/InserNewsdata1' element={<ProtectedRoute element={InsertNewsData} userRole={role} />} />
          <Route path="/UpdateNewsData/:id" element={<ProtectedRoute element={UpdateNewsData} userRole={role} />} />
        </Routes>
      </Router>
    );
  }
}
