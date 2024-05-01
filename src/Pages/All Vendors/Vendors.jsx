import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Vendors.css'
import HOC from '../../Components/HOC/HOC'
import { Link } from 'react-router-dom';

import { IoSearch } from "react-icons/io5";
import { RiDeleteBinLine } from "react-icons/ri";
import { MdOutlineBlock } from "react-icons/md";
import { IoEyeOutline } from "react-icons/io5";
import { BaseUrl, getAuthHeaders } from '../../Components/BaseUrl/BaseUrl';


import img2 from '../../Images/user.webp'


const Vendors = () => {
    const [vendorData, setVendorData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchVendorsData();
    }, []);

    const fetchVendorsData = () => {
        axios.get(`${BaseUrl}api/v1/admin/all/vendor`, getAuthHeaders())
            .then(response => {
                setVendorData(response.data.category);
            })
            .catch(error => {
                console.error('Error fetching vendor data:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredVendorData = vendorData.filter(vindor =>
        vindor.name && vindor.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const deleteVendor = (vendorId) => {
        axios.delete(`${BaseUrl}api/v1/admin/delete/driver/${vendorId}`, getAuthHeaders())
            .then(response => {
                // console.log('vendor deleted successfully');
                toast.success("vendor deleted successfully");
                fetchVendorsData();
            })
            .catch(error => {
                console.error('Error deleting Vendor:', error);
                toast.error("Error deleting Vendor");
            });
    };

    const blockVendor = (vendorId) => {
        axios.put(`${BaseUrl}api/v1/admin/block/driver/${vendorId}`, getAuthHeaders())
            .then(response => {
                // console.log('Vendor is blocked successfully');
                toast.success("Vendor is blocked successfully");
                setVendorData(prevVendorData => {
                    return prevVendorData.map(vendor => {
                        if (vendor._id === vendorId) {
                            return { ...vendor, isBlock: true }; // Update isBlock property
                        }
                        return vendor;
                    });
                });
            })
            .catch(error => {
                console.error('Error blocking vendor:', error);
                toast.error("Error blocking vendor");
            });
    };
    const unblockVendor = (vendorId) => {
        axios.put(`${BaseUrl}api/v1/admin/unblock/driver/${vendorId}`, getAuthHeaders())
            .then(response => {
                // console.log('Vendor is unblocked successfully');
                toast.success("Vendor is unblocked successfully");
                setVendorData(prevVendorData => {
                    return prevVendorData.map(vendor => {
                        if (vendor._id === vendorId) {
                            return { ...vendor, isBlock: false }; // Update isBlock property
                        }
                        return vendor;
                    });
                });
            })
            .catch(error => {
                console.error('Error unblocking vendor:', error);
                toast.error("Error unblocking vendor");
            });
    };



    return (
        <>
            <div className='rider'>
                <div className='rider1'>
                    <div className='rider2'>
                        <div className='rider3'>
                            <h6>All Vendors</h6>
                        </div>

                        <div className='rider4'>
                            <div className='rider5'>
                                <div className='rider6'>
                                    <IoSearch />
                                </div>
                                <input type="search" name="" id="" placeholder='Search Vendor' onChange={handleSearch} />
                            </div>
                        </div>
                    </div>
                    <div className='rider7'>
                        <table>
                            <thead>
                                <tr>
                                    <th>Profile Image</th>
                                    <th>Vendor Name</th>
                                    <th>Email</th>
                                    <th>Phone No.</th>
                                    <th>Total Earnings</th>
                                    <th>Total Vehicles</th>
                                    <th>Action Buttons</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan="7" style={{ color: "#C3052C", fontWeight: "600", fontSize: "18px" }}>Loading vendors...</td>
                                    </tr>
                                ) :
                                    searchQuery && filteredVendorData.length === 0 ? (
                                        <tr>
                                            <td colSpan="7" style={{ color: "#C3052C", fontWeight: "600", fontSize: "18px" }}>Vendor not found</td>
                                        </tr>
                                    ) : (
                                        searchQuery
                                            ?
                                            filteredVendorData.map(vendor => (
                                                <tr key={vendor.id}>
                                                    <td>
                                                        <img src={vendor?.profilePicture || img2} alt="No image" style={{ width: '60px', height: "60px", borderRadius: "100%" }} />
                                                    </td>
                                                    <td>{vendor?.name}</td>
                                                    <td>{vendor.email}</td>
                                                    <td>{vendor.mobileNumber}</td>
                                                    <td style={{ color: '#F52D56' }}>₹ {vendor.wallet}</td>
                                                    <td>{vendor.noOfVehicle}</td>
                                                    <td>
                                                        <div className='rider9'>
                                                            <div className='rider10' onClick={() => deleteVendor(vendor._id)}>
                                                                <RiDeleteBinLine color='#667085' size={20} />
                                                                <p>Delete</p>
                                                            </div>
                                                            <div className='rider10' onClick={() => { vendor.isBlock ? unblockVendor(vendor._id) : blockVendor(vendor._id) }}>
                                                                <MdOutlineBlock color={vendor.isBlock ? "red" : "#667085"} size={20} />
                                                                <p style={{ color: vendor.isBlock ? 'red' : '#667085' }}>Block/Unblock</p>
                                                            </div>
                                                            <div className='rider10'>
                                                                <Link to={`/vendors_details/${vendor._id}`} className='sidebar-link' >
                                                                    <IoEyeOutline color='#667085' size={20} />
                                                                    <p>View</p>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                            : vendorData.map(vendor => (
                                                <tr key={vendor.id}>
                                                    <td>
                                                        <img src={vendor?.profilePicture || img2} alt="No image" style={{ width: '60px', height: "60px", borderRadius: "100%" }} />
                                                    </td>
                                                    <td>{vendor?.name}</td>
                                                    <td>{vendor.email}</td>
                                                    <td>{vendor.mobileNumber}</td>
                                                    <td style={{ color: '#F52D56' }}>₹ {vendor.wallet}</td>
                                                    <td>{vendor.noOfVehicle}</td>
                                                    <td>
                                                        <div className='rider9'>
                                                            <div className='rider10' onClick={() => deleteVendor(vendor._id)}>
                                                                <RiDeleteBinLine color='#667085' size={20} />
                                                                <p>Delete</p>
                                                            </div>
                                                            <div className='rider10' onClick={() => { vendor.isBlock ? unblockVendor(vendor._id) : blockVendor(vendor._id) }}>
                                                                <MdOutlineBlock color={vendor.isBlock ? "red" : "#667085"} size={20} />
                                                                <p style={{ color: vendor.isBlock ? 'red' : '#667085' }}>Block/Unblock</p>
                                                            </div>
                                                            <div className='rider10'>
                                                                <Link to={`/vendors_details/${vendor._id}`} className='sidebar-link' >
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

export default HOC(Vendors)