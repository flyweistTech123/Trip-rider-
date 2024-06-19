import React, { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import './Services.css'
import HOC from '../../Components/HOC/HOC'
import { useNavigate } from 'react-router-dom';
import { IoSearch } from "react-icons/io5";


import img from '../../Images/img39.png'



const CarDetails = () => {
    const navigate = useNavigate()
    return (
        <>
            <div className='rider'>
                <div className='rider1'>
                    <div className='rider2'>
                        <div className='rider3'>
                            <h6>Car Details</h6>
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

                    <div className='services8'>
                        <div className='services9'>
                            <p>Car Images</p>
                            <div className='services10'>
                                <div className='services6'>
                                    <div className='services7'>
                                        <img src={img} alt="" />
                                    </div>
                                </div>
                                <div className='services6'>
                                    <div className='services7'>
                                        <img src={img} alt="" />
                                    </div>
                                </div>
                                <div className='services6'>
                                    <div className='services7'>
                                        <img src={img} alt="" />
                                    </div>
                                </div>
                                <div className='services6'>
                                    <div className='services7'>
                                        <img src={img} alt="" />
                                    </div>
                                </div>
                                <div className='services6'>
                                    <div className='services7'>
                                        <img src={img} alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className='services11'>
                            <div className='services12'>
                                <label htmlFor="">Vehicle No</label>
                                <input type="text" />
                            </div>
                            <div className='services12'>
                                <label htmlFor="">Vehicle Details</label>
                                <textarea type="text"  style={{height:'106px'}}/>
                            </div>
                            <div className='services12'>
                                <label htmlFor="">Availability</label>
                                <input type="text"  />
                            </div>
                            <div className='services12'>
                                <label htmlFor="">Price</label>
                                <input type="text" />
                            </div>
                        </div>

                        <div className='services13'>
                            <button onClick={()=>navigate('/services')}>Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HOC(CarDetails)