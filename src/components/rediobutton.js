import React, { useState, useEffect } from 'react';
import PaginationComponent from './PaginationComponent';

const DataListComponent = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchData();
    }, [currentPage]);

    const fetchData = async () => {
        try {
            // Replace with your API endpoint
            const response = await fetch(`https://api.example.com/data?page=${currentPage}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            setData(result.data); // Assuming API returns { data: [], totalPages: }
            setTotalPages(result.totalPages); // Assuming API returns total pages count
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (page) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Data List</h1>
            <ul>
                {data.map(item => (
                    <li key={item.id}>
                        {item.name} - {item.description}
                    </li>
                ))}
            </ul>
            <PaginationComponent currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
    );
};

export default DataListComponent;
