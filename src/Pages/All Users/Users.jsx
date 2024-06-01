import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Users.css'
import HOC from '../../Components/HOC/HOC'
import { Link } from 'react-router-dom';
import Pagination from 'react-bootstrap/Pagination';

import { IoSearch } from "react-icons/io5";
import { RiDeleteBinLine } from "react-icons/ri";
import { MdOutlineBlock } from "react-icons/md";
import { IoEyeOutline } from "react-icons/io5";
import { BaseUrl, getAuthHeaders } from '../../Components/BaseUrl/BaseUrl';




import img2 from '../../Images/user.webp'


const Users = () => {

    const [riderData, setRiderData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [search, setSearch] = useState("");
    const [totalPages, setTotalPages] = useState(0);


    const cachedAdminData = localStorage.getItem('adminData');
    const adminData = JSON.parse(cachedAdminData);
    const role = localStorage.getItem('role');

    let permissionsArray = [];

    if (adminData && adminData.permissions) {
        permissionsArray = adminData.permissions;
    } else {
        console.log('Permissions array not found in adminData.');
    }


    useEffect(() => {
        fetchRiderData();
    }, [limit, search, page]);

    const fetchRiderData = useCallback(() => {
        axios.get(`${BaseUrl}api/v1/admin/all/user?page=${page}&limit=${limit}&search=${search}`, getAuthHeaders())
            .then(response => {
                setRiderData(response.data.data.docs);
                setTotalPages(response.data.data.totalPages);
            })
            .catch(error => {
                console.error('Error fetching rider data:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [page, limit, search]);

    const handlePageChange = (pageNumber) => {
        setPage(pageNumber);
    }


    const handleSearch = (event) => {
        setPage(1);
        setSearch(event.target.value);
    };

    const deleteRider = (riderId) => {
        axios.delete(`${BaseUrl}api/v1/admin/delete/driver/${riderId}`, getAuthHeaders())
            .then(response => {
                toast.success("User deleted successfully");
                fetchRiderData();
            })
            .catch(error => {
                console.error('Error to deleting User:', error);
                toast.error("Failed to delete user. Please try again later.");
            });
    };

    const blockRider = (riderId) => {
        axios.put(`${BaseUrl}api/v1/admin/block/driver/${riderId}`, getAuthHeaders())
            .then(response => {
                toast.success("User is blocked successfully");
                fetchRiderData(prevRiderData => {
                    return prevRiderData.map(rider => {
                        if (rider._id === riderId) {
                            return { ...rider, isBlock: true };
                        }
                        return rider;
                    });
                });
            })
            .catch(error => {
                // console.error('Error blocking rider:', error);
                toast.error("Failed to block user. Please try again later.");
            });
    };
    const unblockRider = (riderId) => {
        axios.put(`${BaseUrl}api/v1/admin/unblock/driver/${riderId}`, getAuthHeaders())
            .then(response => {
                // console.log('Rider is unblocked successfully');
                toast.success("User is unblocked successfully'");
                fetchRiderData(prevRiderData => {
                    return prevRiderData.map(rider => {
                        if (rider._id === riderId) {
                            return { ...rider, isBlock: false };
                        }
                        return rider;
                    });
                });
            })
            .catch(error => {
                console.error('Error unblocking User:', error);
                toast.error("Failed to unblock user. Please try again later.");
            });
    };





    return (
        <>
            <div className='rider'>
                <div className='rider1'>
                    <div className='rider2'>
                        <div className='rider3'>
                            <h6>All Users</h6>
                        </div>

                        <div className='rider4'>
                            <div className='rider5'>
                                <div className='rider6'>
                                    <IoSearch />
                                </div>
                                <input type="search" name="" id="" placeholder='Search User'
                                    onChange={handleSearch} />
                            </div>
                        </div>
                    </div>
                    <div className='rider7'>
                        <table>
                            <thead>
                                <tr>
                                    <th>Profile Image</th>
                                    <th>User Name</th>
                                    <th>Email</th>
                                    <th>Phone No.</th>
                                    <th>Wallet Balance</th>
                                    <th>Total Trips</th>
                                    <th>Action Buttons</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan="7" style={{ color: "#C3052C", fontWeight: "600", fontSize: "18px" }}>Loading users...</td>
                                    </tr>
                                ) : riderData.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" style={{ color: "#C3052C", fontWeight: "600", fontSize: "18px" }}>User not found</td>
                                    </tr>
                                ) : (
                                    riderData?.map(rider => (
                                        <tr key={rider.id}>
                                            <td>
                                                <img src={rider?.profilePicture || img2} alt="No image" style={{ width: '60px', height: "60px", borderRadius: "100%" }} />
                                            </td>
                                            <td>{rider?.name}</td>
                                            <td>{rider.email}</td>
                                            <td>{rider.mobileNumber}</td>
                                            <td style={{ color: '#F52D56' }}>{rider.wallet}</td>
                                            <td>{rider.totalBooking}</td>
                                            <td>
                                                <div className='rider9'>
                                                    {role === 'superAdmin' ? (
                                                        <>
                                                            <div className='rider10' onClick={() => deleteRider(rider._id)}>
                                                                <RiDeleteBinLine color='#667085' size={20} />
                                                                <p>Delete</p>
                                                            </div>
                                                            <div className='rider10' onClick={() => { rider.isBlock ? unblockRider(rider._id) : blockRider(rider._id) }}>
                                                                <MdOutlineBlock color={rider.isBlock ? "red" : "#667085"} size={20} />
                                                                <p style={{ color: rider.isBlock ? 'red' : '#667085' }}>Block/Unblock</p>
                                                            </div>
                                                            <div className='rider10'>
                                                                <Link to={`/user_details/${rider._id}`} className='sidebar-link' >
                                                                    <IoEyeOutline color='#667085' size={20} />
                                                                    <p>View</p>
                                                                </Link>
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <>
                                                            {permissionsArray.some(permission => permission.name === 'All Users' && permission.delete) && (
                                                                <div className='rider10' onClick={() => deleteRider(rider._id)}>
                                                                    <RiDeleteBinLine color='#667085' size={20} />
                                                                    <p>Delete</p>
                                                                </div>
                                                            )}
                                                            {permissionsArray.some(permission => permission.name === 'All Users' && permission.block) && (
                                                                <div className='rider10' onClick={() => { rider.isBlock ? unblockRider(rider._id) : blockRider(rider._id) }}>
                                                                    <MdOutlineBlock color={rider.isBlock ? "red" : "#667085"} size={20} />
                                                                    <p style={{ color: rider.isBlock ? 'red' : '#667085' }}>Block/Unblock</p>
                                                                </div>
                                                            )}
                                                            {permissionsArray.some(permission => permission.name === 'All Users' && permission.view) && (
                                                                <div className='rider10'>
                                                                    <Link to={`/user_details/${rider._id}`} className='sidebar-link' >
                                                                        <IoEyeOutline color='#667085' size={20} />
                                                                        <p>View</p>
                                                                    </Link>
                                                                </div>
                                                            )}
                                                        </>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))

                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className='rider_details555'>
                    <Pagination >
                        <Pagination.First onClick={() => handlePageChange(1)} />
                        <Pagination.Prev onClick={() => handlePageChange(page - 1)} />
                        {[...Array(totalPages).keys()].map(number => (
                            <Pagination.Item key={number + 1} active={number + 1 === page} onClick={() => handlePageChange(number + 1)}>
                                {number + 1}
                            </Pagination.Item>
                        ))}
                        <Pagination.Next onClick={() => handlePageChange(page + 1)} />
                        <Pagination.Last onClick={() => handlePageChange(totalPages)} />
                    </Pagination>
                </div>
            </div>
        </>
    )
}

export default HOC(Users)