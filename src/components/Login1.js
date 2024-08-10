import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const Login1 = ({ setFirstName, setRole }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const localUrl1 = process.env.REACT_APP_URL;

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
        const response = await fetch(`${localUrl1}/api/Login?email=${encodeURIComponent(formData.email)}&password=${encodeURIComponent(formData.password)}`);
        const data = await response.json();

        if (response.ok) {
          const token = data.token;
          const decodedToken = jwtDecode(token);

          sessionStorage.setItem('token', token); // Store token in sessionStorage
          sessionStorage.setItem('firstname', decodedToken.unique_name);
          sessionStorage.setItem('role', decodedToken.role);
          setFirstName(decodedToken.unique_name);
          setRole(decodedToken.role);
 console.log(token)
          console.log('Login successful, navigating to /desc'); // Debugging log
          alert("Login successfully");
          navigate('/Desc');
        } else {
          console.error('Login failed:', data);
          setErrors({ password: 'Invalid username or password' });
        }
      } catch (error) {
        console.error('Login error:', error);
        setErrors({ password: 'Invalid username or password' });
      }
    }
  };

  const validateForm = (data) => {
    const errors = {};
    if (!data.email) errors.email = 'Email is required';
    if (!data.password) errors.password = 'Password is required';
    return errors;
  };

  const handleLogout = () => {
    sessionStorage.clear();
    setFirstName('');
    setRole('');
    navigate('/login'); // Navigate to login or home page
  };

  return (
    <div style={{ backgroundColor: 'rgb(130, 106, 251)' }}>
      <div className="myclass">
        <section className="container1">
          <center>
            <header style={{ fontSize: '250%' }}>Login Form</header>
          </center>
          <form className="form" onSubmit={handleSubmit}>
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
            <button type="submit">Login</button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Login1;
