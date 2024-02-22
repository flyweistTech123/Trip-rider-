import React from 'react'
import './Navbar.css'
import { BiSearch } from 'react-icons/bi';
import { AiOutlineSetting } from "react-icons/ai";
import { MdHistory } from "react-icons/md";
import { FiFilter } from "react-icons/fi";

import img from '../../Images/img2.png'


const Navbar = () => {
    return (
        <>
            <div className='navbar'>
                <div className='navbar10'>
                    <div className='navbar1'>
                        <img src={img} alt="" />
                        <div className='navbar2'>
                            <h6>Mr Admin</h6>
                            <span>Loreum Ipsum</span>
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
                            <button>SOS Request</button>
                        </div>

                        <div className='navbar6'>
                            <div className='navbar7'>
                                <div className='navbar8'>
                                    <AiOutlineSetting />
                                </div>
                                <p>Settings</p>
                            </div>
                            <div className='navbar7'>
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
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Navbar