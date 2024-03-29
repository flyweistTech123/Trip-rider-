import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AdminProfile.css'
import { Link } from 'react-router-dom';
import HOC from '../../Components/HOC/HOC'

import { IoSearch } from "react-icons/io5";
import { RiDeleteBinLine } from "react-icons/ri";
import { MdOutlineBlock } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { IoEyeOutline } from "react-icons/io5";
import { BaseUrl, getAuthHeaders } from '../../Components/BaseUrl/BaseUrl';




// import img from '../../Images/img5.png'


const AllAdmin = () => {
    const [adminData, setAdminData] = useState([]);

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
            });
    };


    // const deleteDriver = (driverId) => {
    //     axios.delete(`https://rajiv-cab-mu.vercel.app/api/v1/admin/delete/driver/${driverId}`)
    //         .then(response => {
    //             fetchDriverData();
    //             toast.success("driver deleted successfully");
    //         })
    //         .catch(error => {
    //             console.error('Error deleting driver:', error);
    //             toast.error("Error deleting driver");
    //         });
    // };

    // const blockDriver = (driverId) => {
    //     axios.put(`https://rajiv-cab-mu.vercel.app/api/v1/admin/block/driver/${driverId}`)
    //         .then(response => {
    //             // console.log('Driver is blocked successfully');
    //             toast.success('Driver is blocked successfully');
    //             setDriverData(prevDriverData => {
    //                 return prevDriverData.map(driver => {
    //                     if (driver._id === driverId) {
    //                         return { ...driver, isBlock: true };
    //                     }
    //                     return driver;
    //                 });
    //             });
    //         })
    //         .catch(error => {
    //             console.error('Error blocking driver:', error);
    //             toast.error("Error blocking driver");
    //         });
    // };
    // const unblockDriver = (driverId) => {
    //     axios.put(`https://rajiv-cab-mu.vercel.app/api/v1/admin/unblock/driver/${driverId}`)
    //         .then(response => {
    //             // console.log('Driver is unblocked successfully');
    //             toast.success('Driver is unblocked successfully');
    //             setDriverData(prevDriverData => {
    //                 return prevDriverData.map(driver => {
    //                     if (driver._id === driverId) {
    //                         return { ...driver, isBlock: false };
    //                     }
    //                     return driver;
    //                 });
    //             });
    //         })
    //         .catch(error => {
    //             console.error('Error unblocking driver:', error);
    //             toast.error("Error unblocking driver");
    //         });
    // };



    return (
        <>
            <div className='rider'>
                <div className='rider1'>
                    <div className='rider2'>
                        <div className='rider3'>
                            <h6>All Admin</h6>
                        </div>

                        <div className='rider4'>
                            <button>Add Admin</button>
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
                                    <th>SR.No.</th>
                                    <th>Name</th>
                                    <th>Company Key</th>
                                    <th>Email</th>
                                    <th>Phone No.</th>
                                    <th>Role</th>
                                    <th>Status</th>
                                    <th>Action Buttons</th>
                                </tr>
                            </thead>
                            <tbody>
                                {adminData.map((admin, index) => (
                                    <tr key={admin.id}>
                                        <td>{index + 1}</td>
                                        <td>{admin.name}</td>
                                        <td>--</td>
                                        <td>{admin.email}</td>
                                        <td>{admin.mobileNumber}</td>
                                        <td>{admin.role}</td>
                                        <td>{admin.status}</td>
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
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HOC(AllAdmin)