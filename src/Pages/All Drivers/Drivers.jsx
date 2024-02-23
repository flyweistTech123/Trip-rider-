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




// import img from '../../Images/img5.png'


const Drivers = () => {
    const [DriverData, setDriverData] = useState([]);

    useEffect(() => {
        fetchDriverData();
    }, []);

    const fetchDriverData = () => {
        axios.get('https://rajiv-cab-mu.vercel.app/api/v1/admin/all/driver')
            .then(response => {
                setDriverData(response.data.category);
            })
            .catch(error => {
                console.error('Error fetching driver data:', error);
            });
    };

    const deleteDriver = (driverId) => {
        axios.delete(`https://rajiv-cab-mu.vercel.app/api/v1/admin/delete/driver/${driverId}`)
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
        axios.put(`https://rajiv-cab-mu.vercel.app/api/v1/admin/block/driver/${driverId}`)
            .then(response => {
                // console.log('Driver is blocked successfully');
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
        axios.put(`https://rajiv-cab-mu.vercel.app/api/v1/admin/unblock/driver/${driverId}`)
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
                            <button>Add Driver</button>
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
                                    {/* <th>Vehicle No.</th> */}
                                    <th>Email</th>
                                    <th>Phone No.</th>
                                    <th>Total Earnings</th>
                                    {/* <th>Total Trips</th> */}
                                    <th>Action Buttons</th>
                                </tr>
                            </thead>
                            <tbody>
                                {DriverData.map(driver => (
                                    <tr key={driver.id}>
                                        <td className='rider8'>
                                            <img src={driver.profilePicture} />
                                            {driver.name}
                                        </td>
                                        {/* <td>{user.vehicle}</td> */}
                                        <td>{driver.email}</td>
                                        <td>{driver.mobileNumber}</td>
                                        <td style={{ color: '#F52D56' }}>{driver.wallet}</td>
                                        {/* <td>{user.totalTrips}</td> */}
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