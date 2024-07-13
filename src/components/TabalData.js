
import React, { useState, useEffect } from 'react';
export default function TabalData() {
    const [values, setValues] = useState([]);
    const [currentData, setCurrentData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageSize, setPageSize] = useState(5); // Default page size

    useEffect(() => {
        fetchData(currentPage, pageSize);
    }, [currentPage, pageSize]); // Dependency on currentPage and pageSize

    const fetchData = async (page, pageSize) => {
        try {
            const response = await fetch(`https://localhost:7299/api/data?page=${page}&pageSize=${pageSize}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setValues(data);
            const totalCount = response.headers.get('X-Total-Count'); // Example: API should return total count in header
            setTotalPages(Math.ceil(totalCount / pageSize));
            const startIndex = (page - 1) * pageSize;
            const endIndex = startIndex + pageSize;
            setCurrentData(data.slice(startIndex, endIndex));
        } catch (error) {
            setError('Error fetching data: ' + error.message);
        } finally {
            setLoading(false);
        }

    };
    const handlePageSizeChange = (event) => {
        const newSize = parseInt(event.target.value, 10);
        setPageSize(newSize);
        setCurrentPage(1); 
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

  return (
    <div>
      <br></br><br></br><br></br><br></br><br></br><br></br><br></br>
      <h1>This is Data Tabal</h1>
      <center><h1>Registration Data</h1></center>
            <div>
                <div style={{ overflowX: 'auto' }}>
                    <table className="table" border={2}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Gender</th>
                                <th>Age</th>
                                <th>Certificate</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentData.map((value, index) => (
                                <tr key={index}>
                                    <td>{value.id}</td>
                                    <td>{value.firstName} {value.lastName}</td>
                                    <td>{value.email}</td>
                                    <td>{value.gender}</td>
                                    <td>{value.age}</td>
                                    <td>{value.certificate}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <br />
                <div>
                    {/* <button onClick={prevPage} disabled={currentPage === 1}>Previous</button>
                    <button onClick={nextPage} disabled={currentPage === totalPages}>Next</button> */}
                    <span> Page {currentPage} of {totalPages} </span>
                    <span> | Page Size: </span>
                    <select value={pageSize} onChange={handlePageSizeChange}>
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={15}>15</option>
                    </select>
                </div>
            </div>
    </div>
  )
}
