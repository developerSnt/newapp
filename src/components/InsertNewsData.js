import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import apiService from './apiService';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Import the styles for date picker

export default function InsertNewsData() {
    const [formData, setFormData] = useState({
        title: '', // Fixed typo from 'tital' to 'title'
        date: new Date(), // Initialize with current date or a default date
        imageurl: '',
        description: '',
        domain: '',
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleDateChange = (date) => {
        setFormData({
            ...formData,
            date,
        });
    };

    const handleEditorChange = (event, editor) => {
        const data = editor.getData();
        setFormData({
            ...formData,
            description: data,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validateForm(formData);
        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            try {
                const createdData = await apiService.createData2(formData);
                console.log('Created data:', createdData);

                setFormData({
                    title: '', // Fixed typo
                    date: new Date(),
                    imageurl: '',
                    description: '',
                    domain: '',
                });

                alert('Successfully inserted.');
            } catch (error) {
                console.error('Error creating data:', error);
                alert('Error creating data. Please try again.');
            }
        } else {
            console.log('Form submission failed due to validation errors.');
        }
    };

    const validateForm = (formData) => {
        let errors = {};
        if (!formData.title) { // Fixed typo
            errors.title = 'Title is required'; // Fixed typo
        }
        if (!formData.date) {
            errors.date = 'Date is required';
        }
        return errors;
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Insert News Data</h1>
            <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                <div className="form-group mb-3">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        name="title" // Fixed typo
                        id="title"
                        className={`form-control ${errors.title ? 'is-invalid' : ''}`} // Fixed typo
                        value={formData.title} // Fixed typo
                        onChange={handleChange}
                        placeholder="Enter title"
                    />
                    <div className="invalid-feedback">{errors.title}</div> {/* Fixed typo */}
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="date">Date</label>&nbsp;&nbsp; &nbsp;
                   
                    <div>
                    <DatePicker
                        selected={formData.date}
                        onChange={handleDateChange}
                        dateFormat="yyyy/MM/dd"
                        className={`form-control ${errors.date ? 'is-invalid' : ''}`}
                        placeholderText="Select date"
                    />
                    </div>
                    <div className="invalid-feedback">{errors.date}</div>
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="imageUrl">Image URL</label>
                    <input
                        type="text"
                        name="imageurl"
                        id="imageUrl"
                        className="form-control"
                        value={formData.imageurl}
                        onChange={handleChange}
                        placeholder="Enter image URL"
                    />
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="description">Description</label>
                    <CKEditor
                        editor={ClassicEditor}
                        data={formData.description}
                        onChange={handleEditorChange}
                        config={{
                            toolbar: [
                                'heading', '|',
                                'bold', 'italic', 'link', '|',
                                'numberedList', 'bulletedList', '|',
                                'blockQuote', 'insertTable', 'mediaEmbed', '|',
                                'undo', 'redo'
                            ]
                        }}
                    />
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="domain">Domain</label>
                    <input
                        type="text"
                        name="domain"
                        id="domain"
                        className="form-control"
                        value={formData.domain}
                        onChange={handleChange}
                        placeholder="Enter domain"
                    />
                </div>

                <div className="d-flex justify-content-between mt-4">
                    <Link to="/NewsData" className="btn btn-secondary">Back</Link>
                    <button type="submit" className="btn btn-primary">Save</button>
                </div>
            </form>
        </div>
    );
}
