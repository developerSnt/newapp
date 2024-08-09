// import React from 'react';
// import { Navigate } from 'react-router-dom';
// import {jwtDecode} from 'jwt-decode';

// const ProtectedRoute1 = ({ element: Component, ...rest }) => {
//   const token = sessionStorage.getItem('token');
//   const userRole = sessionStorage.getItem('role');
//   // const isLoggedIn = token && userRole;
//   const isLoggedIn = sessionStorage.getItem('firstname') !== null;

//   // Function to check token expiration
//   const isTokenExpired = () => {
//     if (token) {
//       try {
//         const decodedToken = jwtDecode(token);
//         const currentTime = Date.now() / 1000; // Current time in seconds
//         return decodedToken.exp < currentTime;
//       } catch (error) {
//         console.error('Error decoding token:', error);
//         return true;
//       }
//     }
//     return true;
//   };

//   if (isTokenExpired()) {
//     sessionStorage.clear();
//     return <Navigate to='/login' />;
//   }

//   return isLoggedIn ? <Component /> : <Navigate to='/login' />;
// };

// export default ProtectedRoute1;
