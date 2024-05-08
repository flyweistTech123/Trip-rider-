import React, { useEffect, useState } from 'react'
import './Navbar.css'
import { toast } from 'react-toastify';



import { AiOutlineSetting } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';

import img2 from '../../Images/user.webp'


const Navbar = ({ admindata, onLogout, clearToken }) => {

    const handleLogout = () => {
        // Clear token from localStorage
        clearToken();
        // Clear adminData from localStorage (triggered by onLogout prop)
        onLogout();
        // Show logout success toast
        toast.success("Logout successfully");
        // Redirect to home page
        navigate('/login ');
    };


    const navigate = useNavigate()
    return (
        <>
            <div className='navbar'>
                <div className='navbar10'>
                    <div className='navbar1' onClick={() => navigate('/adminprofile')}>
                        <img src={admindata?.profilePicture || img2} alt="No image"  />
                        <div className='navbar2'>
                            <h6>Mr {admindata?.name}</h6>
                            <span>{admindata?.role}</span>
                        </div>
                        <div className='navbar11'>
                            <button onClick={handleLogout}>Logout</button>
                        </div>
                    </div>

                    <div className='navbar3'>
                        {/* <div className='navbar4'>
                            <div className='navbar5'>
                                <BiSearch className="search-icon" />
                            </div>
                            <input type="text" placeholder="Search in admin Panel" className="search-input" />
                        </div> */}


                        <div className='navbar11'>
                            <button onClick={() => navigate('/sos')}>SOS Request</button>
                        </div>

                        <div className='navbar6'>
                            <div className='navbar7' onClick={() => navigate('/setting')}>
                                <div className='navbar8'>
                                    <AiOutlineSetting />
                                </div>
                                <p>Settings</p>
                            </div>
                            {/* <div className='navbar7'>
                                <div className='navbar88'>
                                    <MdHistory />
                                </div>
                                <p>History</p>
                            </div>
                            <div className='navbar7'>
                                <div className='navbar9'>
                                    <FiFilter />
                                </div>
                                <p>Filter</p>
                            </div> */}
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Navbar