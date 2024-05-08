import React, { useEffect, useState } from "react";
import './HOC.css'
import axios from 'axios';

import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import { BaseUrl, getAuthHeaders } from '../../Components/BaseUrl/BaseUrl';


const HOC = (WrappedComponent) => {
    const Component = () => {
        const [show, setShow] = useState(true);
        const toggleSidebar = () => {
            setShow(!show);
        };

        const [adminData, setAdminData] = useState(null);

        useEffect(() => {
            const fetchAdminData = async () => {
                try {
                    const response = await axios.get(`${BaseUrl}api/v1/admin/me`, getAuthHeaders());
                    const data = response.data.data;
                    setAdminData(data);
                    // Save adminData to localStorage
                    localStorage.setItem('adminData', JSON.stringify(data));
                    console.log("Fetched admin data:", data);
                } catch (error) {
                    console.error('Error fetching admin data:', error);
                    // Handle error (e.g., display error message)
                }
            };

            // Check if adminData is already cached in localStorage on component mount
            const cachedAdminData = localStorage.getItem('adminData');
            if (cachedAdminData) {
                setAdminData(JSON.parse(cachedAdminData));
            } else {
                // Fetch adminData from API if not found in localStorage
                fetchAdminData();
            }
        }, []); 

        const handleLogout = () => {
            setAdminData(null);
            localStorage.removeItem('adminData');
        };

        const clearToken = () => {
            localStorage.removeItem('token');
        };

        return (
            <div className={`container1 ${show ? '' : 'sidebar-hidden'}`}>
                {show && (
                    <div className="sidebar55">
                        <Sidebar toggleSidebar={toggleSidebar} admindata={adminData} />
                    </div>
                )}
                <div className="content">
                    <Navbar show={show} toggleSidebar={toggleSidebar} admindata={adminData}  onLogout={handleLogout}
                        clearToken={clearToken}/>
                    <div className="child-component">
                        <WrappedComponent />
                    </div>
                </div>
            </div>
        );
    };

    return Component;
};

export default HOC;
