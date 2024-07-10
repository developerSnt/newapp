import React, { useState, useEffect } from 'react';

export default function About() {
    const [values, setValues] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://localhost:7299/api/data');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setValues(data);
            } catch (error) {
                setError('Error fetching data: ' + error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <br></br><br></br>
            <h1>Hello, this is the About Us page</h1>
            <div>
                <h2>Values from API:</h2>
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
                            {values.map((value, index) => (
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
            </div>
        </div>
    );
}
