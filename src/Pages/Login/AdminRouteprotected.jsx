import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const AdminRouteProtect = ({ children }) => {
    const navigate = useNavigate();
    const isAdmin = localStorage.getItem('isAdmin');

    // Check if user is logged in and is an admin
    if (!isAdmin) {
        // Redirect to login page if not logged in or not admin
        navigate('/login');
        return null;
    }

    // Render children if user is logged in and is an admin
    return <>{children}</>;
};

export default AdminRouteProtect;
