import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import './Privileges.css'
import HOC from '../../Components/HOC/HOC'
import { Link } from 'react-router-dom';


import { IoSearch } from "react-icons/io5";
import { RiDeleteBinLine } from "react-icons/ri";
import { MdOutlineBlock } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { IoEyeOutline } from "react-icons/io5";


const Privileges = () => {
    const [admindata, setAdminData] = useState([]);

    const fetchAdminData = async () => {
        try {
            const response = await axios.get('https://rajiv-cab-mu.vercel.app/api/v1/admin/getPrivileges');
            setAdminData(response.data.data);
        } catch (error) {
            console.error('Error fetching Admin data:', error);
        }
    };

    useEffect(() => {
        fetchAdminData();
    }, []);


    const deleteAdmin = (adminId) => {
        try {
            axios.delete('https://rajiv-cab-mu.vercel.app/api/v1/admin/delete/driver/${driverId}')
            fetchAdminData()
            toast.success("Admin Deleted Successfully");
        } catch (error) {
            console.error('Error of deleting the admin', error);
            toast.error("Error of deleting admin");
        }
    }

    const BlockAdmin = (adminId) => {
        axios.put(`https://rajiv-cab-mu.vercel.app/api/v1/admin/block/driver/${adminId}`)
            .then(response => {
                // console.log('Driver is blocked successfully');
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
        axios.put(`https://rajiv-cab-mu.vercel.app/api/v1/admin/unblock/driver/${adminId}`)
            .then(response => {
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
                            <h6>Privileges</h6>
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
                                    <th>Gender</th>
                                    <th>Role</th>
                                    <th>Address</th>
                                    <th>Verified</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {admindata.map(admin => (
                                    <tr key={admin.id}>
                                        <td className='rider8'>
                                            <img src={admin.profilePicture} />
                                            {admin.name}
                                        </td>
                                        <td>{admin.email}</td>
                                        <td>{admin.mobileNumber}</td>
                                        <td>{admin.gender}</td>
                                        <td>{admin.role}</td>
                                        <td>{admin.address}</td>
                                        <td>{admin.isVerified ? "Verified" : "Not Verified"}</td>
                                        <td>{admin.status}</td>
                                        <td className='rider9'>
                                            <div className='rider10' onClick={() => deleteAdmin(admin._id)}>
                                                <RiDeleteBinLine color='#667085' size={20} />
                                                <p>Delete</p>
                                            </div>
                                            <div className='rider10' onClick={() => { admin.isBlock ? unblockAdmin(admin._id) : BlockAdmin(admin._id) }}>
                                                <MdOutlineBlock color={admin.isBlock ? "red" : "#667085"} size={20} />
                                                <p style={{ color: admin.isBlock ? 'red' : '#667085' }}>Block/Unblock</p>
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

export default HOC(Privileges);
