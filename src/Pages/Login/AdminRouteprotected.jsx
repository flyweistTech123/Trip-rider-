import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const AdminRouteProtect = ({ children }) => {
    const navigate = useNavigate();
    const role = localStorage.getItem('role');
    const boss=localStorage.getItem('token')

    if (!boss) {
        
        return navigate('/');
    }

    // Render children if user is logged in and is an admin
    return <>{children}</>;
};

export default AdminRouteProtect;
