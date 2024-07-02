import React, { Component } from 'react'
import { Link } from 'react-router-dom'


export class NavBar extends Component {
  

  render() {
    return (
        <>
        <div>
        <nav className="navbar  navbar-fixed-top navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <Link className="navbar-brand" to="#">NewsHub</Link>
   
        
        
    <nav className={`navbar navbar-expand-lg navbar-dark bg-dark`}>
  <div className="container">
   
    <ul className="nav nav-pills">
  <li className="nav-item">
    <Link className="nav-link navbar-brand text-light" aria-current="page" to="/">Home</Link>
  </li>
  <li className="nav-item text-dark">
   
    <Link className="nav-link navbar-brand text-light" to='/about' >About As</Link>
    
   
  </li>
 
  <li className="nav-item text-dark">
  <Link className="nav-link navbar-brand text-light" to='/business' > business</Link> </li>
 
    <Link className="nav-link navbar-brand text-light" to='/entertainment' >entertainment</Link>
    <Link className="nav-link navbar-brand text-light" to='/' >general</Link>
    <Link className="nav-link navbar-brand text-light" to='/health' >health</Link>
    <Link className="nav-link navbar-brand text-light" to='/science' >science</Link>
    <Link className="nav-link navbar-brand text-light" to='/sports' >sports</Link>
    <Link className="nav-link navbar-brand text-light" to='/technology' >technology</Link>
    
    <Link className="nav-link navbar-brand text-light" to='/regis1' >Rgistration</Link>
    <Link className="nav-link navbar-brand text-light" to='/login' >Login</Link>
</ul>
 
  </div>
</nav>
      
      
  </div>
</nav>

        </div>
        
        </>
      
    )
  }
}

export default NavBar
