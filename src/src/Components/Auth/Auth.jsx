import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // Define routes based on user roles
    const routes = {
        superAdmin: [
            '/dashboard',
            '/users',
            '/drivers',
            '/earnings',
            '/vendors',
            // Add more routes accessible to superAdmin
        ],
        admin: [
            '/dashboard',
            '/users',
            '/drivers',
            '/vendors',
            '/services',
            '/allbookings',
            '/termsandconditions',
            '/privacypolicy',
            // Add more routes accessible to admin
        ],
    };
    const [userRole, setUserRole] = useState('admin'); // Set default role as admin

    const login = (role) => {
        setUserRole(role);
        // You may implement actual login logic here (e.g., API request to authenticate user)
    };

    const logout = () => {
        setUserRole(null);
        // Implement logout logic here if needed
    };

    return (
        <AuthContext.Provider value={{ userRole, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
