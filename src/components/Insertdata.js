import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import apiService from './apiService';

export default function Insertdata() {
  const [formData, setFormData] = useState({
    url: '',
    source: '',
    elementClass: '',
    elementId: '',
    Domion: '',
  });
  const [errors, setErrors] = useState({}); // State to manage form validation errors

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateForm(formData);
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const createdData = await apiService.createData1(formData);
        console.log('Created data:', createdData);

        // Clear form data after successful submission
        setFormData({
          url: '',
          source: '',
          elementClass: '',
          elementId: '',
          Domion: '',
        });

        alert('Successfully inserted.');

      } catch (error) {
        console.error('Error creating data:', error);
      }
    } else {
      console.log('Form submission failed due to validation errors.');
    }
  };

  const validateForm = (formData) => {
    let errors = {};

    // Example validation rules (you can adjust as per your requirements)
    if (!formData.url) {
      errors.url = 'URL is required';
    }
    if (!formData.source) {
      errors.source = 'Name is required';
    }

    return errors;
  };

  return (
    <div className="container">
      <br /><br />
      <center><h1>Insert Data</h1></center>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="url">URL</label>
          <input
            type="text"
            name="url"
            className={`form-control ${errors.url ? 'is-invalid' : ''}`}
            value={formData.url}
            onChange={handleChange}
            placeholder="Enter Url"
          />
          <div className="invalid-feedback">{errors.url}</div>
        </div>
        <div className="form-group">
          <label htmlFor="Name">Name</label>
          <input
            type="text"
            name="source"
            className={`form-control ${errors.source ? 'is-invalid' : ''}`}
            value={formData.source}
            onChange={handleChange}
            placeholder="Enter Name"
          />
          <div className="invalid-feedback">{errors.source}</div>
        </div>
        <div className="form-group">
          <label htmlFor="elementclass">Element Class</label>
          <input
            type="text"
            name="elementClass"
            className="form-control"
            value={formData.elementClass}
            onChange={handleChange}
            placeholder="Enter Element class"
          />
        </div>
        <div className="form-group">
          <label htmlFor="elementid">Element Id</label>
          <input
            type="text"
            name="elementId"
            className="form-control"
            value={formData.elementId}
            onChange={handleChange}
            placeholder="Enter Element Id"
          />
        </div>
        <div className="form-group">
          <label htmlFor="Domion">Domion</label>
          <input
            type="text"
            name="Domion"
            className="form-control"
            value={formData.Domion}
            onChange={handleChange}
            placeholder="Enter Domion"
          />
        </div>

        <br /><br />
        <div className="d-flex justify-content-between">
          <Link to="/NewsList" className="btn btn-success">Back</Link>
          <button type="submit" className="btn btn-primary">Save</button>
        </div>
      </form>
    </div>
  );
}
