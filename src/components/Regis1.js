import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Rechetu from './Rechetu'; // Assuming Rechetu component is in the same directory

const Regis1 = () => {
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    email: '',
    rediob:'', // Not sure what this is used for
    chek: '', // Not sure what this is used for
    ageRange: '',
  });

  const [selectedOption, setSelectedOption] = useState('');
  const [errors, setErrors] = useState({});
  const [selectedAgeRange, setSelectedAgeRange] = useState('');
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleAgeRangeChange = (event) => {
    setSelectedAgeRange(event.target.value);
    setFormData({
      ...formData,
      ageRange: event.target.value,
    });
  };
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = validateForm(formData);
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log('Form submitted successfully!');
      // Add logic here to handle form submission (e.g., API call, data processing)
    } else {
      console.log('Form submission failed due to validation errors.');
    }
  };

  const validateForm = (data) => {
    const errors = {};

    if (!data.fname.trim()) {
      errors.fname = 'First name is required';
    }
    if (!data.lname.trim()) {
      errors.lname = 'Last name is required';
    }
    if (!data.email) {
      errors.email = 'Email is required';
    }
    if (!selectedOption) {
      errors.radiob = 'Please select a gender';
    }
    if (!data.ageRange) {
      errors.ageRange = 'Please select an age range';
    }
    else {
      const selectedAge = parseInt(data.ageRange);
      if (selectedAge < 18 || selectedAge > 80) {
        errors.ageRange = 'Age must be between 18 and 80';
      }
    }
    
    return errors;
  };

  const handleClearClick = () => {
    setFormData({ fname: '', lname: '', email: '' , ageRange: ''});
    setSelectedOption('');
    setErrors({});
  };
  const ageOptions = [];
  for (let age = 1; age <= 100; age++) {
    ageOptions.push(<option key={age} value={age}>{age}</option>);
  }

  return (
    <div>
      <html lang="en">
        <head>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
          <title>Registration Form in HTML CSS</title>
          <link rel="stylesheet" href="style.css" />
        </head>
        <body style={{ backgroundColor: 'rgb(130, 106, 251)' }}>
          <br />
          <br />
          <div className="myclass">
            <section className="container1">
              <center>
                <header style={{ fontSize: '250%' }}>Registration Form</header>
              </center>
              <form action="#" className="form" onSubmit={handleSubmit}>
                <div className="input-box">
                  <label>First Name</label>
                  <input
                    type="text"
                    name="fname"
                    className="form-input"
                    value={formData.fname}
                    onChange={handleChange}
                    placeholder="Enter First name"
                  />
                  {errors.fname && <span className="error-message" style={{ color: 'red' }}>{errors.fname}</span>}
                </div>

                <div className="input-box">
                  <label>Last Name</label>
                  <input
                    type="text"
                    name="lname"
                    className="form-input"
                    value={formData.lname}
                    onChange={handleChange}
                    placeholder="Enter Last name"
                  />
                  {errors.lname && <span className="error-message" style={{ color: 'red' }}>{errors.lname}</span>}
                </div>

                <div className="input-box">
                  <label>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    className="form-input"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email address"
                  />
                  {errors.email && <span className="error-message error-danger" style={{ color: 'red' }}>{errors.email}</span>}
                </div>
                <h3>Gender</h3>
                <Rechetu name="radiob" value="female"  onChange={ handleOptionChange}
        checked= {selectedOption === 'female'} />
                <Rechetu name="radiob" value="male"   onChange={ handleOptionChange}
        checked= {selectedOption === 'male' }/>
                {errors.radiob && <span className="error-message" style={{ color: 'red' }}>{errors.radiob}</span>}
        <div>
          <labal>Select your age :</labal>
          <div class="select-box">
             
              <select
                    name="ageRange"
                    className="form-input"
                    value={formData.ageRange}
                    onChange={handleAgeRangeChange}
                  >
                    <option value="">Select age range</option>
                    {ageOptions}
                  </select>
                  {errors.ageRange && <span className="error-message" style={{ color: 'red' }}>{errors.ageRange}</span>}
                </div>
            </div>
      
               
                <button type="submit">Submit</button>
                <button type="button" className="btn btn-outline-warning" onClick={handleClearClick}>Clear</button>
                <br />
                <br />
                <div className="sign_up">
                  Already a member? <Link to="/login">Login now</Link>
                </div>
              </form>
            </section>
          </div>
        </body>
      </html>
    </div>
  );
};

export default Regis1;
