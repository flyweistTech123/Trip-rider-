import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import './Pricing.css'
import HOC from '../../Components/HOC/HOC'
import { useNavigate } from 'react-router-dom';
import { IoSearch } from "react-icons/io5";

import { FaSquarePlus } from "react-icons/fa6";




// import img from '../../Images/img5.png'


const Outstationpricing = () => {
    const navigate = useNavigate()
    return (
        <>
            <div className='rider'>
                <div className='rider1'>
                    <div className='rider2'>
                        <div className='rider3'>
                            <h6>Out Station Booking</h6>
                        </div>

                        <div className='rider4'>

                            <div className='outstationprice' onClick={()=>navigate('/addoutstationpricing')}>
                                <p>Add</p>
                                <FaSquarePlus   color='#FFFFFF'/>
                            </div>
                            <div className='rider5'>
                                <div className='rider6'>
                                    <IoSearch />
                                </div>
                                <input type="search" name="" id="" placeholder='Search User' />
                            </div>
                        </div>
                    </div>


                    <div className='dailyprice'>

                        <div className='outstationprice1'>
                            <p>Trip Type:</p>
                            <div className='outstationprice2'>
                                <div className='outstationprice3'>
                                    <input type="radio" />
                                    <p>One-way</p>
                                </div>
                                <div className='outstationprice3'>
                                    <input type="radio" />
                                    <p>Round Trip</p>
                                </div>
                            </div>
                        </div>
                        <div className='dailyprice1'>
                            <div className='dailyprice2'>
                                <label htmlFor="">Vehicle</label>
                                <select name="" id="">
                                    <option value="">Select Vehicle</option>
                                </select>
                            </div>
                            <div className='dailyprice2'>
                                <label htmlFor="">City</label>
                                <select name="" id="">
                                    <option value="">Select City</option>
                                </select>
                            </div>
                        </div>

                        <div className='dailyprice3'>
                            <div className='dailyprice4'>
                                <label htmlFor="">From</label>
                                <input type="text"  placeholder='Enter pickup location'/>
                            </div>
                            <div className='dailyprice4'>
                                <label htmlFor="">To</label>
                                <input type="text" placeholder='Enter drop location' />
                            </div>
                        </div>
                        <div className='dailyprice3'>
                            <div className='dailyprice4'>
                                <label htmlFor="">Date of Pickup</label>
                                <input type="text"  placeholder='Enter pickup location'/>
                            </div>
                            <div className='dailyprice4'>
                                <label htmlFor="">Time of Pickup</label>
                                <input type="text" placeholder='Enter drop location' />
                            </div>
                        </div>
                        <div className='outstationprice10'>
                            <div className='outstationprice11'>
                                <p>Fare Details</p>
                            </div>
                            <div className='outstationprice12'>

                            </div>
                        </div>
                        <div className='outstationprice4'>
                            <div className='outstationprice5'>
                                <div className='outstationprice6'>
                                    <p>Trip Chargers</p>
                                    <span>₹ 1900</span>
                                </div>
                                <div className='outstationprice7'>
                                    <p>GST Added</p>
                                    <span>+₹ 900</span>
                                </div>
                                <div className='outstationprice8'>
                                    <span>See Price Breakup</span>
                                </div>

                                <div className='outstationprice9'>
                                    <p>Total</p>
                                    <span>₹ 3670</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HOC(Outstationpricing)