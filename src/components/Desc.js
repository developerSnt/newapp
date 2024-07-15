
import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
export default function Desc() {
  const usenavigate = useNavigate();
useEffect(() => {
    let firstname=sessionStorage.getItem('firstname');
    if(firstname==='' || firstname ===null){
        usenavigate('/login');
    }
  
},[])
  return (
    <div>
      <br></br><br></br><br></br><br></br><br></br><br></br>
      <h1>coming soon ...</h1>
    </div>
  )
}
