import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import defaultImage from '../assets/img1.jpg'; 
const Desc = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [url, setUrl] = useState('');
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [tital, setTital] = useState('');
  const [Date1, setDate] = useState('');
  const [img, setImg] = useState('');
  const usenavigate = useNavigate();
  const localUrl1 = process.env.REACT_APP_LOCAL_URL;
  useEffect(() => {
    let firstname = sessionStorage.getItem('firstname');
    if (firstname === '' || firstname === null) {
      usenavigate('/login');
    }
  }, [usenavigate]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const paramUrl = searchParams.get('url');
    const paramName = searchParams.get('name');
    const paratitle = searchParams.get('tital');
    const parimage = searchParams.get('img');
    const pardate = searchParams.get('date1');

    if (!paramUrl || !paramName) {
      navigate('/');
      return;
    }

    setUrl(paramUrl);
    setName(paramName);
    setTital(paratitle);
    setImg(parimage);
    setDate(pardate);

    const fetchData = async () => {
      try {
        const response = await fetch(`${localUrl1}/api/Detailsview?url=${encodeURIComponent(paramUrl)}&name=${encodeURIComponent(paramName)}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.text();
        setContent(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();

  }, [location, navigate]);

  const handlePrint = async () => {
    try {
    
      const response = await fetch(`${localUrl1}/createpdf?title=${encodeURIComponent(tital)}&description=${encodeURIComponent(content)}&date=${encodeURIComponent(Date1)}&imageUrl=${encodeURIComponent(img)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: tital,
          description: content,
          newsDate: Date1,
          imageUrl: img,
        }),
      });

      if (response.ok) {
        console.log('PDF creation successful.');
        // Handle success: e.g., show a success message, redirect, etc.
      } else {
        console.error('Failed to create PDF:', response.statusText);
        // Handle failure: e.g., show an error message
      }
    } catch (error) {
      console.error('Error creating PDF:', error);
      // Handle network errors or other exceptions
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  const handleImageError = (e) => {
 
    e.target.src =   defaultImage; 
  };

  return (
    <div className="container">
      <br /><br />
      <hr></hr>
      <br></br>
      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
        <button className="bg-color" onClick={handlePrint}>Print</button>
      </div>
      <br></br>
      <hr></hr>
      <br></br><br></br>
      <center><h1>{tital}</h1></center><br></br>
      <br></br>
      <center><h2>{new Date(Date1).toGMTString()}</h2></center><br></br><br></br>
      <center><img
        src={img}
        alt="Article"
        onError={handleImageError } 
        className="img-fluid"
      /></center>
      <br></br>
      <div className='container-fluid'>
        <div className="justify-content-center">
          <p>{content}</p>
        </div>
      </div>
    </div>
  );
};

export default Desc;
