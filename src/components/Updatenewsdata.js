import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const UpdateNewsData = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [data, setData] = useState({
    id: '',
    tital: '',
    date: new Date(),
    imageurl: '',
    description: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const response = await fetch(`https://localhost:7299/api/NewDatas1/${id}`);
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const result = await response.json();
          setData({
            id: result.id,
            tital: result.tital,
            date: new Date(result.date),
            imageurl: result.imageurl,
            description: result.description
          });
        } catch (error) {
          console.error('Error fetching data:', error);
          setError('Error fetching data. Please try again later.');
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [id]);
  const localUrl1 = process.env.REACT_APP_LOCAL_URL;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleDateChange = (date) => {
    setData(prevData => ({ ...prevData, date }));
  };

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setData(prevData => ({ ...prevData, description: data }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${localUrl1}/api/updatenewdata/${encodeURIComponent(data.id)}?tital=${encodeURIComponent(data.tital)}&date=${encodeURIComponent(data.date)}&imageurl=${encodeURIComponent(data.imageurl)}&description=${encodeURIComponent(data.description)}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      navigate('/NewsData');
    } catch (error) {
      console.error('Error updating data:', error);
      setError('Error updating data. Please try again later.');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Update News Data</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="id">ID</label>
          <input
            type="text"
            id="id"
            name="id"
            value={data.id}
            onChange={handleChange}
            placeholder="Enter ID"
            className="form-control"
            readOnly
          />
        </div>
        <div className="form-group mt-3">
          <label htmlFor="tital">Title</label>
          <input
            type="text"
            id="tital"
            name="tital"
            value={data.tital}
            onChange={handleChange}
            placeholder="Enter title"
            className="form-control"
          />
        </div>
        <div className="form-group mt-3">
          <label htmlFor="date">Date</label>
          
        </div>
        <div >
        <DatePicker
            selected={data.date}
            onChange={handleDateChange}
            dateFormat="yyyy/MM/dd"
            placeholderText="Select date"
            className="form-control"
          />
        </div>
        <div className="form-group mt-3">
          <label htmlFor="imageurl">Image URL</label>
          <input
            type="text"
            id="imageurl"
            name="imageurl"
            value={data.imageurl}
            onChange={handleChange}
            placeholder="Enter image URL"
            className="form-control"
          />
        </div>
        <div className="form-group mt-3">
          <label htmlFor="description">Description</label>
          <CKEditor
            editor={ClassicEditor}
            data={data.description}
            onChange={handleEditorChange}
            config={{ placeholder: 'Enter description...' }}
          />
        </div>
        <div className="d-flex justify-content-between mt-4">
          <Link to="/NewsData" className="btn btn-secondary">Back</Link>
          <button type="submit" className="btn btn-primary">Save</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateNewsData;
