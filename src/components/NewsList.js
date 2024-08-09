import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';  // Ensure Bootstrap CSS is imported

const NewsList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://coreapi.sntservices.in/api/NewList`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const json = await response.json();
      setData(json);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error fetching data. Please try again later.');
      setLoading(false);
    }
  };

  const handleUpdateClick = (item) => {
    navigate(`/Updatedata/${item.id}`, { state: { selectedItem: item } });
  };

  const handleDeleteClick = async (id) => {
    try {
      const response = await fetch(`https://localhost:7299/api/Delete/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      alert('Delete successful');
      fetchData();
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  if (loading) {
    return <div className="text-center mt-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-danger mt-4">Error: {error}</div>;
  }

  return (
    <div className="container-fluid">
      <div className="text-center mt-4">
        <br></br><br></br>
        <h1>News List</h1>
        <Link to="/insertdata">
          <button type="button" className="btn btn-primary mt-3">Insert New Data</button>
        </Link>
      </div>
      <hr />
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="thead-dark">
            <tr className="table-danger">
              <th>Id</th>
              <th>URL</th>
              <th>Source</th>
              <th>Element ID</th>
              <th>Element Class</th>
              <th>Domain</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {data.map(item => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.url}</td>
                <td>{item.source}</td>
                <td>{item.elementId}</td>
                <td>{item.elementClass}</td>
                <td>{item.domion}</td>
                <td>
                  <button type="button" className="btn btn-success" onClick={() => handleUpdateClick(item)}>Update</button>
                </td>
                <td>
                  <button type="button" className="btn btn-danger" onClick={() => handleDeleteClick(item.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NewsList;
