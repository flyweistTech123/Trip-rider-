import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Riders.css'
import HOC from '../../Components/HOC/HOC'
import { Link } from 'react-router-dom';

import { IoSearch } from "react-icons/io5";
import { RiDeleteBinLine } from "react-icons/ri";
import { MdOutlineBlock } from "react-icons/md";
import { IoEyeOutline } from "react-icons/io5";
import { BaseUrl, getAuthHeaders } from '../../Components/BaseUrl/BaseUrl';




import img2 from '../../Images/user.webp'


const Riders = () => {

    const [riderData, setRiderData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        fetchRiderData();
    }, []);

    const fetchRiderData = () => {
        axios.get(`${BaseUrl}api/v1/admin/all/user`, getAuthHeaders())
            .then(response => {
                setRiderData(response.data.category);
            })
            .catch(error => {
                console.error('Error fetching rider data:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    };


    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredRiderData = riderData.filter(rider =>
        rider.name && rider.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const deleteRider = (riderId) => {
        axios.delete(`${BaseUrl}api/v1/admin/delete/driver/${riderId}`, getAuthHeaders())
            .then(response => {
                toast.success("Rider deleted successfully");
                fetchRiderData();
            })
            .catch(error => {
                console.error('Error to deleting Rider:', error);
                toast.error("Error to deleting Rider");
            });
    };

    const blockRider = (riderId) => {
        axios.put(`${BaseUrl}api/v1/admin/block/driver/${riderId}`, getAuthHeaders())
            .then(response => {
                toast.success("Rider is blocked successfully");
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
                toast.error("Error blocking rider");
            });
    };
    const unblockRider = (riderId) => {
        axios.put(`${BaseUrl}api/v1/admin/unblock/driver/${riderId}`, getAuthHeaders())
            .then(response => {
                // console.log('Rider is unblocked successfully');
                toast.success("Rider is unblocked successfully'");
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
                console.error('Error unblocking Rider:', error);
                toast.error("Error unblocking Rider");
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
                                <input type="search" name="" id="" placeholder='Search User' value={searchQuery}
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
                                ) :
                                    searchQuery && filteredRiderData.length === 0 ? (
                                        <tr>
                                            <td colSpan="7" style={{ color: "#C3052C", fontWeight: "600", fontSize: "18px" }}>User not found</td>
                                        </tr>
                                    ) : (
                                        searchQuery
                                            ?
                                            filteredRiderData.map(rider => (
                                                <tr key={rider.id}>
                                                    <td>
                                                        <img src={rider?.profilePicture || img2} alt="No image" style={{ width: '60px', height:"60px",  borderRadius: "100%" }} />
                                                    </td>
                                                    <td>{rider?.name}</td>
                                                    <td>{rider.email}</td>
                                                    <td>{rider.mobileNumber}</td>
                                                    <td style={{ color: '#F52D56' }}>{rider.wallet}</td>
                                                    <td>{rider.totalBooking}</td>
                                                    <td>
                                                        <div className='rider9'>
                                                            <div className='rider10' onClick={() => deleteRider(rider._id)}>
                                                                <RiDeleteBinLine color='#667085' size={20} />
                                                                <p>Delete</p>
                                                            </div>
                                                            <div className='rider10' onClick={() => { rider.isBlock ? unblockRider(rider._id) : blockRider(rider._id) }}>
                                                                <MdOutlineBlock color={rider.isBlock ? "red" : "#667085"} size={20} />
                                                                <p style={{ color: rider.isBlock ? 'red' : '#667085' }}>Block/Unblock</p>
                                                            </div>
                                                            <div className='rider10'>
                                                                <Link to={`/riders_details/${rider._id}`} className='sidebar-link' >
                                                                    <IoEyeOutline color='#667085' size={20} />
                                                                    <p>View</p>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))

                                            :
                                            riderData.map(rider => (
                                                <tr key={rider.id}>
                                                    <td>
                                                        <img src={rider?.profilePicture || img2} alt="No image" style={{ width: '60px', height:"60px", borderRadius: "100%" }} />
                                                    </td>
                                                    <td>{rider?.name}</td>
                                                    <td>{rider.email}</td>
                                                    <td>{rider.mobileNumber}</td>
                                                    <td style={{ color: '#F52D56' }}>{rider.wallet}</td>
                                                    <td>{rider.totalBooking}</td>
                                                    <td>
                                                        <div className='rider9'>
                                                            <div className='rider10' onClick={() => deleteRider(rider._id)}>
                                                                <RiDeleteBinLine color='#667085' size={20} />
                                                                <p>Delete</p>
                                                            </div>
                                                            <div className='rider10' onClick={() => { rider.isBlock ? unblockRider(rider._id) : blockRider(rider._id) }}>
                                                                <MdOutlineBlock color={rider.isBlock ? "red" : "#667085"} size={20} />
                                                                <p style={{ color: rider.isBlock ? 'red' : '#667085' }}>Block/Unblock</p>
                                                            </div>
                                                            <div className='rider10'>
                                                                <Link to={`/riders_details/${rider._id}`} className='sidebar-link' >
                                                                    <IoEyeOutline color='#667085' size={20} />
                                                                    <p>View</p>
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

export default HOC(Riders)