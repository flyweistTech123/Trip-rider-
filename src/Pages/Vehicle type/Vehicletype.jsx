import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import './Vehicletype.css'
import HOC from '../../Components/HOC/HOC'

import { IoSearch } from "react-icons/io5";
import { Link } from 'react-router-dom';





// import img from '../../Images/img5.png'


const Vehicletype = () => {

    return (
        <>
            <div className='pricing'>
                <div className='pricing1'>
                    <h6>Vehicle Type</h6>

                    <Link to={'/allnormalvehicles'} className='sidebar-link'>
                        <div className='pricing2'>
                            <div className='pricing3'>
                                <h5>Normal Vehicle</h5>
                                <div className='rider5'>
                                    <div className='rider6'>
                                        <IoSearch />
                                    </div>
                                    <input type="search" name="" id="" placeholder='Search User' />
                                </div>
                            </div>
                        </div>
                    </Link>
                    <Link to={'/allhourlypricing'} className='sidebar-link'>
                        <div className='pricing2'>
                            <div className='pricing3'>
                                <h5>Super Car Vehicle</h5>
                                <div className='rider5'>
                                    <div className='rider6'>
                                        <IoSearch />
                                    </div>
                                    <input type="search" name="" id="" placeholder='Search User' />
                                </div>
                            </div>
                        </div>
                    </Link>

                    <Link to={'/alloutstationpricing'} className='sidebar-link'>
                        <div className='pricing2'>
                            <div className='pricing3'>
                                <h5>OutStation Pricing</h5>
                                <div className='rider5'>
                                    <div className='rider6'>
                                        <IoSearch />
                                    </div>
                                    <input type="search" name="" id="" placeholder='Search User' />
                                </div>
                            </div>
                        </div>
                    </Link>

                    <Link to={'/allbasepricing'} className='sidebar-link'>
                        <div className='pricing2'>
                            <div className='pricing3'>
                                <h5>Base Pricing</h5>
                                <div className='rider5'>
                                    <div className='rider6'>
                                        <IoSearch />
                                    </div>
                                    <input type="search" name="" id="" placeholder='Search User' />
                                </div>
                            </div>
                        </div>
                    </Link>
                    <Link to={'/allambulancepricing'} className='sidebar-link'>
                        <div className='pricing2'>
                            <div className='pricing3'>
                                <h5>Ambulance Pricing</h5>
                                <div className='rider5'>
                                    <div className='rider6'>
                                        <IoSearch />
                                    </div>
                                    <input type="search" name="" id="" placeholder='Search User' />
                                </div>
                            </div>
                        </div>
                    </Link>

                    <Link to={'/taxes'} className='sidebar-link'>
                        <div className='pricing2'>
                            <div className='pricing3'>
                                <h5>Taxes</h5>
                                <div className='rider5'>
                                    <div className='rider6'>
                                        <IoSearch />
                                    </div>
                                    <input type="search" name="" id="" placeholder='Search User' />
                                </div>
                            </div>
                        </div>
                    </Link>

                </div>
            </div>
        </>
    )
}

export default HOC(Vehicletype)