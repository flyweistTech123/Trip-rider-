import React, { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import './Services.css'
import HOC from '../../Components/HOC/HOC'

import { IoSearch } from "react-icons/io5";


import img from '../../Images/img29.png'
import img1 from '../../Images/img30.png'
import img2 from '../../Images/img31.png'
import img3 from '../../Images/img32.png'
import img4 from '../../Images/img33.png'
import img5 from '../../Images/img34.png'
import img6 from '../../Images/img35.png'
import img7 from '../../Images/img36.png'
import img8 from '../../Images/img37.png'
import img9 from '../../Images/img38.png'
import { Link } from 'react-router-dom';


const Services = () => {

    return (
        <>
            <div className='rider'>
                <div className='rider1'>
                    <div className='rider2'>
                        <div className='rider3'>
                            <h6>Services</h6>
                        </div>

                        <div className='rider4'>
                            <div className='services'>
                                <p>Disable</p>
                                <label className="services1">
                                    <input type="checkbox" />
                                    <div class="services2"></div>
                                </label>

                            </div>


                            <div className='rider5'>
                                <div className='rider6'>
                                    <IoSearch />
                                </div>
                                <input type="search" name="" id="" placeholder='Search Driver' />
                            </div>
                        </div>
                    </div>

                    <div className='services3'>
                        <div className='services4'>
                            <p>Individual</p>
                            <p>Shuttle</p>
                        </div>

                        <div className='services5'>
                            <Link to={'/cardetails'} className='sidebar-link'>
                                <div className='services6'>
                                    <div className='services7'>
                                        <img src={img} alt="" />
                                    </div>
                                    <h6>Daily</h6>
                                </div>
                            </Link>
                            <div className='services6'>
                                <div className='services7'>
                                    <img src={img1} alt="" />
                                </div>
                                <h6>Bike</h6>
                            </div>
                            <div className='services6'>
                                <div className='services7'>
                                    <img src={img2} alt="" />
                                </div>
                                <h6>Hourly</h6>
                            </div>
                            <div className='services6'>
                                <div className='services7'>
                                    <img src={img3} alt="" />
                                </div>
                                <h6>Airport</h6>
                            </div>
                        </div>
                        <div className='services5'>
                            <div className='services6'>
                                <div className='services7'>
                                    <img src={img4} alt="" />
                                </div>
                                <h6>Out Station</h6>
                            </div>
                            <div className='services6'>
                                <div className='services7'>
                                    <img src={img5} alt="" />
                                </div>
                                <h6>Supercar</h6>
                            </div>
                            <div className='services6'>
                                <div className='services7'>
                                    <img src={img6} alt="" />
                                </div>
                                <h6>Ambulance</h6>
                            </div>
                            <div className='services6'>
                                <div className='services7'>
                                    <img src={img7} alt="" />
                                </div>
                                <h6>Delivery</h6>
                            </div>
                        </div>
                        <div className='services5'>
                            <div className='services6'>
                                <div className='services7'>
                                    <img src={img8} alt="" />
                                </div>
                                <h6>Rickshaw</h6>
                            </div>
                            <div className='services6'>
                                <div className='services7'>
                                    <img src={img9} alt="" />
                                </div>
                                <h6>Insurance</h6>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HOC(Services)