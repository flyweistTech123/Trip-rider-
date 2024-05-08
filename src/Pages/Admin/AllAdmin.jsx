import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import './AdminProfile.css'
import { Link } from 'react-router-dom';
import HOC from '../../Components/HOC/HOC'

import { IoSearch } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { BaseUrl, getAuthHeaders } from '../../Components/BaseUrl/BaseUrl';




import img2 from '../../Images/user.webp'


const AllAdmin = () => {
    const [adminData, setAdminData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAdminData();
    }, []);

    const fetchAdminData = () => {
        axios.get(`${BaseUrl}api/v1/admin/getAllAdmin`, getAuthHeaders())
            .then(response => {
                setAdminData(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching Admin data:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    };



    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredAdminData = adminData.filter(admin =>
        admin.name && admin.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <div className='rider'>
                <div className='rider1'>
                    <div className='rider2'>
                        <div className='rider3'>
                            <h6>All Admin</h6>
                        </div>

                        <div className='rider4'>
                            {/* <button>Add Admin</button> */}
                            <div className='rider5'>
                                <div className='rider6'>
                                    <IoSearch />
                                </div>
                                <input type="search" name="" id="" placeholder='Search admin' value={searchQuery}
                                    onChange={handleSearch} />
                            </div>
                        </div>
                    </div>
                    <div className='rider7'>
                        <table>
                            <thead>
                                <tr>
                                    <th>SR.No.</th>
                                    <th>Profile Image</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone No.</th>
                                    <th>Role</th>
                                    <th>Status</th>
                                    <th>Permissions</th>
                                    <th>Action Buttons</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan="9" style={{ color: "#C3052C", fontWeight: "600", fontSize: "18px" }}>Loading admins...</td>
                                    </tr>
                                ) :
                                    searchQuery && filteredAdminData.length === 0 ? (
                                        <tr>
                                            <td colSpan="9" style={{ color: "#C3052C", fontWeight: "600", fontSize: "18px" }}>Admin not found</td>
                                        </tr>
                                    ) : (
                                        searchQuery
                                            ?
                                            filteredAdminData.map((admin, index) => (
                                                <tr key={admin.id}>
                                                    <td>{index + 1}</td>
                                                    <td>
                                                        <img src={admin?.profilePicture || img2} alt="No image" style={{ width: '60px', height: "60px", borderRadius: "100%" }} />
                                                    </td>
                                                    <td>{admin.name}</td>
                                                    <td>{admin.email}</td>
                                                    <td>{admin.mobileNumber}</td>
                                                    <td>{admin.role}</td>
                                                    <td>{admin.status}</td>
                                                    <td>
                                                        <ul>
                                                            {admin.permissions.map((permission, permIndex) => (
                                                                <li key={permIndex}>{permission}</li>
                                                            ))}
                                                        </ul>
                                                    </td>
                                                    <td>
                                                        <div className='service11'>
                                                            <div className='rider10'>
                                                                <Link to={`/adminprofile`} className='sidebar-link' >
                                                                    <MdEdit color='#667085' size={20} />
                                                                    <p>Edit</p>
                                                                </Link>
                                                            </div>
                                                        </div>

                                                    </td>
                                                </tr>
                                            ))
                                            :
                                            adminData.map((admin, index) => (
                                                <tr key={admin._id}>
                                                    <td>{index + 1}</td>
                                                    <td>
                                                        <img
                                                            src={admin?.profilePicture || img2}
                                                            alt="No image"
                                                            style={{ width: '60px', height: '60px', borderRadius: '100%' }}
                                                        />
                                                    </td>
                                                    <td>{admin.name}</td>
                                                    <td>{admin.email}</td>
                                                    <td>{admin.mobileNumber}</td>
                                                    <td>{admin.role}</td>
                                                    <td>{admin.status}</td>
                                                    <td>
                                                        <ul>
                                                            {admin.permissions.map((permission, permIndex) => (
                                                                <li key={permIndex}>{permission}</li>
                                                            ))}
                                                        </ul>
                                                    </td>
                                                    <td>
                                                        <div className='service11'>
                                                            <div className='rider10'>
                                                                <Link to={`/admindetails/${admin._id}`} className='sidebar-link'>
                                                                    <MdEdit color='#667085' size={20} />
                                                                    <p>Edit</p>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                            
                                    )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HOC(AllAdmin)