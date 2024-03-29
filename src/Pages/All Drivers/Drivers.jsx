import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Drivers.css'
import { Link } from 'react-router-dom';
import HOC from '../../Components/HOC/HOC'

import { IoSearch } from "react-icons/io5";
import { RiDeleteBinLine } from "react-icons/ri";
import { MdOutlineBlock } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { IoEyeOutline } from "react-icons/io5";
import { BaseUrl, getAuthHeaders } from '../../Components/BaseUrl/BaseUrl';
import imgdoc from '../../Images/documents.png'



// import img from '../../Images/img5.png'


const Drivers = () => {
    const [driverData, setDriverData] = useState([]);

    useEffect(() => {
        fetchDriverData();
    }, []);

    const fetchDriverData = () => {
        axios.get(`${BaseUrl}api/v1/admin/all/driver`, getAuthHeaders())
            .then(response => {
                setDriverData(response.data.category);
            })
            .catch(error => {
                console.error('Error fetching driver data:', error);
            });
    };


    const deleteDriver = (driverId) => {
        axios.delete(`${BaseUrl}api/v1/admin/delete/driver/${driverId}`, getAuthHeaders())
            .then(response => {
                fetchDriverData();
                toast.success("driver deleted successfully");
            })
            .catch(error => {
                console.error('Error deleting driver:', error);
                toast.error("Error deleting driver");
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
                toast.error("Error blocking driver");
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
                toast.error("Error unblocking driver");
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
                                <input type="search" name="" id="" placeholder='Search Driver' />
                            </div>
                        </div>
                    </div>
                    <div className='rider7'>
                        <table>
                            <thead>
                                <tr>
                                    <th>Driver Name</th>
                                    <th>Email</th>
                                    <th>Phone No.</th>
                                    {/* <th>Type</th> */}
                                    <th>Total Trips</th>
                                    {/* <th>Document View</th> */}
                                    {/* <th>Rating</th> */}
                                    <th>Status</th>
                                    <th>Total Earnings</th>
                                    <th>Action Buttons</th>
                                </tr>
                            </thead>
                            <tbody>
                                {driverData?.map(driver => (
                                    <tr key={driver.id}>
                                        <td className='rider8'>
                                            <img src={driver?.profilePicture} style={{ width: '50px' }} />
                                            {driver?.name}
                                        </td>
                                        <td>{driver?.email}</td>
                                        <td>{driver?.mobileNumber}</td>
                                        {/* <td>{driver?.driverDocument?.maker_model}</td> */}
                                        <td>{driver?.totalBooking}</td>
                                        {/* <td><img src={imgdoc} alt="" style={{ width: '30px', cursor: 'pointer' }} /></td> */}
                                        {/* <td>{driver?.rating}</td> */}
                                        <td style={{
                                            color: driver?.status === 'cancel' ? '#F52D56' :
                                                driver?.status === 'pending' ? '#FBAC2C' :
                                                    driver?.status === 'complete' ? '#609527' : 'black',
                                            fontWeight: '600'
                                        }}>
                                            {driver?.status}
                                        </td>
                                        <td>₹ {driver?.wallet}</td>
                                        <td className='rider9'>
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
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HOC(Drivers)