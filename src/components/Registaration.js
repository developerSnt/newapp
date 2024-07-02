import React, { useState } from 'react';

export default function Registration() {
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    email: '',
    rediob: '',
    chek : '',
  });

  const [selectedOption, setSelectedOption] = useState('');
  const [selectedOption1, setSelectedOption1] = useState('');

  const [errors, setErrors] = useState({});

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
    <div className="container">
      <form onSubmit={handleSubmit}>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        Enter Your First Name :{' '}
        <input
          type="text"
          name="fname"
          className="form-input"
          value={formData.fname}
          onChange={handleChange}
        />
        {errors.fname && <span className="error-message">{errors.fname}</span>}
        <br></br>
        <br></br>
        <label htmlFor="lname" className="form-label">
          Enter Your Last Name :{' '}
        </label>
        <input
          type="text"
          name="lname"
          className="form-input"
          value={formData.lname}
          onChange={handleChange}
        />
        {errors.lname && <span className="error-message">{errors.lname}</span>}
        <br></br>
        <label htmlFor="email" className="form-label">
          Email address
        </label>
        <input
          type="email"
          name="email"
          className="form-input"
          placeholder="name@example.com"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <span className="error-message">{errors.email}</span>}
        <br></br>
        <br></br>
        <label htmlFor="gense" className="form-label">
          Select Gender
        </label>
        <div className="form-input">
          <input
            className="form-check-input"
            type="radio"
            name="radiob"
            value="f"
            checked={selectedOption === 'f'}
            onChange={handleOptionChange}
          />
          <label className="form-check-label">Female</label>  {errors.radiob && <span className="error-message">{errors.radiob}</span>}
        </div>
      
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="radiob"
            value="m"
            checked={selectedOption === 'm'}
            onChange={handleOptionChange}
          />
          <label className="form-check-label">Male</label>
        </div>
        <br></br>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            name="chkbox"
            value="10th"
            checked={selectedOption1 === '10th'}
            onChange={handleOptionChange1}
          />
          <label className="form-check-label">10th Marksheet</label> {errors.chkbox && <span className="error-message">{errors.chkbox}</span>}
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            name="chkbox"
            value="12th"
            checked={selectedOption1 === '12th'}
            onChange={handleOptionChange1}
          />
          <label className="form-check-label">12th marksheet</label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            name="chkbox"
            value="other"
            checked={selectedOption1 === 'other'}
            onChange={handleOptionChange1}
          />
          <label className="form-check-label">Other Certificate</label>
          <br></br>
          <br></br>
          <button type="submit" className="btn btn-outline-warning">
            Submit
          </button>
          &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
          <button
            type="button"
            className="btn btn-outline-warning"
            onClick={handleClearClick}
          >
            Clear
          </button>
        </div>
      </form>
     
    </div>
  );
}
