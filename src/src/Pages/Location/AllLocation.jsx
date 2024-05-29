import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import './LocatiolnType.css'
import HOC from '../../Components/HOC/HOC'

import { IoSearch } from "react-icons/io5";
import { Link } from 'react-router-dom';





// import img from '../../Images/img5.png'


const AllLocation = () => {

    return (
        <>
            <div className='pricing'>
                <div className='pricing1'>
                    <h6>Location</h6>

                    <Link to={'/allstate'} className='sidebar-link'>
                        <div className='pricing2'>
                            <div className='pricing3'>
                                <h5>State</h5>
                            </div>
                        </div>
                    </Link>

                    <Link to={'/allcity'} className='sidebar-link'>
                        <div className='pricing2'>
                            <div className='pricing3'>
                                <h5>City</h5>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default HOC(AllLocation)