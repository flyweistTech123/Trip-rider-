import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import './LocatiolnType.css'
import HOC from '../../Components/HOC/HOC'

import { IoSearch } from "react-icons/io5";
import { Link } from 'react-router-dom';





// import img from '../../Images/img5.png'


const LocatiolnType = () => {

    return (
        <>
            <div className='pricing'>
                <div className='pricing1'>
                    <Link to={'/alllocation'} className='sidebar-link'>
                        <div className='loacation'>
                            <div className='pricing3'>
                                <h5>Location</h5>
                                <div className='rider5'>
                                    <div className='rider6'>
                                        <IoSearch />
                                    </div>
                                    <input type="search" name="" id="" placeholder='Search Vehicle' />
                                </div>
                            </div>
                        </div>
                    </Link>
                    <div className='Location2'>
                        <h6>Location Type</h6>
                    </div>
                    <div className='Location1'>
                        <Link to={''} className='sidebar-link'>
                            <div className='loacation'>
                                <div className='pricing3'>
                                    <h5>Metro</h5>
                                    <div className='rider5'>
                                        <div className='rider6'>
                                            <IoSearch />
                                        </div>
                                        <input type="search" name="" id="" placeholder='Search Vehicle' />
                                    </div>
                                </div>
                            </div>
                        </Link>
                        <Link to={''} className='sidebar-link'>
                            <div className='loacation'>
                                <div className='pricing3'>
                                    <h5>Urban</h5>
                                    <div className='rider5'>
                                        <div className='rider6'>
                                            <IoSearch />
                                        </div>
                                        <input type="search" name="" id="" placeholder='Search Vehicle' />
                                    </div>
                                </div>
                            </div>
                        </Link>
                        <Link to={''} className='sidebar-link'>
                            <div className='loacation'>
                                <div className='pricing3'>
                                    <h5>Rural</h5>
                                    <div className='rider5'>
                                        <div className='rider6'>
                                            <IoSearch />
                                        </div>
                                        <input type="search" name="" id="" placeholder='Search Vehicle' />
                                    </div>
                                </div>
                            </div>
                        </Link>
                        <Link to={''} className='sidebar-link'>
                            <div className='loacation'>
                                <div className='pricing3'>
                                    <h5>Pricing</h5>
                                    <div className='rider5'>
                                        <div className='rider6'>
                                            <IoSearch />
                                        </div>
                                        <input type="search" name="" id="" placeholder='Search Vehicle' />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>

                </div>
            </div>
        </>
    )
}

export default HOC(LocatiolnType)