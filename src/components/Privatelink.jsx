import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthoContext';
function Privatelink({children}) {
    const {user}=useAuth();
  return (
user?children:<Navigate to={'/login'} />
  );
}

export default Privatelink;
