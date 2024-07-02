import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Regis1() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = validateForm(formData);
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log('Form submitted successfully!');
      // Add logic here to handle login (e.g., API call, authentication)
    } else {
      console.log('Form submission failed due to validation errors.');
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

  const handleClearClick = () => {
    setFormData({ email: '', password: '' });
    setErrors({});
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
          <br></br>
          <div class="check_box">
          <input type="checkbox" />&nbsp;
          <span>Remember me</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <div class="forget_div">
          <a href="#">Forgot password?</a>
        </div>
        </div>
        
          <button type="submit">Login</button>
         <br></br>
         <div class="sign_up">
        Not a member? <Link to="/regis1">Signup now</Link>
      </div>
        </form>
      </section>
      </div>
    </div>
  );
}
