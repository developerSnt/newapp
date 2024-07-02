import React, { useState } from 'react';
import { Link } from 'react-router-dom';


export default function Regis1() {
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    email: '',
    rediob: '',
    chek : '',
  });

  const [selectedOption, setSelectedOption] = useState('');
  const [selectedOption1, setSelectedOption1] = useState('');

  const [errors, setErrors] = useState({
   
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleOptionChange1 = (event) => {
    setSelectedOption1(event.target.value);
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
    if (!selectedOption1) {
      errors.chkbox = 'Please select at least one certificate';
    }

    return errors;
  };

  const handleClearClick = () => {
    setFormData({ fname: '', lname: '', email: '' });
    setSelectedOption('');
    setSelectedOption1('');
    setErrors({});
  };
return (
<div>
  
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta http-equiv="X-UA-Compatible" content="ie=edge" />
<title>Registration Form in HTML CSS</title>
<link rel="stylesheet" href="style.css" />
</head>
<body   Style="background-color: rgb(130, 106, 251);">
  <div class="myclass ">
<section class="container1">
 <center> <header  style={{ fontSize:'250%' }}>Registration Form</header></center>
  <form action="#" class="form" onSubmit={handleSubmit}>
    <div class="input-box">
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

    <div class="input-box">
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

    <div class="input-box">
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

    
    <div class="gender-box">
      <h3>Gender</h3>
      <div class="gender-option">
        <div class="gender">
         
          <input
        className="form-check-input"
        type="radio"
        name="radiob"
        value="f"
        checked={selectedOption === 'f'}
        onChange={handleOptionChange}
      />
          <label for="check-male">Female</label>
        </div>
        
        <div class="gender">
          
          <input
        className="form-check-input"
        type="radio"
        name="radiob"
        value="m"
        checked={selectedOption === 'm'}
        onChange={handleOptionChange}
      />
          <label for="check-other">Male</label>
        </div><br></br>
       
      </div>
    </div>
    {errors.radiob && <span className="error-message" style={{ color: 'red' }}>{errors.radiob}</span>}
   
    
  
    <button>Submit</button>
    <button  type="button"
        className="btn btn-outline-warning"
        onClick={handleClearClick}>clear</button><br></br>
         <div class="sign_up">
       All Ready member? <Link to="/login">Login now</Link>
      </div>
  </form>
</section>
</div>
</body>
</html>
    </div>
  )
}
