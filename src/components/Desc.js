import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

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
        const response = await fetch(`https://localhost:7299/api/Detailsview?url=${encodeURIComponent(paramUrl)}&name=${encodeURIComponent(paramName)}`);
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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <br /><br />
      <center><h1>{tital}</h1></center><br></br>
      <br></br>
      <center><h2>{new Date(Date1).toGMTString()}</h2></center><br></br><br></br>
      <center><img
        src={img}
        alt="Article"
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
