import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import './Bookings.css'
import HOC from '../../Components/HOC/HOC'

import { IoSearch } from "react-icons/io5";
import { Link } from 'react-router-dom';





// import img from '../../Images/img5.png'


const Bookings = () => {

    return (
        <>
            <div className='pricing'>
                <div className='pricing1'>
                    <h6>Bookings Type</h6>

                    <Link to={'/AllBookings'} className='sidebar-link'>
                        <div className='pricing2'>
                            <div className='pricing3'>
                                <h5>All Bookings</h5>
                            </div>
                        </div>
                    </Link>

                    <Link to={'/scheduled_booking'} className='sidebar-link'>
                        <div className='pricing2'>
                            <div className='pricing3'>
                                <h5>Scheduled Bookings</h5>
                            </div>
                        </div>
                    </Link>
                    <Link to={'/cancellled_booking'} className='sidebar-link'>
                        <div className='pricing2'>
                            <div className='pricing3'>
                                <h5>Cancelled Bookings</h5>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default HOC(Bookings)