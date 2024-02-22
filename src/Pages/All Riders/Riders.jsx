import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import './Riders.css'
import HOC from '../../Components/HOC/HOC'

import { IoSearch } from "react-icons/io5";
import { RiDeleteBinLine } from "react-icons/ri";
import { MdOutlineBlock } from "react-icons/md";
import { MdEdit } from "react-icons/md";



// import img from '../../Images/img5.png'


const Riders = () => {
    const [riderData, setRiderData] = useState([]);

    useEffect(() => {
        fetchRiderData();
    }, []);

    const fetchRiderData = () => {
        axios.get('https://rajiv-cab-mu.vercel.app/api/v1/admin/all/user')
            .then(response => {
                setRiderData(response.data.category);
            })
            .catch(error => {
                console.error('Error fetching rider data:', error);
            });
    };

    const deleteRider = (riderId) => {
        axios.delete(`https://rajiv-cab-mu.vercel.app/api/v1/admin/delete/driver/${riderId}`)
            .then(response => {
                // console.log('Rider deleted successfully');
                toast.success("Rider deleted successfully");
                fetchRiderData();
            })
            .catch(error => {
                console.error('Error deleting Rider:', error);
                toast.error("Error deleting Rider");
            });
    };

    const blockRider = (riderId) => {
        axios.put(`https://rajiv-cab-mu.vercel.app/api/v1/admin/block/driver/${riderId}`)
            .then(response => {
                // console.log('Rider is blocked successfully');
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
        axios.put(`https://rajiv-cab-mu.vercel.app/api/v1/admin/unblock/driver/${riderId}`)
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
                            <h6>All Riders</h6>
                        </div>

                        <div className='rider4'>
                            <button>Add user</button>
                            <div className='rider5'>
                                <div className='rider6'>
                                    <IoSearch />
                                </div>
                                <input type="search" name="" id="" placeholder='Search User' />
                            </div>
                        </div>
                    </div>
                    <div className='rider7'>
                        <table>
                            <thead>
                                <tr>
                                    <th>User Name</th>
                                    <th>Email</th>
                                    <th>Phone No.</th>
                                    <th>Wallet Balance</th>
                                    {/* <th>Total Trips</th> */}
                                    <th>Action Buttons</th>
                                </tr>
                            </thead>
                            <tbody>
                                {riderData.map(rider => (
                                    <tr key={rider.id} className={rider.isBlock ? 'blocked-rider' : ''}>
                                        <td className='rider8'>
                                            <img src={rider.profilePicture} />
                                            {rider.name}
                                        </td>
                                        <td>{rider.email}</td>
                                        <td>{rider.mobileNumber}</td>
                                        <td style={{ color: '#F52D56' }}>{rider.wallet}</td>
                                        {/* <td>{user.totalTrips}</td> */}
                                        <td className='rider9'>
                                            <div className='rider10' onClick={() => deleteRider(rider._id)}>
                                                <RiDeleteBinLine color='#667085' size={20} />
                                                <p>Delete</p>
                                            </div>
                                            <div className='rider10'  onClick={()=>{rider.isBlock ? unblockRider(rider._id) : blockRider(rider._id)}}>
                                                <MdOutlineBlock color='#667085' size={20} />
                                                <p>Block/Unblock</p>
                                            </div>
                                            <div className='rider10'>
                                                <MdEdit color='#667085' size={20} />
                                                <p>Edit</p>
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

export default HOC(Riders)