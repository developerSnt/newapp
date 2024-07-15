import React, { useState, useEffect } from 'react';
import 'primereact/resources/themes/lara-light-cyan/theme.css';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Paginator } from 'primereact/paginator';
import { useNavigate } from 'react-router-dom';
 
const About = () => {
    const [currentData, setCurrentData] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [first, setFirst] = useState(0);
const usenavigate = useNavigate();
useEffect(() => {
    let firstname=sessionStorage.getItem('firstname');
    if(firstname==='' || firstname ===null){
        usenavigate('/login');
    }
},[])
    const fetchData = async (page, size) => {
        try {
            setLoading(true);
            const response = await fetch(`https://localhost:7299/api/data?page=${page}&pageSize=${size}`);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const responseData = await response.json();
            const { data, totalData } = responseData;
            setCurrentData(data);
            // setTotalPages(Math.ceil(totalData / size));
            setTotalPages(totalData);
            setError(null);
        } catch (error) {
            setError('Error fetching data: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(1, pageSize); 
    }, []); 

    const onPageChange = (event) => {
        const { first, rows } = event;
        const nextPage = first / rows + 1;
        fetchData(nextPage, rows); 
        setFirst(first); 
        setPageSize(rows); 
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }
    return (
    <div>
        <br></br> <br></br><br></br><br></br><br></br><br></br>
            <center><h1>Registration Data</h1></center><br></br><br></br>
            <div className="card">
                <DataTable
                    value={currentData}
                    tableStyle={{ minWidth: '50rem' }}
                >
                    <Column field="firstName" header="First Name" style={{ width: '15%' }} />
                    <Column field="lastName" header="Last Name" style={{ width: '15%' }} />
                    <Column field="email" header="Email" style={{ width: '20%' }} />
                    <Column field="gender" header="Gender" style={{ width: '10%' }} />
                    <Column field="age" header="Age" style={{ width: '10%' }} />
                    <Column field="certificate" header="Certificate" style={{ width: '15%' }} />
                    <Column field="password" header="Password" style={{ width: '15%' }} />
                    <Column field="comformpassword" header="Confirm Password" style={{ width: '25%' }} />
                </DataTable>
                <br></br><br></br>
                <Paginator
                    first={first}
                    rows={pageSize}
                    totalRecords={totalPages} 
                    onPageChange={onPageChange}
                    rowsPerPageOptions={[5, 10, 15, 50]}
                />
            </div>
            
        </div>
    );
};
export default About;