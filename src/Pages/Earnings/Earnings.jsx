import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import './Earnings.css'
import HOC from '../../Components/HOC/HOC'
import { Link } from 'react-router-dom';


import { IoSearch } from "react-icons/io5";
import { RiDeleteBinLine } from "react-icons/ri";
import { MdOutlineBlock } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { IoEyeOutline } from "react-icons/io5";


const Earnings = () => {
    const [earningdata, setEarningData] = useState([]);

    const fetchEarningData = async () => {
        try {
            const response = await axios.get('https://rajiv-cab-mu.vercel.app/api/v1/admin/all/driver');
            setEarningData(response?.data?.category);
        } catch (error) {
            console.error('Error fetching Earning data:', error);
        }
    };

    useEffect(() => {
        fetchEarningData();
    }, []);


    // const deleteAdmin = (adminId) => {
    //     try {
    //         axios.delete('https://rajiv-cab-mu.vercel.app/api/v1/admin/delete/driver/${driverId}')
    //         fetchAdminData()
    //         toast.success("Admin Deleted Successfully");
    //     } catch (error) {
    //         console.error('Error of deleting the admin', error);
    //         toast.error("Error of deleting admin");
    //     }
    // }

    // const BlockAdmin = (adminId) => {
    //     axios.put(`https://rajiv-cab-mu.vercel.app/api/v1/admin/block/driver/${adminId}`)
    //         .then(response => {
    //             // console.log('Driver is blocked successfully');
    //             toast.success('Admin is blocked successfully');
    //             setAdminData(prevAdminData => {
    //                 return prevAdminData.map(admin => {
    //                     if (admin._id === adminId) {
    //                         return { ...admin, isBlock: true };
    //                     }
    //                     return admin;
    //                 });
    //             });
    //         })
    //         .catch(error => {
    //             console.error('Error blocking Admin:', error);
    //             toast.error("Error blocking Admin");
    //         });
    // };


    // const unblockAdmin = (adminId) => {
    //     axios.put(`https://rajiv-cab-mu.vercel.app/api/v1/admin/unblock/driver/${adminId}`)
    //         .then(response => {
    //             toast.success('Admin is unblocked successfully');
    //             setAdminData(prevAdminData => {
    //                 return prevAdminData.map(admin => {
    //                     if (admin._id === adminId) {
    //                         return { ...admin, isBlock: false };
    //                     }
    //                     return admin;
    //                 });
    //             });
    //         })
    //         .catch(error => {
    //             console.error('Error unblocking Admin:', error);
    //             toast.error("Error unblocking Admin");
    //         });
    // };



    return (
        <>
            <div className='rider'>
                <div className='rider1'>
                    <div className='rider2'>
                        <div className='rider3'>
                            <h6>Earnings</h6>
                        </div>

                        <div className='rider4'>
                            <div className='rider5'>
                                <div className='rider6'>
                                    <IoSearch />
                                </div>
                                <input type="search" name="" id="" placeholder='Search admin' />
                            </div>
                        </div>
                    </div>
                    <div className='rider7'>
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Mobile Number</th>
                                    <th>Wallet</th>
                                    <th>Cash In Hand</th>
                                    <th>Admin Cash</th>
                                </tr>
                            </thead>
                            <tbody>
                                {earningdata.map(earn => (
                                    <tr key={earn.id}>
                                        <td className='rider8'>
                                            <img src={earn.profilePicture}  style={{width:"50px"}} />
                                            {earn.name}
                                        </td>
                                        <td>{earn.email}</td>
                                        <td>{earn.mobileNumber}</td>
                                        <td>{earn.wallet}</td>
                                        <td>{earn.cashInHand}</td>
                                        <td>{earn.adminCash}</td>
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

export default HOC(Earnings);
