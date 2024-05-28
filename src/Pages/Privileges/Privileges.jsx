import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import './Privileges.css'
import { Link } from 'react-router-dom';
import HOC from '../../Components/HOC/HOC'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { IoSearch } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { BaseUrl, getAuthHeaders } from '../../Components/BaseUrl/BaseUrl';
import { RiDeleteBinLine } from "react-icons/ri";
import { MdOutlineBlock } from "react-icons/md";
import { IoEyeOutline } from "react-icons/io5";



import img2 from '../../Images/user.webp'


const Privileges = () => {
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

    const deleteAdmin = (adminId) => {
        axios.delete(`${BaseUrl}api/v1/admin/delete/driver/${adminId}`, {
            headers: getAuthHeaders()  
        })
            .then(response => {
                fetchAdminData();  
                toast.success("Admin deleted successfully");
            })
            .catch(error => {
                console.error('Error deleting Admin:', error);
                toast.error("Error deleting Admin");
            });
    };
    const blockAdmin = (adminId) => {
        axios.put(`${BaseUrl}api/v1/admin/block/driver/${adminId}`, getAuthHeaders())
            .then(response => {
                toast.success('Admin is blocked successfully');
                setAdminData(prevAdminData => {
                    return prevAdminData.map(admin => {
                        if (admin._id === adminId) {
                            return { ...admin, isBlock: true };
                        }
                        return admin;
                    });
                });
            })
            .catch(error => {
                console.error('Error blocking Admin:', error);
                toast.error("Error blocking Admin");
            });
    };
    const unblockAdmin = (adminId) => {
        axios.put(`${BaseUrl}api/v1/admin/unblock/driver/${adminId}`, getAuthHeaders())
            .then(response => {
                // console.log('Driver is unblocked successfully');
                toast.success('Admin is unblocked successfully');
                setAdminData(prevAdminData => {
                    return prevAdminData.map(admin => {
                        if (admin._id === adminId) {
                            return { ...admin, isBlock: false };
                        }
                        return admin;
                    });
                });
            })
            .catch(error => {
                console.error('Error unblocking Admin:', error);
                toast.error("Error unblocking Admin");
            });
    };

    return (
        <>
            <div className='rider'>
                <div className='rider1'>
                    <div className='rider2'>
                        <div className='rider3'>
                            <h6>All Admins</h6>
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
                                                    <td style={{
                                                        color:
                                                            admin?.status === 'reject' ? '#F52D56' :
                                                                admin?.status === 'pending' ? '#FBAC2C' :
                                                                    admin?.status === 'hold' ? '#357ABD' :
                                                                        admin?.status === 'approved' ? '#609527' :
                                                                            '#000'
                                                    }}>
                                                        {admin?.status}
                                                    </td>
                                                    <td>
                                                        <ul>
                                                            {admin.permissions.map((permission, permIndex) => (
                                                                <li key={permIndex}>{permission.name}</li>
                                                            ))}
                                                        </ul>
                                                    </td>
                                                    <td>
                                                        <div className='rider9'>
                                                            <div className='rider10' onClick={() => deleteAdmin(admin._id)}>
                                                                <RiDeleteBinLine color='#667085' size={20} />
                                                                <p>Delete</p>
                                                            </div>
                                                            <div className='rider10' onClick={() => { admin.isBlock ? unblockAdmin(admin._id) : blockAdmin(admin._id) }}>
                                                                <MdOutlineBlock color={admin.isBlock ? "red" : "#667085"} size={20} />
                                                                <p style={{ color: admin.isBlock ? 'red' : '#667085' }}>Block/Unblock</p>
                                                            </div>
                                                            <div className='rider10'>
                                                                <Link to={`/admindetails/${admin._id}`} className='sidebar-link' >
                                                                    <IoEyeOutline color='#667085' size={20} />
                                                                    <p>View/Edit</p>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                            : adminData.length === 0 ? ( // Check if filtered data is empty
                                                <tr>
                                                    <td colSpan="10" style={{ color: "#C3052C", fontWeight: "600", fontSize: "18px" }}>No Admin Data found.</td>
                                                </tr>
                                            ) :
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
                                                        <td style={{
                                                            color:
                                                                admin?.status === 'reject' ? '#F52D56' :
                                                                    admin?.status === 'pending' ? '#FBAC2C' :
                                                                        admin?.status === 'hold' ? '#357ABD' :
                                                                            admin?.status === 'approved' ? '#609527' :
                                                                                '#000'
                                                        }}>
                                                            {admin?.status}
                                                        </td>
                                                        <td>
                                                            <ul>
                                                                {admin.permissions.map((permission, permIndex) => (
                                                                    <li key={permIndex}>{permission.name}</li>
                                                                ))}
                                                            </ul>
                                                        </td>
                                                        <td>
                                                            <div className='rider9'>
                                                                <div className='rider10' onClick={() => deleteAdmin(admin._id)}>
                                                                    <RiDeleteBinLine color='#667085' size={20} />
                                                                    <p>Delete</p>
                                                                </div>
                                                                <div className='rider10' onClick={() => { admin.isBlock ? unblockAdmin(admin._id) : blockAdmin(admin._id) }}>
                                                                    <MdOutlineBlock color={admin.isBlock ? "red" : "#667085"} size={20} />
                                                                    <p style={{ color: admin.isBlock ? 'red' : '#667085' }}>Block/Unblock</p>
                                                                </div>
                                                                <div className='rider10'>
                                                                    <Link to={`/admindetails/${admin._id}`} className='sidebar-link' >
                                                                        <IoEyeOutline color='#667085' size={20} />
                                                                        <p>View/Edit</p>
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

export default HOC(Privileges)