import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Rechetu from './Rechetu'; // Assuming Rechetu component is in the same directory
import apiService from './apiService';

const Regis1 = () => {
  const [formData, setFormData] = useState({
    FirstName: '',
    LastName: '',
    email: '',
    Gender : '',
    certificate: [],
    age : '',
    password: '',
    comformpassword : '',
  });
const navigate=useNavigate()
//   useEffect(() => {
//     fetchData();
//   }, []);

  const [dataList, setDataList] = useState([]);
 
//   const fetchData = async () => {
//     try {debugger
//       const data = await apiService.fetchData();
//       setDataList(data);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

  const [errors, setErrors] = useState({});
  const [isChecked, setIsChecked] = useState(false);
 
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      // Handle checkboxes separately to toggle values in the certificate array
      if (checked) {
        setFormData({
          ...formData,
          certificate: [...formData.certificate, value], // Add the selected value
        });
      } else {
        setFormData({
          ...formData,
          certificate: formData.certificate.filter((item) => item !== value), // Remove the deselected value
        });
      }
    } else {
      // For text inputs, email, etc.
      setFormData({
        ...formData,
        [name]: value,
      });
    }
      };

  const handleAgeRangeChange = (event) => {
    const { value } = event.target;
    setFormData({
      ...formData,
      age : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateForm(formData);
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
         const createdData = await apiService.createData(formData);
         console.log('Created data:', createdData);
        setFormData({
            FirstName: '',
            LastName: '',
          email: '',
          Gender : '',
          certificate: [],
          age : '',
          password: '',
          comformpassword : '',
        });
        console.log(formData);
        alert("You are Sucessfully Registrtion now you can login.");
        
        navigate('/login');
        // fetchData(); // Refresh data list after successful submission
      } catch (error) {
        console.error('Error creating data:', error);
      }
    } else {
      console.log('Form submission failed due to validation errors.');
    }
  };

  const validateForm = (data) => {
    const errors = {};

    if (!data.FirstName.trim()) {
      errors.fname = 'First name is required';
    }
    if (!data.LastName.trim()) {
      errors.LastName = 'Last name is required';
    }
    if (!data.email) {
      errors.email = 'Email is required';
    }
    if (!data. Gender) {
      errors.Gender = 'Please select a gender';
    }
    if (!data.age ) {
      errors.age  = 'Please select an age range';
    } else {
      const selectedAge = parseInt(data.age );
      if (selectedAge < 18 || selectedAge > 80) {
        errors.age  = 'Age must be between 18 and 80';
      }
    }
    if (!data.password) {
      errors.password = 'Password is required';
    } else if (data.password.length < 4) {
      errors.password = 'Password must be at least 4 characters long';
    }
    if (!data.comformpassword ) {
      errors.comformpassword  = 'Confirm Password is required';
    } else if (data.password !== data.comformpassword ) {
      errors.comformpassword  = 'Passwords do not match';
    }
    return errors;
  };
  
  const handleClearClick = () => {
    setFormData({ FirstName: '', LastName: '', email: '',  Gender: '', certificate: [], age : '', password: '',
      comformpassword : ''});
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

              <ul>
                {dataList.map((data) => (
                  <li key={data.id}>{data.name}</li>
                ))}
              </ul>
              
              <form action="#" className="form" onSubmit={handleSubmit}>
                <div className="input-box">
                  <label>First Name</label>
                  <input
                    type="text"
                    name="FirstName"
                    className="form-input"
                    value={formData.FirstName}
                    onChange={handleChange}
                    placeholder="Enter First name"
                  />
                  {errors.FirstName && <span className="error-message" style={{ color: 'red' }}>{errors.FirstName}</span>}
                </div>

                <div className="input-box">
                  <label>Last Name</label>
                  <input
                    type="text"
                    name="LastName"
                    className="form-input"
                    value={formData.LastName}
                    onChange={handleChange}
                    placeholder="Enter Last name"
                  />
                  {errors.LastName&& <span className="error-message" style={{ color: 'red' }}>{errors.lname}</span>}
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
                <Rechetu
                  name="Gender"
                  value="female"
                  onChange={handleChange}
                  checked={formData.Gender  === 'female'}
                />
              
                <Rechetu
                  name="Gender"
                  value="male"
                  onChange={handleChange}
                  checked={formData.Gender  === 'male'}
                />
           
                {errors.Gender && <span className="error-message" style={{ color: 'red' }}>{errors.Gender}</span>}

                <div>
                  <label>Select your age:</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <select
                    name="age "
                    className="form-input"
                    value={formData.age }
                    onChange={handleAgeRangeChange}
                  >
                    <option value="">Select age range</option>
                    {ageOptions}
                  </select>
                  {errors.age  && <span className="error-message" style={{ color: 'red' }}>{errors.age }</span>}
                </div>

                <br />
                <label>Select your Certificate:</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <div className="policy">
                  <input
                    type="checkbox"
                    name="certificate"
                    value="10th"
                    checked={formData.certificate.includes('10th')}
                    onChange={handleChange}
                  />
                  <label className="form-check-label">10th Marksheet</label>
                </div>

                <div className="policy">
                  <input
                    type="checkbox"
                    name="certificate"
                    value="12th"
                    checked={formData.certificate.includes('12th')}
                    onChange={handleChange}
                  />
                  <label className="form-check-label">12th marksheet</label>
                </div>

                <div className="policy">
                  <input
                    type="checkbox"
                    name="certificate"
                    value="other"
                    checked={formData.certificate.includes('other')}
                    onChange={handleChange}
                  />
                  <label className="form-check-label">Other Certificate</label>
                </div>

                <div className="input-box">
                    <label>Password</label>
                    <input
                      type="password"
                      name="password"
                      className="form-input"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter password"
                    />
                    {errors.password && <span className="error-message" style={{ color: 'red' }}>{errors.password}</span>}
                  </div>

                  <div className="input-box">
                    <label>Confirm Password</label>
                    <input
                      type="password"
                      name="comformpassword"
                      className="form-input"
                      value={formData.comformpassword}
                      onChange={handleChange}
                      placeholder="Confirm password"
                    />
                    {errors.comformpassword  && <span className="error-message" style={{ color: 'red' }}>{errors.comformpassword}</span>}
                  </div>
                <br />
                <br />

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
