import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure this import is presen
export default function NewsDetails() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://localhost:7299/api/NewDatas');
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

  const handleDeleteClick = async (id) => {
    try {
      const response = await fetch(`https://localhost:7299/api/Deletenews/${id}`, {
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

  return (
    <div className="container-fluid">
      <center><h1>Admin Panel</h1></center>
      <br />
      <hr /><hr />
      <br /><br />
      <center>
        <Link to="/InserNewsdata1">
          <button type="button" className="btn btn-primary">Insert New Data</button>
        </Link>
      </center>
      <hr />
      <div className="table-responsive">
        {loading && <p>Loading...</p>}
        {error && <p className="text-danger">{error}</p>}
        <table className="table table-bordered table-striped">
          <thead className="thead-dark">
            <tr className="table-danger">
              <th>Id</th>
              <th>Title</th>
              <th>News Date</th>
              <th>Image URL</th>
              <th>Update</th>
              
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {data.map(item => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.tital}</td> {/* Ensure correct field names */}
                <td>{new Date(item.date).toLocaleDateString()}</td> {/* Format the date */}
                <td>{item.imageurl}</td>
                <td>
                  <button type="button" className="btn btn-success" onClick={() => navigate(`/UpdateNewsData/${item.id}`)}>Update</button>
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
}
