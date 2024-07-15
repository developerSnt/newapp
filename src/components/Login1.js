
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from './NavBar';

const Login1 = ({ setFirstName }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
useEffect(()=>{
  sessionStorage.clear();
},[]);
 
  const navigate=useNavigate()
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateForm(formData);
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await fetch(`https://localhost:7299/api/Login?email=${encodeURIComponent(formData.email)}&password=${encodeURIComponent(formData.password)}`);
        const data = await response.json();

        if (response.ok) {
          console.log('Login successful:', data);
         
          sessionStorage.setItem('firstname', data.userName); 
    setFirstName(data.userName); // Set firstName using setFirstName prop
    
          alert("Login successfully");
        
          navigate('/Desc');
        } else {
          console.error('Login failed:', data);
          setErrors({ password: 'Invalid username or password' });
        }
      } catch (error) {
        console.error('Invalid username or password:', error);
        setErrors({ password: 'Invalid username or password' });
      }
    } else {
      console.log('Form submission failed due to validation errors.');
      alert("Form Submission due to Validation Error");
    }
  };

  const validateForm = (data) => {
    const errors = {};

    if (!data.email) {
      errors.email = 'Email is required';
    }
    if (!data.password) {
      errors.password = 'Password is required';
    }

    return errors;
  };

  return (
    <div style={{ backgroundColor: 'rgb(130, 106, 251)' }}>
      <div className="myclass">
        <section className="container1">
          <center>
            <header style={{ fontSize: '250%' }}>Login Form</header>
          </center>
          <form action="#" className="form" onSubmit={handleSubmit}>
            <div className="input-box">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                className="form-input"
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {errors.email && <span className="error-message" style={{ color: 'red' }}>{errors.email}</span>}
            </div>

            <div className="input-box">
              <label>Password</label>
              <input
                type="password"
                name="password"
                className="form-input"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              {errors.password && <span className="error-message" style={{ color: 'red' }}>{errors.password}</span>}
            </div>
            <br />
            <div className="check_box">
              <input type="checkbox" />
              <span>Remember me</span>
            </div>
            <div className="forget_div">
              <a href="#">Forgot password?</a>
            </div>
            <button type="submit">Login</button>
            <br />
            <div className="sign_up">
              Not a member? <Link to="/regis1">Signup now</Link>
            </div>
          </form>
          {/* Display firstName here */}
          {/* <h1 color="white">Welcome : {firstName}</h1> */}
        </section>
       
      </div>
    </div>
  );
};

export default Login1;

