import React, { useEffect, useState } from 'react'
import './Navbar.css'
import { BiSearch } from 'react-icons/bi';
import { AiOutlineSetting } from "react-icons/ai";
import { MdHistory } from "react-icons/md";
import { FiFilter } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
import { BaseUrl, getAuthHeaders } from '../../Components/BaseUrl/BaseUrl';

import img from '../../Images/img2.png'
import axios from 'axios';


const Navbar = () => {
    const [adminData, setAdminData] = useState(null);
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [image, setImage] = useState('')


    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                const response = await axios.get(`${BaseUrl}api/v1/admin/me`, getAuthHeaders())
                const { name, role,profilePicture } = response.data.data;
                setName(name);
                setRole(role);
                setImage(profilePicture)
            } catch (error) {
                console.error('Error fetching Admin data:', error);
            }
        };

        fetchAdminData();
    }, []);

    const navigate = useNavigate()
    return (
        <>
            <div className='navbar'>
                <div className='navbar10'>
                    <div className='navbar1' onClick={() => navigate('/adminprofile')}>
                        <img src={image} alt="" />
                        <div className='navbar2'>
                            <h6>Mr {name}</h6>
                            <span>{role}</span>
                        </div>
                    </div>

                    <div className='navbar3'>
                        <div className='navbar4'>
                            <div className='navbar5'>
                                <BiSearch className="search-icon" />
                            </div>
                            <input type="text" placeholder="Search in admin Panel" className="search-input" />
                        </div>

                        <div className='navbar11'>
                            <button onClick={()=>navigate('/sos')}>SOS Request</button>
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