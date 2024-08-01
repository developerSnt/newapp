import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';

const Update = () => {
  const location = useLocation();
  const [selectedItem, setSelectedItem] = useState(location.state.selectedItem || {
    id: '',
    url: '',
    source: '',
    elementClass: '',
    elementId: '',
    domion: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedItem({
      ...selectedItem,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    const newErrors = {};
   
    if (Object.keys(newErrors).length === 0) {
      try {
              const response = await fetch(`https://localhost:7299/api/update/${encodeURIComponent(selectedItem.id)}?name=${encodeURIComponent(selectedItem.source)}&elementclass=${encodeURIComponent(selectedItem.elementClass)}&elementid=${encodeURIComponent(selectedItem.elementId)}&domion=${encodeURIComponent(selectedItem.domion)}&url=${encodeURIComponent(selectedItem.url)}`, {
          method: 'PUT', 
          headers: {
            'Content-Type': 'application/json',
           
          },
          body: JSON.stringify(selectedItem),
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Update successful:', data);
          
        } else {
          throw new Error('Failed to update item');
        }
      } catch (error) {
        console.error('Error updating data:', error);
        
      }
    } else {
      console.log('Form submission failed due to validation errors.');
    }
  };

  return (
    <div className="container">
      <h2>Update Item</h2>
      <form onSubmit={handleSubmit}>
        <div className="card">
          <div className="card-header"><center>Item Details</center></div>
          <div className="card-body">
            <div className="form-group">
              <label htmlFor="id">ID</label>
              <input type="text" id="id" className="form-control" value={selectedItem.id} readOnly />
            </div>
            <div className="form-group">
              <label htmlFor="url">URL</label>
              <input type="text" id="url" className="form-control" name="url" value={selectedItem.url} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="source">Source</label>
              <input type="text" id="source" className="form-control" name="source" value={selectedItem.source} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="elementId">Element ID</label>
              <input type="text" id="elementId" className="form-control" name="elementId" value={selectedItem.elementId} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="elementClass">Element Class</label>
              <input type="text" id="elementClass" className="form-control" name="elementClass" value={selectedItem.elementClass} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="domain">Domain</label>
              {/* <input type="text" id="domain" className="form-control" name="domain" value={selectedItem.domion} onChange={handleChange} /> */}
             
              <input type="text" id="domion" className="form-control" name="domion" value={selectedItem.domion} onChange={handleChange} />
            </div>
            <br></br>
            <div className="d-flex justify-content-between">
              <Link to="/NewsList" className="btn btn-success">Back</Link>
              <button type="submit" className="btn btn-primary">Save</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Update;
