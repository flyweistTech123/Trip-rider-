import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Drivers.css'
import { Link } from 'react-router-dom';
import HOC from '../../Components/HOC/HOC'
import Pagination from 'react-bootstrap/Pagination';



import { IoSearch } from "react-icons/io5";
import { RiDeleteBinLine } from "react-icons/ri";
import { MdOutlineBlock } from "react-icons/md";
import { IoEyeOutline } from "react-icons/io5";
import { BaseUrl, getAuthHeaders } from '../../Components/BaseUrl/BaseUrl';


import img2 from '../../Images/user.webp'



// import img from '../../Images/img5.png'


const Drivers = () => {

    const cachedAdminData = localStorage.getItem('adminData');
    const adminData = JSON.parse(cachedAdminData);
    const role = localStorage.getItem('role');

    let permissionsArray = [];

    if (adminData && adminData.permissions) {
        permissionsArray = adminData.permissions;
    } else {
        console.log('Permissions array not found in adminData.');
    }


    const [driverData, setDriverData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [search, setSearch] = useState("");
    const [totalPages, setTotalPages] = useState(0);




    useEffect(() => {
        fetchDriverData();
    }, [limit, search, page]);

    const fetchDriverData = useCallback(() => {
        axios.get(`${BaseUrl}api/v1/admin/all/driver?page=${page}&limit=${limit}&search=${search}`, getAuthHeaders())
            .then(response => {
                setDriverData(response.data.data.docs);
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

    const deleteDriver = (driverId) => {
        axios.delete(`${BaseUrl}api/v1/admin/delete/driver/${driverId}`, getAuthHeaders())
            .then(response => {
                fetchDriverData();
                toast.success("driver deleted successfully");
            })
            .catch(error => {
                console.error('Error deleting driver:', error);
                toast.error("Failed to delete driver. Please try again later.");
            });
    };

    const blockDriver = (driverId) => {
        axios.put(`${BaseUrl}api/v1/admin/block/driver/${driverId}`, getAuthHeaders())
            .then(response => {
                toast.success('Driver is blocked successfully');
                setDriverData(prevDriverData => {
                    return prevDriverData.map(driver => {
                        if (driver._id === driverId) {
                            return { ...driver, isBlock: true };
                        }
                        return driver;
                    });
                });
            })
            .catch(error => {
                console.error('Error blocking driver:', error);
                toast.error("Failed to block driver. Please try again later.");
            });
    };
    const unblockDriver = (driverId) => {
        axios.put(`${BaseUrl}api/v1/admin/unblock/driver/${driverId}`, getAuthHeaders())
            .then(response => {
                // console.log('Driver is unblocked successfully');
                toast.success('Driver is unblocked successfully');
                setDriverData(prevDriverData => {
                    return prevDriverData.map(driver => {
                        if (driver._id === driverId) {
                            return { ...driver, isBlock: false };
                        }
                        return driver;
                    });
                });
            })
            .catch(error => {
                console.error('Error unblocking driver:', error);
                toast.error("Failed to unblock driver. Please try again later.");
            });
    };



    return (
        <>
            <div className='rider'>
                <div className='rider1'>
                    <div className='rider2'>
                        <div className='rider3'>
                            <h6>All Drivers</h6>
                        </div>

                        <div className='rider4'>
                            <div className='rider5'>
                                <div className='rider6'>
                                    <IoSearch />
                                </div>
                                <input type="search" name="" id="" placeholder='Search Driver' onChange={handleSearch} />
                            </div>
                        </div>
                    </div>
                    <div className='rider7'>
                        <table>
                            <thead>
                                <tr>
                                    <th>Profile Image</th>
                                    <th>Driver Name</th>
                                    <th>Email</th>
                                    <th>Phone No.</th>
                                    <th>Total Trips</th>
                                    <th>Status</th>
                                    <th>(₹)Total Earnings</th>
                                    <th>Action Buttons</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan="7" style={{ color: "#C3052C", fontWeight: "600", fontSize: "18px" }}>Loading drivers...</td>
                                    </tr>
                                ) : driverData.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" style={{ color: "#C3052C", fontWeight: "600", fontSize: "18px" }}>Driver not found</td>
                                    </tr>
                                ) : (
                                    driverData?.map(driver => (
                                        <tr key={driver.id}>
                                            <td>
                                                <img src={driver?.profilePicture || img2} alt="No image" style={{ width: '60px', height: "60px", borderRadius: "100%" }} />
                                            </td>
                                            <td>{driver?.name}</td>
                                            <td>{driver?.email}</td>
                                            <td>{driver?.mobileNumber}</td>
                                            <td>{driver?.totalBooking}</td>
                                            <td style={{
                                                color:
                                                    driver?.status === 'reject' ? '#F52D56' :
                                                        driver?.status === 'pending' ? '#FBAC2C' :
                                                            driver?.status === 'hold' ? '#357ABD' :
                                                                driver?.status === 'approved' ? '#609527' :
                                                                    '#000'
                                            }}>
                                                {driver?.status}
                                            </td>
                                            <td>{driver?.wallet}</td>
                                            <td>
                                                <div className='rider9'>
                                                    {role === 'superAdmin' ? (
                                                        <>
                                                            <div className='rider10' onClick={() => deleteDriver(driver._id)}>
                                                                <RiDeleteBinLine color='#667085' size={20} />
                                                                <p>Delete</p>
                                                            </div>
                                                            <div className='rider10' onClick={() => { driver.isBlock ? unblockDriver(driver._id) : blockDriver(driver._id) }}>
                                                                <MdOutlineBlock color={driver.isBlock ? "red" : "#667085"} size={20} />
                                                                <p style={{ color: driver.isBlock ? 'red' : '#667085' }}>Block/Unblock</p>
                                                            </div>
                                                            <div className='rider10'>
                                                                <Link to={`/driver_details/${driver._id}`} className='sidebar-link' >
                                                                    <IoEyeOutline color='#667085' size={20} />
                                                                    <p>View</p>
                                                                </Link>
                                                            </div>

                                                        </>
                                                    ) : (
                                                        <>
                                                            {permissionsArray.some(permission => permission.name === 'All Drivers' && permission.delete) && (
                                                                <div className='rider10' onClick={() => deleteDriver(driver._id)}>
                                                                    <RiDeleteBinLine color='#667085' size={20} />
                                                                    <p>Delete</p>
                                                                </div>
                                                            )}
                                                            {permissionsArray.some(permission => permission.name === 'All Drivers' && permission.block) && (
                                                                <div className='rider10' onClick={() => { driver.isBlock ? unblockDriver(driver._id) : blockDriver(driver._id) }}>
                                                                    <MdOutlineBlock color={driver.isBlock ? "red" : "#667085"} size={20} />
                                                                    <p style={{ color: driver.isBlock ? 'red' : '#667085' }}>Block/Unblock</p>
                                                                </div>
                                                            )}
                                                            {permissionsArray.some(permission => permission.name === 'All Drivers' && permission.view) && (
                                                                <div className='rider10'>
                                                                    <Link to={`/driver_details/${driver._id}`} className='sidebar-link' >
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

export default HOC(Drivers)