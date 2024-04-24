import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const AdminRouteProtect = ({ children }) => {
    const navigate = useNavigate();
    const role = localStorage.getItem('role');
    const boss=localStorage.getItem('token')

    // Check if user is logged in and is an admin
    if (!boss) {
        console.log('clicked')
        // Redirect to login page if not logged in or not admin
        
        return navigate('/login');
    }

    // Render children if user is logged in and is an admin
    return <>{children}</>;
};

export default AdminRouteProtect;
